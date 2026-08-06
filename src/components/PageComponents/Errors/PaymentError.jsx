import { useState } from "react"
import { Link } from "react-router-dom"

export const PaymentError = () => {
    const [memoryReset, setMemoryReset] = useState(false);
    const [showOwnerInfo, setShowOwnerInfo] = useState(false);

    const resetMemory = () => {
        console.log('resetting memory');
        localStorage.clear();
        setMemoryReset(true);
        setTimeout(() => setMemoryReset(false), 3000);
    }

    return (
        <>
            <style>{`
                .error-container {
                    min-height: 100vh;
                    background: #f8f9fa;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                .error-header {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(20px);
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }

                .error-card {
                    background: rgba(255, 255, 255, 0.6);
                    backdrop-filter: blur(20px);
                    border-radius: 16px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 
                        0 4px 20px rgba(0, 0, 0, 0.08),
                        0 1px 2px rgba(0, 0, 0, 0.04);
                    overflow: hidden;
                }

                .error-icon-container {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 59, 48, 0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    border: 1px solid rgba(255, 59, 48, 0.2);
                }

                .solution-item {
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .solution-item:hover {
                    background: rgba(255, 255, 255, 0.9);
                    transform: translateY(-1px);
                    border-color: rgba(0, 0, 0, 0.12);
                }

                .number-badge {
                    width: 28px;
                    height: 28px;
                    background: #007AFF;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                }

                .action-button {
                    background: rgba(255, 255, 255, 0.8);
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    border-radius: 12px;
                    transition: all 0.2s ease;
                    cursor: pointer;
                }

                .action-button:hover {
                    background: rgba(255, 255, 255, 0.9);
                    transform: translateY(-1px);
                    border-color: rgba(0, 0, 0, 0.12);
                }

                .owner-panel {
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.08);
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .success-message {
                    background: rgba(52, 199, 89, 0.1);
                    border: 1px solid rgba(52, 199, 89, 0.2);
                    border-radius: 12px;
                    animation: slideDown 0.3s ease-out;
                }

                .back-button {
                    color: #007AFF;
                    text-decoration: none;
                    transition: opacity 0.2s ease;
                }

                .back-button:hover {
                    opacity: 0.7;
                }

                .chevron {
                    transition: transform 0.3s ease;
                }

                .chevron.rotated {
                    transform: rotate(180deg);
                }
            `}</style>

            <div className="error-container">
                {/* Header */}
                <header className="error-header">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center py-3">
                            <Link to="/" className="back-button d-flex align-items-center">
                                <i className="fas fa-chevron-left me-2"></i>
                                Назад
                            </Link>
                            <h1 className="h5 mb-0 fw-semibold text-dark">Достъпът е ограничен</h1>
                            <div style={{width: '80px'}}></div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="container py-4">
                    <div className="error-card mx-auto" style={{maxWidth: '500px'}}>
                        {/* Header with Icon */}
                        <div className="text-center p-4">
                            <div className="error-icon-container mb-3">
                                <i className="fas fa-exclamation-triangle fa-2x" style={{color: '#FF3B30'}}></i>
                            </div>
                            <h2 className="h4 fw-semibold text-dark mb-2">Планът е изтекъл</h2>
                            <p className="text-muted mb-0">Достъпът до това меню е временно спрян</p>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            {/* User Information */}
                            <div className="mb-4">
                                <h3 className="h6 fw-semibold text-dark mb-3">Информация за потребители</h3>
                                <div className="p-3 rounded" style={{background: 'rgba(0, 122, 255, 0.05)', border: '1px solid rgba(0, 122, 255, 0.1)'}}>
                                    <p className="text-dark mb-2 small">
                                        <strong>В момента нямате достъп до менюто</strong> поради изтекъл абонаментен план на заведението.
                                    </p>
                                    <p className="text-muted mb-0 small">
                                        Това е временно ограничение, което ще бъде отстранено след обновяване на абонамента.
                                    </p>
                                </div>
                            </div>

                            {/* Solutions */}
                            <div className="mb-4">
                                <h3 className="h6 fw-semibold text-dark mb-3">Какво можете да направите?</h3>
                                
                                <div className="solution-item p-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="number-badge me-3">1</span>
                                        <span className="text-dark small">Свържете се с персонала на заведението</span>
                                    </div>
                                </div>
                                
                                <div className="solution-item p-3 mb-3">
                                    <div className="d-flex align-items-center">
                                        <span className="number-badge me-3" style={{background: '#34C759'}}>2</span>
                                        <span className="text-dark small">Опитайте да сканирате QR кода отново по-късно</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={resetMemory}
                                    className="action-button w-100 p-3 border-0 d-flex align-items-center justify-content-center"
                                >
                                    <i className="fas fa-redo-alt me-2" style={{color: '#007AFF'}}></i>
                                    <span className="fw-medium text-dark small">Нулиране на кеша</span>
                                </button>
                            </div>

                            {/* Owner Information Toggle */}
                            <div className="border-top pt-4">
                                <button 
                                    onClick={() => setShowOwnerInfo(!showOwnerInfo)}
                                    className="action-button w-100 p-3 border-0 d-flex align-items-center justify-content-between"
                                >
                                    <span className="fw-medium text-dark small">Ако сте собственик на този обект</span>
                                    <i className={`chevron fas fa-chevron-down text-muted ${showOwnerInfo ? 'rotated' : ''}`}></i>
                                </button>

                                {showOwnerInfo && (
                                    <div className="owner-panel mt-3">
                                        <div className="p-3">
                                            <h4 className="h6 fw-semibold text-dark mb-3 d-flex align-items-center">
                                                <i className="fas fa-info-circle me-2" style={{color: '#007AFF'}}></i>
                                                Информация за собственици
                                            </h4>
                                            <ul className="list-unstyled mb-0 small text-dark">
                                                <li className="d-flex align-items-center mb-2">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '4px', color: '#8E8E93'}}></i>
                                                    <span>Вашият абонаментен план за V-MENU е изтекъл</span>
                                                </li>
                                                <li className="d-flex align-items-center mb-2">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '4px', color: '#8E8E93'}}></i>
                                                    <span>Менюто е временно недостъпно за клиентите</span>
                                                </li>
                                                <li className="d-flex align-items-center mb-2">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '4px', color: '#8E8E93'}}></i>
                                                    <span>За подновяване на абонамента:</span>
                                                </li>
                                                <li className="d-flex align-items-center mb-1 ms-3">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '3px', color: '#8E8E93'}}></i>
                                                    <span>📞 Телефон: +359 87 866 4334</span>
                                                </li>
                                                <li className="d-flex align-items-center mb-2 ms-3">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '3px', color: '#8E8E93'}}></i>
                                                    <span>✉️ Email: support@v-menu.eu</span>
                                                </li>
                                                <li className="d-flex align-items-center">
                                                    <i className="fas fa-circle me-2" style={{fontSize: '4px', color: '#8E8E93'}}></i>
                                                    <span>Достъпът ще се възстанови автоматично след плащане на дължимата сума</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Success Message */}
                    {memoryReset && (
                        <div className="success-message mx-auto mt-3 p-3 d-flex align-items-center" style={{maxWidth: '500px'}}>
                            <i className="fas fa-check-circle me-2" style={{color: '#34C759'}}></i>
                            <span className="fw-medium text-dark small">Кешът е нулиран успешно</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
