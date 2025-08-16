import { getMenuLanguage } from '../../services/appServices';
const languages = [
  { code: 'en', name: 'English' },
  { code: 'bg', name: 'Български' },
];

const LanguageSelectorModal = ({ isOpen, onClose, onSelectLanguage }) => {
    const menuLanguage = getMenuLanguage();
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{menuLanguage.Buttons.CHANGE_LANGUAGE.Text}</h3>
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