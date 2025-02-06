import React from 'react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'bg', name: 'Български' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'ar', name: 'العربية' },
  { code: 'ja', name: '日本語' },
  { code: 'iw', name: 'עברית' },
];

const LanguageSelectorModal = ({ isOpen, onClose, onSelectLanguage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Изберете език</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="language-grid">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="language-btn"
              onClick={() => {
                onSelectLanguage(lang.code);
                onClose();
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectorModal;