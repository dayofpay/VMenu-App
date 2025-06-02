import React, { useState } from 'react';
import '../../Styles/AllergeneList.css';
import { do_action } from '../../../services/userServices';

const Allergens = ({ productData, ALLERGENES_LIST }) => {
const [showAllergens, setShowAllergens] = useState(false);

// Toggle function to show/hide allergens
const toggleAllergens = () => {
setShowAllergens(!showAllergens);
const button_name = showAllergens ? "Скрий алергени" : "Покажи алергени";
do_action("click_button",{button_name:button_name});
};

// Parse allergens from product data
const allergens = JSON.parse(productData.item_allergenes) || [];

return (
<>
    <div className='row'>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Алергени към този продукт</h5>
                </div>
                <div class="card-body py-2">
                    <div class="dz-list">
                        <ul>
                            <li>
                                <div className="allergene-container">
                                    <div className="list-group">
                                        <button
                                            className="btn light btn-secondary w-100"
                                            type='button' onClick={toggleAllergens}>
                                            <span>{showAllergens ? 'Скрий алергени' : 'Покажи алергени'}</span>
                                            <i className={`bi bi-chevron-${showAllergens ? 'up' : 'down' }`}></i>
                                        </button>
                                        <div className={`collapse ${showAllergens ? 'show' : '' }`}
                                            style={{ transition: 'height 0.3s ease' }}>
                                            <div className="list-group-flush">
                                                {allergens.length === 0 ? (
                                                <div className="alert alert-warning" role="alert">
                                                    Няма добавени алергени.
                                                </div>
                                                ) : (
                                                allergens.map((allergene) => {
                                                const allergen = ALLERGENES_LIST?.[allergene];
                                                return (
                                                <div className="list-group-item d-flex align-items-center"
                                                    key={allergene}>
                                                    <div className="allergene-icon me-2">
                                                        {allergen?.allergen_icon ? (
                                                        <span className="icon icon-image">{allergen.allergen_icon}</span>
                                                        ) : (
                                                        <span className="default-icon">⚠️</span>
                                                        )}
                                                    </div>
                                                    <span className="allergene-name">
                                                        {allergen?.allergen_name}
                                                    </span>
                                                </div>
                                                );
                                                })
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</>
);
};

export default Allergens;