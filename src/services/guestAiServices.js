import { getEnv } from '../utils/appData';

const endpoint = (objectId) => `${getEnv()}/guest-ai/public/${objectId}`;

function visitorToken() {
  try { return JSON.parse(localStorage.getItem('user_token') || 'null'); }
  catch { return localStorage.getItem('user_token'); }
}

function tableId() {
  try { return Number(JSON.parse(localStorage.getItem('tableId') || 'null')); }
  catch { return Number(localStorage.getItem('tableId')); }
}

async function call(url, options = {}) {
  const response = await fetch(url, { ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) } });
  const body = await response.json();
  if (!response.ok || body.success === false) throw new Error(body.message || 'Връзката с помощника не успя.');
  return body;
}

export const getGuestAiConfig = (objectId) => call(`${endpoint(objectId)}/config`);

export const startGuestAiConversation = (objectId) => call(`${endpoint(objectId)}/conversations`, {
  method: 'POST', body: JSON.stringify({ visitorToken: visitorToken(), tableId: tableId() }),
});

export const getGuestAiConversation = (objectId, conversationId) => call(`${endpoint(objectId)}/conversations/${conversationId}`, {
  headers: { 'x-vmenu-visitor': visitorToken() || '' },
});

export const sendGuestAiMessage = (objectId, conversationId, message) => call(`${endpoint(objectId)}/conversations/${conversationId}/messages`, {
  method: 'POST', body: JSON.stringify({ visitorToken: visitorToken(), message }),
});

export const requestGuestAiStaff = (objectId, conversationId) => call(`${endpoint(objectId)}/conversations/${conversationId}/escalate`, {
  method: 'POST', body: JSON.stringify({ visitorToken: visitorToken() }),
});
