import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { consentWasDecided, normalizeConsentRequirements, writeConsent } from './consentStorage';
import './consent-manager.css';

const COLORS = {
  background: '#ffffff', text: '#18231f', muted: '#667085', primary: '#0c8a6a', border: '#e5e7eb',
};

const safeChoice = (value, choices, fallback) => choices.includes(value) ? value : fallback;

export default function ConsentManager({ objectId, requirements, consent, setup = {}, branding = {}, onChange }) {
  const required = useMemo(() => normalizeConsentRequirements(requirements), [requirements]);
  const requirementKey = required.join('|');
  const missingDecision = required.some((category) => !consentWasDecided(category, consent));
  const [open, setOpen] = useState(missingDecision);
  const [details, setDetails] = useState(false);
  const [choices, setChoices] = useState({ analytics: consent?.analytics === true, marketing: consent?.marketing === true });

  useEffect(() => {
    setChoices({ analytics: consent?.analytics === true, marketing: consent?.marketing === true });
    if (missingDecision) setOpen(true);
  }, [consent?.analytics, consent?.marketing, missingDecision, requirementKey]);

  if (!required.length) return null;

  const useTheme = setup.useThemeColors !== false;
  const colors = { ...COLORS, ...(setup.colors || {}) };
  const style = {
    '--vm-consent-bg': useTheme ? 'var(--vm-theme-surface, #fff)' : colors.background,
    '--vm-consent-text': useTheme ? 'var(--vm-theme-text, #18231f)' : colors.text,
    '--vm-consent-muted': useTheme ? 'var(--vm-theme-muted, #667085)' : colors.muted,
    '--vm-consent-primary': useTheme ? 'var(--vm-theme-primary, #0c8a6a)' : colors.primary,
    '--vm-consent-border': useTheme ? 'var(--vm-theme-border, #e5e7eb)' : colors.border,
  };
  const layout = safeChoice(setup.layout, ['banner', 'card'], 'banner');
  const position = safeChoice(setup.position, ['bottom', 'bottom-left', 'bottom-right', 'center'], 'bottom');
  const radius = safeChoice(setup.radius, ['square', 'soft', 'rounded'], 'rounded');

  const save = (next) => {
    const requestedChoices = Object.fromEntries(required.map((category) => [category, next[category] === true]));
    const stored = writeConsent(objectId, requestedChoices);
    onChange(stored);
    setOpen(false);
    setDetails(false);
  };

  if (!open) return null;

  return <div className={`vm-consent-layer position-${position}${setup.overlay === true ? ' has-overlay' : ''}`}>
    <section className={`vm-consent-panel layout-${layout} radius-${radius}`} style={style} role="dialog" aria-modal={setup.overlay === true ? 'true' : 'false'} aria-labelledby="vm-consent-title">
      <div className="vm-consent-copy">
        {setup.showBrandMark !== false && <div className="vm-consent-brand"><span aria-hidden="true">◉</span>{branding?.enabled && branding.brandName ? branding.brandName : 'V-MENU'}</div>}
        <h2 id="vm-consent-title">{setup.title || 'Вашата поверителност е важна'}</h2>
        <p>{setup.message || 'Използваме допълнителни технологии само когато са нужни за анализи или по-подходящо съдържание.'}</p>
        {setup.privacyUrl && <a className="vm-consent-link" href={setup.privacyUrl} target={String(setup.privacyUrl).startsWith('http') ? '_blank' : undefined} rel="noreferrer">{setup.privacyLabel || 'Политика за поверителност'}</a>}
      </div>

      {details && <div className="vm-consent-options">
        <label><span><strong>Необходими</strong><small>Нужни за основната работа на менюто.</small></span><input type="checkbox" checked disabled /></label>
        {required.includes('analytics') && <label><span><strong>Анализи</strong><small>Помагат да се разбере как се използва менюто.</small></span><input type="checkbox" checked={choices.analytics} onChange={(event) => setChoices((current) => ({ ...current, analytics: event.target.checked }))} /></label>}
        {required.includes('marketing') && <label><span><strong>Маркетинг и персонализиране</strong><small>Помага за измерване на кампании и показване на по-подходящо съдържание.</small></span><input type="checkbox" checked={choices.marketing} onChange={(event) => setChoices((current) => ({ ...current, marketing: event.target.checked }))} /></label>}
      </div>}

      <div className="vm-consent-actions">
        <button className="primary" type="button" onClick={() => save(Object.fromEntries(required.map((category) => [category, true])))}>{setup.acceptAllLabel || 'Приеми всички'}</button>
        {setup.showDetails !== false && <button type="button" onClick={() => details ? save(choices) : setDetails(true)}>{details ? (setup.saveLabel || 'Запази избора') : (setup.customizeLabel || 'Настройки')}</button>}
        <button type="button" onClick={() => save(Object.fromEntries(required.map((category) => [category, false])))}>{setup.rejectLabel || 'Само необходими'}</button>
      </div>
    </section>
  </div>;
}

ConsentManager.propTypes = {
  objectId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  requirements: PropTypes.arrayOf(PropTypes.string),
  consent: PropTypes.shape({ analytics: PropTypes.bool, marketing: PropTypes.bool }),
  setup: PropTypes.object,
  branding: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};
