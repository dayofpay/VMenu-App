import { useEffect, useRef, useState } from 'react';
import { getGuestAiConfig, getGuestAiConversation, requestGuestAiStaff, sendGuestAiMessage, startGuestAiConversation } from '../../services/guestAiServices';
import './GuestAiButton.css';

const stateLabel = { open: 'AI помощник', waiting_staff: 'Очаквате служител', staff_active: 'Разговаряте със служител', closed: 'Разговорът е приключен' };
const followUpActions = (messages = []) => {
  const last = messages[messages.length - 1];
  if (last?.sender !== 'assistant') return [];
  const previousQuestion = [...messages].reverse().find((message) => message.sender === 'guest')?.content || '';
  if (/wi[\s-]?fi|wlan|internet|password|вай[\s-]?фай|уай[\s-]?фай|интернет|парол/i.test(previousQuestion)) {
    return [{ label: 'Препоръчай ми нещо', question: 'Какво би ми препоръчал от менюто?' }];
  }
  if (/алерген|алерг|allerg|състав|ingredient/i.test(previousQuestion)) {
    return [{ label: 'Друга възможност', question: 'Можеш ли да предложиш друга подходяща опция?' },
      { label: 'Повече подробности', question: 'Разкажи ми повече за предложените продукти.' }];
  }
  return [{ label: 'Повече подробности', question: 'Разкажи ми повече за предложените продукти.' },
    { label: 'Има ли алергени?', question: 'Има ли алергени в предложените продукти?' }];
};

export default function GuestAiButton({ objectData }) {
  const objectId = Number(objectData?.objectInformation?.object_id);
  const [config, setConfig] = useState(null);
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (!objectId) return undefined;
    let mounted = true;
    getGuestAiConfig(objectId).then((data) => { if (mounted) setConfig(data.enabled ? data.settings : null); })
      .catch(() => { if (mounted) setConfig(null); });
    return () => { mounted = false; };
  }, [objectId]);

  useEffect(() => {
    if (!open || !conversation?.conversation_id) return undefined;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      getGuestAiConversation(objectId, conversation.conversation_id)
        .then((result) => setConversation(result.conversation)).catch(() => {});
    }, 5000);
    return () => window.clearInterval(timer);
  }, [open, objectId, conversation?.conversation_id]);

  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' }); }, [conversation?.messages?.length, open]);

  if (!config) return null;
  const colors = { '--ga-accent': config.accent_color, '--ga-surface': config.surface_color, '--ga-text': config.text_color };
  const nextActions = conversation?.status === 'open' && !conversation.ai_pending
    ? followUpActions(conversation.messages) : [];

  async function openChat() {
    setOpen(true); setError('');
    if (conversation && conversation.status !== 'closed') return;
    setBusy(true);
    try { setConversation((await startGuestAiConversation(objectId)).conversation); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  async function sendMessage(input) {
    const message = input.trim();
    if (!message || !conversation || busy) return;
    setBusy(true); setError('');
    try {
      setConversation((await sendGuestAiMessage(objectId, conversation.conversation_id, message)).conversation);
      setDraft('');
    } catch (err) {
      setError(err.message);
      getGuestAiConversation(objectId, conversation.conversation_id).then((result) => setConversation(result.conversation)).catch(() => {});
    } finally { setBusy(false); }
  }

  function send(event) {
    event.preventDefault();
    sendMessage(draft);
  }

  async function requestStaff() {
    if (!conversation || busy) return;
    setBusy(true); setError('');
    try { setConversation((await requestGuestAiStaff(objectId, conversation.conversation_id)).conversation); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return <div className="guest-ai" style={colors}>
    <button className="language-selector-btn guest-ai-trigger" type="button" onClick={openChat}>
      <i className="fa-solid fa-sparkles" aria-hidden="true"></i> <span>{config.button_label}</span>
    </button>
    {open && <div className="guest-ai-shade" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="guest-ai-dialog" role="dialog" aria-modal="true" aria-label={config.title}>
        <header className="guest-ai-header"><div><strong>{config.title}</strong><small>{stateLabel[conversation?.status] || 'Помощ за менюто'}</small></div>
          <button type="button" className="guest-ai-close" aria-label="Затвори" onClick={() => setOpen(false)}>×</button></header>
        <div className="guest-ai-messages" aria-live="polite">
          <div className="guest-ai-bubble assistant">{config.welcome_message}</div>
          {(conversation?.messages || []).map((message) => <div key={message.message_id} className={`guest-ai-bubble ${message.sender}`}>
            {message.sender === 'staff' && <small>Екипът на заведението</small>}{message.content}
          </div>)}
          {(busy || conversation?.ai_pending) && <div className="guest-ai-typing">Подготвяме отговор…</div>}
          <div ref={endRef}></div>
        </div>
        {conversation && conversation.status === 'open' && !conversation.messages.length && <div className="guest-ai-suggestions">
          {(config.suggested_questions || []).map((question) => <button key={question} type="button" onClick={() => setDraft(question)}>{question}</button>)}
        </div>}
        {nextActions.length > 0 && <div className="guest-ai-suggestions guest-ai-follow-ups" aria-label="Предложени следващи действия">
          <small>Може да продължите с:</small>
          {nextActions.map((action) => <button key={action.label} type="button" onClick={() => sendMessage(action.question)} disabled={busy}>{action.label}</button>)}
          <button type="button" onClick={requestStaff} disabled={busy}>Попитай служител</button>
        </div>}
        {error && <p className="guest-ai-error" role="alert">{error}</p>}
        <div className="guest-ai-footer">
          {conversation && conversation.status !== 'closed' && conversation.status === 'open' && <button type="button" className="guest-ai-escalate" onClick={requestStaff} disabled={busy}>Говори със служител</button>}
          {conversation?.status === 'waiting_staff' && <p className="guest-ai-note">Екипът е уведомен. Можете да оставите още подробности тук.</p>}
          {conversation?.status === 'closed' ? <button type="button" className="guest-ai-submit" onClick={openChat}>Нов разговор</button>
            : <form className="guest-ai-form" onSubmit={send}>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Напишете въпрос за менюто…" aria-label="Въпрос за менюто" maxLength={600} disabled={!conversation || busy} />
              <button type="submit" className="guest-ai-submit" disabled={!conversation || busy || !draft.trim()} aria-label="Изпрати">➤</button>
            </form>}
          <small className="guest-ai-disclaimer">AI отговорите са ориентировъчни. За алергени и съставки потвърдете с екипа.</small>
        </div>
      </section>
    </div>}
  </div>;
}
