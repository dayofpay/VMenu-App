const OPTIONAL_CATEGORIES = new Set(['analytics', 'marketing']);

const normalizeObjectId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const consentStorageKey = (objectId) => {
  const id = normalizeObjectId(objectId);
  return id ? `vmenu_cookie_consent_${id}` : 'vmenu_cookie_consent';
};

const parseStoredConsent = (value) => {
  try {
    const parsed = JSON.parse(value || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

export function readConsent(objectId) {
  if (typeof window === 'undefined') return { necessary: true };
  const id = normalizeObjectId(objectId);
  try {
    const scoped = parseStoredConsent(localStorage.getItem(consentStorageKey(id)));
    if (Object.keys(scoped).length > 0) return { ...scoped, necessary: true, objectId: id };

    const legacy = parseStoredConsent(localStorage.getItem('vmenu_cookie_consent'));
    if (id && Number(legacy.objectId) === id) return { ...legacy, necessary: true, objectId: id };
  } catch {
    // Consent still works for the current session when browser storage is unavailable.
  }
  return { necessary: true, objectId: id };
}

export function writeConsent(objectId, choices = {}) {
  const id = normalizeObjectId(objectId);
  const previous = readConsent(id);
  const value = {
    necessary: true,
    objectId: id,
    schemaVersion: 1,
    decidedAt: new Date().toISOString(),
  };
  OPTIONAL_CATEGORIES.forEach((category) => {
    if (Object.prototype.hasOwnProperty.call(choices, category)) value[category] = choices[category] === true;
    else if (Object.prototype.hasOwnProperty.call(previous, category)) value[category] = previous[category] === true;
  });
  try {
    localStorage.setItem(consentStorageKey(id), JSON.stringify(value));
    // Kept as a compatibility mirror for older approved plugin versions.
    localStorage.setItem('vmenu_cookie_consent', JSON.stringify(value));
  } catch {
    // The React state below still lets waiting integrations start in this session.
  }
  window.dispatchEvent(new CustomEvent('vmenu:consent.updated', { detail: value }));
  return value;
}

export function consentAllows(category, objectId, snapshot) {
  if (category === 'necessary') return true;
  if (!OPTIONAL_CATEGORIES.has(category)) return false;
  const consent = snapshot && typeof snapshot === 'object' ? snapshot : readConsent(objectId);
  return consent[category] === true;
}

export function consentWasDecided(category, consent) {
  return OPTIONAL_CATEGORIES.has(category) && Object.prototype.hasOwnProperty.call(consent || {}, category);
}

export function normalizeConsentRequirements(values) {
  return [...new Set((Array.isArray(values) ? values : []).filter((item) => OPTIONAL_CATEGORIES.has(item)))];
}
