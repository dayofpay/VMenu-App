import { useState, useEffect, useMemo, useContext } from "react";
import { getEnv } from "../../../../utils/appData";
import { formatPrice, convertPrice } from "../../../../utils/pricingUtils";
import { hasAddon } from "../../../../services/objectServices";
import PERK_LIST from "../../../../utils/perkAddons";
import { CallKeys } from "../../../../keys/formKeys";
import { createCall, do_action } from "../../../../services/userServices";
import ShowTranslateAPI from "../../Plugins/TranslateAPI";
import { getMenuLanguage } from "../../../../services/appServices";
import { incrementQuantity, decrementQuantity } from "../../../../handlers/ProductQuantityHR";
import CartContext from "../../../../contexts/CartCTX";
import * as storage from "../../../../utils/memory";
import { ProductDetailsKeys } from "../../../../keys/formKeys";
import { ALLERGENES_LIST } from "../../../../utils/regulations";
import { getProductAddonsList } from "../../../../services/productServices";
import ProductAddons from "../../Plugins/Addons";
import { emitVMenuEvent } from "../../../Experience/vmenuDevApi";

const CROLanding = ({ objectData }) => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [callMessage, setCallMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productExists, setProductExists] = useState(false);
  const [productAddons, setProductAddons] = useState([]);
  const [cartAnimation, setCartAnimation] = useState(false);
  
  const COOLDOWN_TIME = 60;
  const menuLanguage = getMenuLanguage();
  const { cartUpdateHandler, cartDeleteHandler } = useContext(CartContext);
  
  
  const categories = objectData?.categories || [];
  const allProducts = objectData?.allProducts || objectData?.products || [];
  
  
  const productsByCategory = useMemo(() => {
    const result = {};
    categories.forEach(cat => { result[cat.entry_id] = []; });
    
    allProducts.forEach(product => {
      if (product.item_categories) {
        try {
          let categoryIds = [];
          if (typeof product.item_categories === 'string') {
            categoryIds = JSON.parse(product.item_categories);
          } else if (Array.isArray(product.item_categories)) {
            categoryIds = product.item_categories;
          }
          categoryIds.forEach(catId => {
            const numericCatId = Number(catId);
            if (result[numericCatId]) result[numericCatId].push(product);
          });
        } catch (e) { console.error('Error parsing categories:', e); }
      }
    });
    return result;
  }, [categories, allProducts]);
  
  
  const activeCategories = useMemo(() => {
    return categories.filter(cat => (productsByCategory[cat.entry_id] || []).length > 0);
  }, [categories, productsByCategory]);
  
  
  const landingSettings = objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS || {};
  const homeDesign = landingSettings.HOME_DESIGN || {};
  const croMode = homeDesign.cro_mode || {};
  const productsPerRow = croMode.productsPerRow || 2;
  const categoriesCollapsed = croMode.categoriesCollapsed || 'all_closed';
  const showProductIcons = homeDesign.layout?.showProductIcons ?? true;
  const showPrices = homeDesign.content?.showPrices ?? true;
  const showDescriptions = homeDesign.content?.showDescriptions ?? false;
  const showDiscountTags = homeDesign.content?.showDiscountTags ?? true;
  
  
  const actionButtons = landingSettings.ACTION_BUTTONS || {};
  const showCallWaiter = hasAddon(PERK_LIST.CALLS) && (actionButtons.CALL_WAITER !== false);
  const showLanguageOption = actionButtons.SELECT_LANGUAGE !== false;
  const hasCartAddon = hasAddon(PERK_LIST.CART);
  const hasAddonsAddon = hasAddon(PERK_LIST.ADDONS);
  
  
  useEffect(() => {
    const initialExpanded = {};
    activeCategories.forEach((cat, index) => {
      if (categoriesCollapsed === 'all_open') initialExpanded[cat.entry_id] = true;
      else if (categoriesCollapsed === 'first_open' && index === 0) initialExpanded[cat.entry_id] = true;
      else initialExpanded[cat.entry_id] = false;
    });
    setExpandedCategories(initialExpanded);
  }, [activeCategories, categoriesCollapsed]);
  
  
  useEffect(() => {
    if (selectedProduct) {
      const cart = storage.getItem("cart") || [];
      setProductExists(cart.some(item => item.productId === selectedProduct.item_id));
      
      
      const fetchAddons = async () => {
        try {
          const addons = await getProductAddonsList(selectedProduct.item_id);
          setProductAddons(addons || []);
        } catch (error) {
          console.error("Error fetching addons:", error);
        }
      };
      if (hasAddonsAddon) fetchAddons();
    }
  }, [selectedProduct, hasAddonsAddon]);
  
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };
  
  const openProduct = (product) => {
    setSelectedProduct(product);
    setProductQuantity(1);
    setModalOpen(true);
    const price = Number(product.item_price || 0);
    const discount = Number(product.discount_percentage || 0);
    const detail = {
      contentId: product.item_id,
      contentName: product.item_name,
      category: Array.isArray(product.category_names) ? product.category_names[0] || '' : '',
      value: discount > 0 ? price * (100 - discount) / 100 : price,
      currency: product.item_currency || 'EUR',
    };
    emitVMenuEvent('product.viewed', detail);
    emitVMenuEvent('ViewContent', detail);
  };
  
  const closeModal = () => {
    setSelectedProduct(null);
    setModalOpen(false);
    setProductQuantity(1);
    setProductAddons([]);
  };
  
  
  const handleCartAction = async () => {
    if (!selectedProduct) return;
    
    try {
      if (!productExists) {
        const price = Number(selectedProduct.item_price || 0);
        const discount = Number(selectedProduct.discount_percentage || 0);
        const finalPrice = discount > 0 ? price * (100 - discount) / 100 : price;
        await cartUpdateHandler({
          [ProductDetailsKeys.PRODUCT_ID]: selectedProduct.item_id,
          [ProductDetailsKeys.PRODUCT_QUANTITY]: productQuantity
        }, () => {}, {
          contentName: selectedProduct.item_name,
          category: Array.isArray(selectedProduct.category_names) ? selectedProduct.category_names[0] || '' : '',
          quantity: productQuantity,
          value: finalPrice * productQuantity,
          currency: selectedProduct.item_currency || 'EUR',
        });
        do_action("add_to_cart", { product_id: selectedProduct.item_id });
        setProductExists(true);
        
        setCartAnimation(true);
        setTimeout(() => setCartAnimation(false), 500);
      } else {
        await cartDeleteHandler({
          [ProductDetailsKeys.PRODUCT_ID]: selectedProduct.item_id,
          [ProductDetailsKeys.PRODUCT_QUANTITY]: productQuantity
        }, () => {});
        do_action("remove_from_cart", { product_id: selectedProduct.item_id });
        setProductExists(false);
      }
    } catch (error) {
      console.error("Cart action error:", error);
    }
  };
  
  
  const handleCall = (action) => {
    setIsLoading(true);
    createCall({ call_reason: action }).then((result) => {
      do_action("call_waiter", { call_reason: action });
      setIsLoading(false);
      setCallMessage(result.msg);
      setTimeout(() => setCallMessage(""), 3000);
    });
  };
  
  const getGridClass = () => {
    const classes = { 1: 'grid-cols-1', 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
    return classes[productsPerRow] || 'grid-cols-2';
  };
  
  const getProductPrice = (product) => {
    if (product.has_discount || (product.discount_percentage > 0 && new Date(product.discount_expires) >= new Date())) {
      const discounted = product.item_price - (product.discount_percentage * product.item_price) / 100;
      return { price: discounted, original: product.item_price, hasDiscount: true, discountPercent: product.discount_percentage };
    }
    return { price: product.item_price, hasDiscount: false };
  };
  
  return (
    <div className="cro-landing">
      <style>{`
        .cro-landing { max-width: 1400px; margin: 0 auto; padding: 24px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #fef9f0 0%, #ffffff 100%); min-height: 100vh; }
        .server-call-btn, .language-selector-btn { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; padding: 16px 24px; border-radius: 60px; background: linear-gradient(135deg, #ef7d00, #e56e00); color: white; font-weight: 700; font-size: 1rem; border: none; margin-bottom: 16px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 8px 20px rgba(239, 125, 0, 0.25); }
        .server-call-btn:hover, .language-selector-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(239, 125, 0, 0.35); }
        .call-option-btn { width: 100%; padding: 14px 12px; border-radius: 50px; background: linear-gradient(135deg, #4caf50, #45a049); color: white; font-weight: 600; border: none; transition: all 0.2s ease; cursor: pointer; margin-bottom: 8px; }
        .call-option-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .btn-cancel { padding: 10px 24px; border-radius: 40px; background: #f44336; color: white; border: none; font-weight: 600; cursor: pointer; }
        .category-item { margin-bottom: 28px; border-radius: 28px; background: white; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid rgba(239, 125, 0, 0.15); overflow: hidden; }
        .category-header { display: flex; align-items: center; justify-content: space-between; padding: 20px 28px; background: linear-gradient(135deg, #fffaf5, #ffffff); cursor: pointer; transition: all 0.3s ease; border-bottom: 2px solid rgba(239, 125, 0, 0.1); }
        .category-header:hover { background: linear-gradient(135deg, #fff5e8, #ffffff); padding-left: 32px; }
        .category-title { display: flex; align-items: center; gap: 16px; }
        .category-icon { width: 48px; height: 48px; background: linear-gradient(135deg, #ef7d00, #ff9640); border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: white; box-shadow: 0 4px 12px rgba(239, 125, 0, 0.3); }
        .category-name { font-size: 1.5rem; font-weight: 700; color: #2c2418; margin: 0; letter-spacing: -0.3px; }
        .product-count { background: #f5ede1; padding: 6px 14px; border-radius: 40px; font-size: 0.8rem; font-weight: 600; color: #ef7d00; }
        .category-arrow { font-size: 1.4rem; color: #ef7d00; transition: transform 0.3s ease; }
        .category-arrow.open { transform: rotate(180deg); }
        .products-grid { padding: 28px; background: #fefcf9; }
        .grid-cols-1 { display: grid; grid-template-columns: 1fr; gap: 24px; }
        .grid-cols-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .grid-cols-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        .grid-cols-4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
        .product-card { background: white; border-radius: 24px; overflow: hidden; cursor: pointer; transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1); border: 1px solid rgba(239, 125, 0, 0.1); box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .product-card:hover { transform: translateY(-8px); box-shadow: 0 20px 35px -12px rgba(239, 125, 0, 0.2); border-color: rgba(239, 125, 0, 0.3); }
        .product-image { aspect-ratio: 1 / 1; background: linear-gradient(135deg, #fef5e8, #fff8f0); position: relative; overflow: hidden; }
        .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .product-card:hover .product-image img { transform: scale(1.05); }
        .discount-badge { position: absolute; top: 16px; right: 16px; background: linear-gradient(135deg, #ef7d00, #e56e00); color: white; padding: 6px 12px; border-radius: 30px; font-size: 0.75rem; font-weight: 700; z-index: 1; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .product-info { padding: 20px; }
        .product-name { font-size: 1rem; font-weight: 700; color: #2c2418; margin-bottom: 8px; line-height: 1.4; }
        .product-description { font-size: 0.8rem; color: #8b7355; margin-bottom: 12px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .product-price { font-size: 1.2rem; font-weight: 800; color: #ef7d00; }
        .product-price.old { font-size: 0.85rem; font-weight: 400; color: #b89a7a; text-decoration: line-through; margin-left: 10px; }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(8px); }
        .modal-content { background: white; border-radius: 32px; max-width: 700px; width: 90%; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 30px 60px rgba(0,0,0,0.2); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 24px 28px; border-bottom: 2px solid #f5ede1; position: sticky; top: 0; background: white; z-index: 10; }
        .modal-header h3 { font-size: 1.5rem; font-weight: 700; margin: 0; color: #2c2418; }
        .modal-close { background: #f5ede1; border: none; font-size: 20px; cursor: pointer; color: #8b7355; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: all 0.2s; }
        .modal-close:hover { background: #ef7d00; color: white; transform: rotate(90deg); }
        .modal-body { padding: 28px; }
        .modal-image { width: 100%; border-radius: 20px; margin-bottom: 24px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
        .modal-price { font-size: 2rem; font-weight: 800; color: #ef7d00; margin: 20px 0; }
        .modal-description { color: #5a4a38; line-height: 1.7; font-size: 1rem; margin-bottom: 20px; }
        .quantity-selector { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 24px 0; }
        .quantity-btn { width: 48px; height: 48px; border-radius: 50%; background: #f5ede1; border: none; font-size: 24px; font-weight: 700; color: #ef7d00; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
        .quantity-btn:hover:not(:disabled) { background: #ef7d00; color: white; transform: scale(1.05); }
        .quantity-btn:disabled { opacity: 0.5; cursor: not-allowed; background: #e0e0e0; color: #aaa; }
        .quantity-value { font-size: 1.5rem; font-weight: 700; color: #2c2418; min-width: 60px; text-align: center; }
        .cart-modal-btn { width: 100%; padding: 16px; border-radius: 50px; background: linear-gradient(135deg, #ef7d00, #e56e00); color: white; font-weight: 700; font-size: 1.1rem; border: none; cursor: pointer; transition: all 0.3s; margin-top: 16px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .cart-modal-btn.remove { background: linear-gradient(135deg, #f44336, #d32f2f); }
        .cart-modal-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(239, 125, 0, 0.3); }
        .cart-animation { animation: cartPulse 0.5s ease; }
        @keyframes cartPulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); background: #ff9640; } 100% { transform: scale(1); } }
        .allergens-section, .addons-section { margin: 20px 0; padding: 16px; background: #fef9f0; border-radius: 20px; }
        .allergens-title, .addons-title { font-size: 0.9rem; font-weight: 600; color: #ef7d00; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .allergens-list { display: flex; flex-wrap: wrap; gap: 8px; }
        .allergen-badge { background: white; border-radius: 30px; padding: 6px 12px; font-size: 0.75rem; color: #5a4a38; border: 1px solid #f0e0d0; }
        @media (max-width: 900px) { .grid-cols-3, .grid-cols-4 { grid-template-columns: repeat(2, 1fr); gap: 20px; } .category-name { font-size: 1.25rem; } .category-icon { width: 40px; height: 40px; font-size: 20px; } }
        @media (max-width: 600px) { .cro-landing { padding: 16px; } .grid-cols-2, .grid-cols-3, .grid-cols-4 { grid-template-columns: 1fr; gap: 16px; } .category-name { font-size: 1.1rem; } .modal-header h3 { font-size: 1.2rem; } .modal-price { font-size: 1.5rem; } }
      `}</style>
      

      <div className="dashboard-area">
        {showCallWaiter && (
          <button type="button" className="server-call-btn" data-bs-toggle="modal" data-bs-target="#callModal">
            <i className="fa-solid fa-bell"></i>
            <span>{menuLanguage.Buttons?.CALL_WAITER?.Text || "📞 Повикай сервитьор"}</span>
          </button>
        )}
        
        {showLanguageOption && (
          <>
            <button className="language-selector-btn" data-bs-toggle="modal" data-bs-target="#languageModal">
              <i className="fas fa-globe"></i> 
              <span>{menuLanguage.Buttons?.CHANGE_LANGUAGE?.Text || "🌍 Избери език"}</span>
            </button>
            
            <div className="modal fade language-modal" id="languageModal" tabIndex="-1" style={{ display: 'none' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title"><i className="fas fa-globe"></i> {menuLanguage.Buttons?.CHANGE_LANGUAGE?.Text || "Избери език"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <ShowTranslateAPI objectData={objectData} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                      {menuLanguage.Header?.Information?.Close_Button || "Затвори"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      

      <div className="modal fade" id="callModal" tabIndex="-1" style={{ display: 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{menuLanguage.Buttons?.CALL_WAITER?.Text || "Повикай сервитьор"}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {callMessage && <div className="alert alert-success">{callMessage}</div>}
              {isLoading ? (
                <div className="text-center py-4">Изпращане...</div>
              ) : (
                <div className="row g-2">
                  {Object.values(CallKeys).slice(0, 8).map(key => (
                    <div className="col-6 mb-2" key={key}>
                      <button className="call-option-btn" onClick={() => handleCall(key)}>
                        {menuLanguage.Buttons?.CALL_WAITER?.options?.[key] || key}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-cancel" data-bs-dismiss="modal">
                {menuLanguage.Header?.Information?.Close_Button || "Затвори"}
              </button>
            </div>
          </div>
        </div>
      </div>
      

      {activeCategories.map((category) => {
        const categoryProducts = productsByCategory[category.entry_id] || [];
        const isExpanded = expandedCategories[category.entry_id];
        
        return (
          <div key={category.entry_id} className="category-item">
            <div className="category-header" onClick={() => toggleCategory(category.entry_id)}>
              <div className="category-title">
                {showProductIcons && (
                  <div className="category-icon">
                    <i className={category.category_mini_image || "fa-solid fa-cake-candles"}></i>
                  </div>
                )}
                <h3 className="category-name">{category.category_name}</h3>
                <span className="product-count">{categoryProducts.length}</span>
              </div>
              <span className={`category-arrow ${isExpanded ? 'open' : ''}`}>▼</span>
            </div>
            
            {isExpanded && (
              <div className="products-grid">
                <div className={getGridClass()}>
                  {categoryProducts.map((product) => {
                    const images = product.item_images ? JSON.parse(product.item_images) : [];
                    const firstImage = images[0] || '';
                    const priceInfo = getProductPrice(product);
                    
                    return (
                      <div key={product.item_id} className="product-card" onClick={() => openProduct(product)}>
                        <div className="product-image">
                          {firstImage ? (
                            <img src={`${getEnv()}/uploads/${firstImage}`} alt={product.item_name} onError={(e) => { e.target.src = '/images/placeholder.jpg'; }} />
                          ) : (
                            <div style={{ height: '100%', background: 'linear-gradient(135deg, #fef5e8, #fff8f0)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: '#ef7d00', fontSize: '2rem' }}>🍽️</span>
                            </div>
                          )}
                          {priceInfo.hasDiscount && showDiscountTags && (
                            <span className="discount-badge">-{priceInfo.discountPercent}%</span>
                          )}
                        </div>
                        <div className="product-info">
                          <div className="product-name">{product.item_name}</div>
                          {showDescriptions && product.product_description && (
                            <div className="product-description" dangerouslySetInnerHTML={{ 
                              __html: product.product_description.replace(/<[^>]*>/g, '').substring(0, 80) + '...' 
                            }} />
                          )}
                          {showPrices && (
                            <div className="product-price">
                              {formatPrice(priceInfo.price, product.item_currency, false)}
                              {priceInfo.hasDiscount && (
                                <span className="old">{formatPrice(priceInfo.original, product.item_currency, false)}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      

{modalOpen && selectedProduct && (() => {
  const images = selectedProduct.item_images ? JSON.parse(selectedProduct.item_images) : [];
  const firstImage = images[0];
  const priceInfo = getProductPrice(selectedProduct);
  const productAllergens = selectedProduct.item_allergenes ? JSON.parse(selectedProduct.item_allergenes) : [];
  
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{selectedProduct.item_name}</h3>
          <button className="modal-close" onClick={closeModal}>✕</button>
        </div>
        <div className="modal-body">
          {firstImage && (
            <img src={`${getEnv()}/uploads/${firstImage}`} alt={selectedProduct.item_name} className="modal-image" onError={(e) => { e.target.src = '/images/placeholder.jpg'; }} />
          )}
          
          {croMode.modal?.showPrice !== false && (
            <div className="modal-price">
              {formatPrice(priceInfo.price, selectedProduct.item_currency, false)}
              {priceInfo.hasDiscount && (
                <span style={{ fontSize: '1rem', marginLeft: '12px', textDecoration: 'line-through', color: '#b89a7a' }}>
                  {formatPrice(priceInfo.original, selectedProduct.item_currency, false)}
                </span>
              )}
            </div>
          )}
          
          {croMode.modal?.showDescription !== false && selectedProduct.product_description && (
            <div className="modal-description" dangerouslySetInnerHTML={{ __html: selectedProduct.product_description }} />
          )}
          

          {productAllergens.length > 0 && (
            <div className="allergens-section">
              <div className="allergens-title">
                <i className="fas fa-exclamation-triangle" style={{ color: '#ef7d00' }}></i>
                {menuLanguage?.Product_Details?.Allergens || "Алергени"}
              </div>
              <div className="allergens-list">
                {productAllergens.map((allergenId, idx) => {
                  
                  const allergen = ALLERGENES_LIST[String(allergenId)];
                  if (!allergen) return null;
                  const allergenName = allergen.allergen_name?.[menuLanguage?.currentLanguage || 'bg'] || allergen.allergen_name?.bg;
                  return (
                    <span key={idx} className="allergen-badge" title={allergen.allergen_name?.en || allergenName}>
                      {allergen.allergen_icon} {allergenName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          

          {hasAddonsAddon && productAddons && productAddons.length > 0 && (
            <div className="addons-section">
              <div className="addons-title">
                <i className="fas fa-plus-circle" style={{ color: '#ef7d00' }}></i>
                {menuLanguage?.Product_Details?.Addons || "Добавки"}
              </div>
              <ProductAddons 
                productData={selectedProduct} 
                ADDONS_LIST={productAddons}
                productInCart={productExists}
              />
            </div>
          )}
          

          {hasCartAddon && (
            <div className="quantity-selector">
              <button 
                className="quantity-btn" 
                onClick={() => decrementQuantity(selectedProduct.item_id, productQuantity, setProductQuantity)}
                disabled={productQuantity <= 1 || !productExists}
              >−</button>
              <span className="quantity-value">{productQuantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => incrementQuantity(selectedProduct.item_id, productQuantity, setProductQuantity)}
                disabled={!productExists}
              >+</button>
            </div>
          )}
          

          {hasCartAddon && (
            <button 
              className={`cart-modal-btn ${productExists ? 'remove' : ''} ${cartAnimation ? 'cart-animation' : ''}`}
              onClick={handleCartAction}
            >
              <i className={`fas ${productExists ? 'fa-trash-alt' : 'fa-shopping-cart'}`}></i>
              {productExists 
                ? (menuLanguage.Buttons?.CART_MANAGEMENT?.Remove_From_Cart || "Премахни от количката")
                : (menuLanguage.Buttons?.CART_MANAGEMENT?.Add_To_Cart || "Добави в количката")
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
})()}
      
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', function() {
          if (typeof bootstrap !== 'undefined') {
            var languageModalEl = document.getElementById('languageModal');
            var callModalEl = document.getElementById('callModal');
            if (languageModalEl) new bootstrap.Modal(languageModalEl);
            if (callModalEl) new bootstrap.Modal(callModalEl);
          }
        });
      ` }} />
    </div>
  );
};

export default CROLanding;
