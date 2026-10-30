/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import LoadingAnimation from '../components/Animations/Loading';
import { createVisitor } from '../services/userServices';
import * as storage from '../utils/memory';
import { ERROR_PATHS } from '../utils/pathList';

const PWA_WORKER_URL = '/app.js?v=4';

const readStoredNumber = (key) => {
    try {
        return Number(JSON.parse(localStorage.getItem(key) || 'null'));
    } catch {
        return Number(localStorage.getItem(key));
    }
};

const readPwaLaunchContext = () => {
    const params = new URLSearchParams(window.location.search);
    const objectId = Number(params.get('pwa_object'));
    const tableId = Number(params.get('pwa_table'));
    if (params.get('source') !== 'pwa' || !Number.isInteger(objectId) || objectId <= 0 || !Number.isInteger(tableId) || tableId <= 0) {
        return null;
    }
    return { objectId, tableId };
};

const isStandalonePwa = () => window.matchMedia?.('(display-mode: standalone)').matches
    || window.navigator.standalone === true;

const waitForActiveWorker = async (registration) => {
    await registration.update().catch(() => {});
    const worker = registration.installing || registration.waiting || registration.active;
    if (!worker) return null;
    if (worker.state === 'activated') return worker;

    await new Promise((resolve, reject) => {
        const timeout = window.setTimeout(() => reject(new Error('PWA recovery timed out.')), 6000);
        const handleState = () => {
            if (worker.state === 'activated') {
                window.clearTimeout(timeout);
                worker.removeEventListener('statechange', handleState);
                resolve();
            } else if (worker.state === 'redundant') {
                window.clearTimeout(timeout);
                worker.removeEventListener('statechange', handleState);
                reject(new Error('PWA recovery worker failed.'));
            }
        };
        worker.addEventListener('statechange', handleState);
    });
    return registration.active || worker;
};

const recoverStoredPwaContext = async () => {
    if (!('serviceWorker' in navigator)) return null;
    const registration = await navigator.serviceWorker.register(PWA_WORKER_URL, { scope: '/', updateViaCache: 'none' });
    const worker = await waitForActiveWorker(registration);
    if (!worker) return null;

    return new Promise((resolve) => {
        const channel = new MessageChannel();
        const timeout = window.setTimeout(() => resolve(null), 4000);
        channel.port1.onmessage = (event) => {
            window.clearTimeout(timeout);
            const context = event.data?.context;
            const objectId = Number(context?.objectId);
            const tableId = Number(context?.tableId);
            resolve(event.data?.ok && Number.isInteger(objectId) && objectId > 0 && Number.isInteger(tableId) && tableId > 0
                ? { objectId, tableId }
                : null);
        };
        worker.postMessage({ type: 'VMENU_GET_PWA_CONTEXT' }, [channel.port2]);
    });
};

const errorPathForVisitor = (result) => {
    if (result?.error_code === 'VMENU_TABLE_NOT_FOUND') return ERROR_PATHS.OBJECT_ERROR;
    if (result?.error_code === 'VMENU_OBJECT_HAS_UNPAID_INVOICE') return ERROR_PATHS.UNPAID_INVOICE;
    return ERROR_PATHS.QR_ERROR;
};

/**
 * Ensures that the current menu has a valid object, table and visitor session.
 * Installed PWAs can restore that context even when an older shortcut opens at `/`.
 */
const RequireObjectState = ({ redirectPath = ERROR_PATHS.QR_ERROR }) => {
    const navigate = useNavigate();
    const queryContext = readPwaLaunchContext();
    const storedObjectId = readStoredNumber('restaurantId');
    const storedTableId = readStoredNumber('tableId');
    const shouldRecover = !queryContext && isStandalonePwa() && (!storedObjectId || !storedTableId);
    const [pwaContext, setPwaContext] = useState(queryContext);
    const [pwaStage, setPwaStage] = useState(() => {
        if (queryContext) return 'initializing';
        if (shouldRecover) return 'recovering';
        return 'idle';
    });
    const pwaObjectId = pwaContext?.objectId || null;
    const pwaTableId = pwaContext?.tableId || null;

    useEffect(() => {
        if (pwaStage !== 'recovering') return undefined;
        let active = true;

        recoverStoredPwaContext().then((context) => {
            if (!active) return;
            if (!context) {
                navigate(ERROR_PATHS.QR_ERROR, { replace: true });
                return;
            }
            setPwaContext(context);
            setPwaStage('initializing');
        }).catch((error) => {
            if (!active) return;
            console.error('Unable to recover the installed app context:', error);
            navigate(ERROR_PATHS.QR_ERROR, { replace: true });
        });

        return () => { active = false; };
    }, [navigate, pwaStage]);

    useEffect(() => {
        if (pwaStage !== 'initializing' || !pwaObjectId || !pwaTableId) return undefined;
        let active = true;
        const previousObjectId = readStoredNumber('restaurantId');
        const previousTableId = readStoredNumber('tableId');
        const sameContext = previousObjectId === pwaObjectId && previousTableId === pwaTableId;
        const storedToken = localStorage.getItem('user_token');
        const hasSession = sameContext && storedToken && !['null', '[]', '""'].includes(storedToken);

        if (!sameContext) {
            ['objectData', 'visitorData', 'user_token', 'cart', 'selectedAddons'].forEach((key) => localStorage.removeItem(key));
        }
        localStorage.setItem('restaurantId', JSON.stringify(pwaObjectId));
        localStorage.setItem('tableId', JSON.stringify(pwaTableId));

        if (hasSession) {
            setPwaStage('idle');
            navigate('/', { replace: true });
            return undefined;
        }

        createVisitor().then((result) => {
            if (!active) return;
            if (result?.hasError) {
                navigate(errorPathForVisitor(result), { replace: true });
                return;
            }
            storage.setItem('visitorData', result);
            storage.setItem('user_token', result.user_token);
            setPwaStage('idle');
            navigate('/', { replace: true });
        }).catch((error) => {
            if (!active) return;
            console.error('Unable to initialize the installed app session:', error);
            navigate(ERROR_PATHS.QR_ERROR, { replace: true });
        });

        return () => { active = false; };
    }, [navigate, pwaObjectId, pwaStage, pwaTableId]);

    if (pwaStage !== 'idle') return <LoadingAnimation />;

    const restaurantId = localStorage.getItem('restaurantId');
    const tableId = localStorage.getItem('tableId');
    if (!restaurantId || !tableId) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
};

export default RequireObjectState;
