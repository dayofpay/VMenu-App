import React, { useState } from 'react';
import { do_action } from '../../../services/userServices';
import '../../Styles/AllergeneList.css';

const Allergens = ({ productData, ALLERGENES_LIST }) => {
  const [showAllergens, setShowAllergens] = useState(false);

  const toggleAllergens = () => {
    setShowAllergens(!showAllergens);
    const button_name = showAllergens ? "Скрий алергени" : "Покажи алергени";
    do_action("click_button", { button_name: button_name });
  };

  const allergens = JSON.parse(productData.item_allergenes) || [];

  return (
    <div className="delivery-allergens-container">
      <div className="delivery-allergens-card">
        <div 
          className="delivery-allergens-header"
          onClick={toggleAllergens}
        >
          <div className="delivery-allergens-title">
            <h3>Алергени</h3>
            <svg 
              className={`delivery-allergens-chevron ${showAllergens ? 'open' : ''}`} 
              width="24" 
              height="24" 
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </div>
        </div>

        <div className={`delivery-allergens-content ${showAllergens ? 'expanded' : ''}`}>
          {allergens.length === 0 ? (
            <div className="delivery-no-allergens">
              Няма добавени алергени в този продукт
            </div>
          ) : (
            <ul className="delivery-allergens-list">
              {allergens.map((allergene) => {
                const allergen = ALLERGENES_LIST?.[allergene];
                return (
                  <li className="delivery-allergen-item" key={allergene}>
                    <div className="delivery-allergen-icon">
                      {allergen?.allergen_icon ? (
                        <span className="icon icon-image">{allergen.allergen_icon}</span>
                      ) : (
                        <span className="default-icon">⚠️</span>
                      )}
                    </div>
                    <div className="delivery-allergen-name">
                      {allergen?.allergen_name || `Алерген ${allergene}`}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <style jsx>{`
        .delivery-allergens-container {
          margin: 16px 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        .delivery-allergens-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }
        
        .delivery-allergens-header {
          padding: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          transition: background 0.2s;
        }
        
        .delivery-allergens-header:hover {
          background: #f8f8f8;
        }
        
        .delivery-allergens-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        
        .delivery-allergens-title h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        
        .delivery-allergens-chevron {
          transition: transform 0.2s;
          fill: #666;
        }
        
        .delivery-allergens-chevron.open {
          transform: rotate(180deg);
        }
        
        .delivery-allergens-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .delivery-allergens-content.expanded {
          max-height: 1000px;
        }
        
        .delivery-no-allergens {
          padding: 16px;
          text-align: center;
          color: #666;
          font-size: 14px;
        }
        
        .delivery-allergens-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid #f0f0f0;
        }
        
        .delivery-allergen-item {
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: background 0.2s;
        }
        
        .delivery-allergen-item:hover {
          background: #f8f8f8;
        }
        
        .delivery-allergen-icon {
          width: 32px;
          height: 32px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff4f4;
          border-radius: 6px;
          color: #ff5252;
          font-size: 18px;
        }
        
        .delivery-allergen-name {
          font-size: 15px;
          color: #333;
        }
        
        .default-icon {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default Allergens;