
const PaymentErrorModal = ({ error, onRetry, onClose }) => {
  const getErrorInfo = (error) => {
    const code = error?.decline_code || error?.code;
    
    const errorMap = {
      insufficient_funds: {
        title: 'Недостатъчна наличност',
        message: 'По картата ви няма достатъчно средства. Опитайте с друга карта.',
        icon: '💳',
        color: '#f59e0b',
      },
      card_declined: {
        title: 'Картата е отказана',
        message: 'Вашата банка отказа транзакцията. Свържете се с банката си или опитайте с друга карта.',
        icon: '🚫',
        color: '#ef4444',
      },
      expired_card: {
        title: 'Изтекла карта',
        message: 'Картата ви е изтекла. Моля, използвайте друга карта.',
        icon: '📅',
        color: '#ef4444',
      },
      incorrect_cvc: {
        title: 'Грешен CVC код',
        message: 'Въведеният CVC код е неправилен. Проверете гърба на картата.',
        icon: '🔒',
        color: '#8b5cf6',
      },
      processing_error: {
        title: 'Грешка при обработка',
        message: 'Временна грешка. Моля, опитайте отново след малко.',
        icon: '⚙️',
        color: '#6366f1',
      },
    };

    return errorMap[code] || {
      title: 'Плащането не беше успешно',
      message: error?.message || 'Възникна неочаквана грешка. Моля, опитайте отново.',
      icon: '❌',
      color: '#ef4444',
    };
  };

  const info = getErrorInfo(error);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999, padding: '20px',
      backdropFilter: 'blur(4px)',
      animation: 'fadeIn 0.2s ease',
    }}>
      <div style={{
        background: 'white', borderRadius: '20px',
        maxWidth: '420px', width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        overflow: 'hidden',
        animation: 'slideUp 0.3s ease',
      }}>
        {/* cvetna lenta */}
        <div style={{ height: '6px', background: info.color }} />

        <div style={{ padding: '32px 28px' }}>

          <div style={{
            width: '64px', height: '64px',
            background: `${info.color}15`,
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', marginBottom: '20px',
          }}>
            {info.icon}
          </div>

          <h3 style={{ margin: '0 0 8px', fontSize: '1.25rem', fontWeight: 700, color: '#1a202c' }}>
            {info.title}
          </h3>
          <p style={{ margin: '0 0 24px', color: '#718096', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {info.message}
          </p>


          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1, padding: '12px',
                border: '1.5px solid #e2e8f0', borderRadius: '10px',
                background: 'white', color: '#4a5568',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              Затвори
            </button>
            <button
              onClick={onRetry}
              style={{
                flex: 2, padding: '12px',
                border: 'none', borderRadius: '10px',
                background: info.color, color: 'white',
                fontWeight: 600, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >
              Опитай отново
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
};

export default PaymentErrorModal;