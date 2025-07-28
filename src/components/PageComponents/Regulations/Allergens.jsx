import React, { useState } from 'react';
import '../../Styles/AllergeneList.css';
import { do_action } from '../../../services/userServices';

const Allergens = ({ productData, ALLERGENES_LIST }) => {
  const [showAllergens, setShowAllergens] = useState(false);

  const toggleAllergens = () => {
    setShowAllergens(!showAllergens);
    const button_name = showAllergens ? "Скрий алергени" : "Покажи алергени";
    do_action("click_button", { button_name: button_name });
  };

  const allergens = JSON.parse(productData.item_allergenes) || [];

  return (
    <div className='row'>
      <style jsx>{`
        .allergen-card {
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          overflow: hidden;
          border: none;
        }
        .allergen-card-header {
          background-color: #f8f9fa;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }
        .allergen-card-title {
          font-size: 1.1rem;
          margin: 0;
          color: #333;
          font-weight: 600;
        }
        .toggle-allergen-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 20px;
          background-color: light
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        .toggle-allergen-btn:hover {
          background-color: #3a5bbf;
          transform: translateY(-1px);
        }
        .toggle-allergen-btn:active {
          transform: translateY(0);
        }
        .allergen-list-item {
          padding: 12px 20px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
        }
        .allergen-list-item:hover {
          background-color: #f9f9f9;
        }
        .allergen-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          font-size: 1.2rem;
        }
        .allergen-name {
          font-size: 0.95rem;
          color: #333;
        }
        .no-allergens-alert {
          margin: 15px;
          text-align: center;
          border-radius: 6px;
        }
        .allergen-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .allergen-content.show {
          max-height: 1000px; /* Достатъчно голяма стойност за да събере всички алергени */
        }
      `}</style>

      <div className="col-12">
        <div className="allergen-card">
          <div className="allergen-card-header">
            <h5 className="allergen-card-title">Алергени</h5>
          </div>
          <div className="card-body py-2">
            <div className="allergen-container">
              <button
                className="toggle-allergen-btn"
                type='button' 
                onClick={toggleAllergens}
              >
                <span>{showAllergens ? 'Скрий алергени' : 'Покажи алергени'}</span>
                <i className={`bi bi-chevron-${showAllergens ? 'up' : 'down'}`}></i>
              </button>
              
              <div className={`allergen-content ${showAllergens ? 'show' : ''}`}>
                {allergens.length === 0 ? (
                  <div className="alert alert-warning no-allergens-alert" role="alert">
                    Няма добавени алергени.
                  </div>
                ) : (
                  <div className="list-group-flush">
                    {allergens.map((allergene) => {
                      const allergen = ALLERGENES_LIST?.[allergene];
                      return (
                        <div className="allergen-list-item" key={allergene}>
                          <div className="allergen-icon me-2">
                            {allergen?.allergen_icon ? (
                              <span className="icon icon-image">{allergen.allergen_icon}</span>
                            ) : (
                              <span className="default-icon">⚠️</span>
                            )}
                          </div>
                          <span className="allergen-name">
                            {allergen?.allergen_name || `Алерген ${allergene}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Allergens;