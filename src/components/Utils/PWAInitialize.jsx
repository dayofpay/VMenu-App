import withObjectData from "../../HOC/withObjectInfo"
import { getEnv } from "../../utils/appData";
import LoadingAnimation from "../Animations/Loading";


/**
 * This component renders a call-to-action to install the app on the user's device.
 * It only renders if the user is on a plan that allows PWA installation (plan 3 or 4)
 * and if the user has not already installed the app on their device.
 * The component renders a modal with a button to install the app and a button to close the modal.
 * The modal is rendered at the bottom of the page and covers the entire screen.
 * The component uses the objectData prop to get the object information (name, image, etc.)
 * and the license information (plan_id, etc.).
 */
const PWAFooter = ({objectData}) => {

    // if there is no object data, render a loading animation
    if(!objectData.objectInformation){
        return <LoadingAnimation/>
    }

    // if the user is on a plan that allows PWA installation (plan 3 or 4)
    // and if the user has not already installed the app on their device
    if(objectData.license.data.plan_id >= 3 && objectData.license.data.plan_id <= 4 || objectData.license.data.plan_id >=5 ){
        return (
            <>
            {/* the modal is rendered at the bottom of the page and covers the entire screen */}
            <div className="offcanvas offcanvas-bottom pwa-offcanvas">
                <div className="container">
                    <div className="offcanvas-body small">
                        {/* render the object image and name */}
                        <img className="logo" src={`${getEnv()}/uploads/${objectData.objectInformation.object_image}`} alt={`${objectData.objectInformation.object_name}`}/>
                        <h6 className="title font-w600">Добавете "{objectData.objectInformation.object_name}" като приложения на началният ви екран</h6>
                        {/* render the text that explains what the button does */}
                        <p className="pwa-text">Ако желаете да инсталирате нашето приложения, без да се налага да сканирате QR Кода на текущата маса, можете да инсталирате апликацията на вашето устройство дирекнто от бутона по-долу !</p>
                        {/* render a small note that explains that the session will be active only for the current table (e.g. Table 12) */}
                        <small>* Важно: Сесията ще бъде активна само за масата на която се намирате в момента (Маса №{localStorage.getItem('tableId')})</small>
                        {/* render the button to install the app */}
                        <button type="button" className="btn btn-sm btn-primary pwa-btn">Добави</button>
                        {/* render the button to close the modal */}
                        <button type="button" className="btn btn-sm pwa-close btn-secondary ms-2 text-white">Може би по-късно</button>
                    </div>
                </div>
            </div>
            {/* the backdrop is rendered as a separate element, so that it can be styled independently */}
            <div className="offcanvas-backdrop pwa-backdrop"></div>
            </>
        )
    }
}



export default PWAFooter;
