import withObjectData from "../../../HOC/withObjectInfo";
import "../../Styles/ProductQuantity.css";
import { useEffect, useState } from "react";
import {
  decrementCartQuantity,
  incrementCartQuantity,
  removeCartItem,
} from "../../../handlers/CartQuantityHR";
import { ProductDetailsKeys } from "../../../keys/formKeys";
import LoadingAnimation from "../../Animations/Loading";
import usePersistedState from "../../../hooks/usePersistedState";
import { Link } from "react-router-dom";
import { PATH_LIST } from "../../../utils/pathList";
import CartAddons from "../Plugins/CartAddons";
import { hasAddon } from "../../../services/objectServices";
import PERK_LIST from "../../../utils/perkAddons";
import ShowAppMenu from "../../AppMenus/defaultMenu";
import { convertPrice, formatPrice } from "../../../utils/pricingUtils";

/**
 * ShowCart component.
 * @param {object} objectData - The object with the list of products, categories, etc.
 * @returns {JSX.Element} The JSX element representing the cart page.
 */
const ShowCart = ({ objectData }) => {
  const [cart, setCart] = usePersistedState("cart", []);
  const [cartPrototype, setCartPrototype] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [totalAddonsPrice, setTotalAddonsPrice] = useState(0);
  useEffect(() => {
    const getProductData = async () => {
      const filteredProducts = await Promise.all(
        cart.map(async (product) => {
          return objectData.allProducts.find(
            (item) => item.item_id === product?.productId
          );
        })
      );
      setCartPrototype(filteredProducts);

      // Вземаме добавките от localStorage
      const addonsData =
        JSON.parse(localStorage.getItem("selectedAddons")) || [];
      setSelectedAddons(addonsData);
    };

    getProductData();
  }, [cart, objectData]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    let totalDiscountsCount = 0;

    let totalPrice = cartItems.reduce((acc, cartItem) => {
      const product = cartPrototype.find(
        (product) => product.item_id === cartItem.productId
      );

      if (product && product.item_price && cartItem.productQuantity) {
        return acc + product.item_price * cartItem.productQuantity;
      }
      return acc;
    }, 0);

    let discountPrice = cartItems.reduce((acc, cartItem) => {
      const product = cartPrototype.find(
        (product) => product.item_id === cartItem.productId
      );

      if (
        product &&
        product.item_price &&
        product.has_discount &&
        cartItem.productQuantity
      ) {
        const discountedPrice =
          (product.item_price * (100 - product.discount_percentage)) / 100;
        totalDiscountsCount++; // Increment the count of items with discounts
        return acc + discountedPrice * cartItem.productQuantity;
      }
      return acc + (product?.item_price * cartItem.productQuantity || 0);
    }, 0);

    setTotalPrice(totalPrice);
    setDiscountPrice(discountPrice);
    setTotalDiscounts(totalDiscountsCount); // Set the total number of items with discounts
  }, [cartPrototype]);

  const handleDecrement = (productId) => {
    decrementCartQuantity(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.productQuantity > 1
          ? { ...item, productQuantity: item.productQuantity - 1 }
          : item
      )
    );
  };

  const handleIncrement = (productId) => {
    incrementCartQuantity(productId);
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId
          ? { ...item, productQuantity: item.productQuantity + 1 }
          : item
      )
    );
  };

  const handleRemove = (productId) => {
    removeCartItem(productId);
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
    console.log(JSON.parse(localStorage.getItem('selectedAddons')));
    
    // JSON.parse(localStorage.getItem('selectedAddons')).map((addon) => {
    //   if(addon.item_id === productId){
    //     handleRemoveAddon(addon.item_id);
      
    // }
    // })

    for(let addon in JSON.parse(localStorage.getItem('selectedAddons'))){
      if(JSON.parse(localStorage.getItem('selectedAddons'))[addon].item_id === productId){
        // get copy of the addons without the addon we want to remove
        const updatedAddons = JSON.parse(localStorage.getItem('selectedAddons')).filter((addon) => addon.item_id !== productId);
        localStorage.setItem("selectedAddons", JSON.stringify(updatedAddons));
        setSelectedAddons(updatedAddons);
      }
    }
  };

  const handleRemoveAddon = (addonId) => {

    const updatedAddons = selectedAddons.filter(
      (item) => item.addons.addon_id !== addonId
    );


    localStorage.setItem("selectedAddons", JSON.stringify(updatedAddons));


    setSelectedAddons(updatedAddons);
  };

  useEffect(() => {
    const totalAddonsPrice = selectedAddons.reduce((total, addon) => {
      return total + addon.addons.addon_price * addon.addons.addon_quantity;
    }, 0);
    setTotalAddonsPrice(totalAddonsPrice);
  }, [selectedAddons]);

  if (!objectData.objectInformation) {
    return <LoadingAnimation />;
  }
  console.log(objectData);

  return (
    <>
      <header className="header">
        <div className="main-bar">
          <div className="container">
            <div className="header-content">
              <div className="left-content">
                <Link to="/" className="back-btn">
                <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                  <path
                    d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
                  <path
                    d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
                </svg>
                </Link>
                <h5 className="title mb-0 text-nowrap">Количка</h5>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="page-content" style={{paddingBottom: '150px'}}>
        <div className="container bottom-content shop-cart-wrapper">
          <div className="item-list style-2">
            {cartPrototype.length === 0 ? (
<div className="empty-cart-container" style={{
  maxWidth: '500px',
  margin: '0 auto',
  padding: '2rem',
  textAlign: 'center',
  animation: 'fadeIn 0.5s ease-out'
}}>
  <div style={{
    position: 'relative',
    marginBottom: '2rem'
  }}>
    <div style={{
      width: '150px',
      height: '150px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 25px rgba(255, 154, 158, 0.3)',
      animation: 'bounce 2s infinite alternate'
    }}>
      <span style={{
        fontSize: '4rem',
        animation: 'pulse 1.5s infinite'
      }}>🛒</span>
    </div>
  </div>

  <h2 style={{
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#2d3436'
  }}>Количката ви е празна! <span style={{animation: 'wobble 1s infinite'}}>😕</span></h2>

  <p style={{
    fontSize: '1.1rem',
    color: '#636e72',
    marginBottom: '2rem',
    lineHeight: '1.6'
  }}>
    Няма продукти в количката ви все още. <br/>
    Но не се притеснявате, имаме много вкусни предложения! <span>😋</span>
  </p>

  <div style={{
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap'
  }}>
    <Link 
      to="/" 
      className="delivery-btn primary"
      style={{
        background: '#ff7675',
        color: 'white',
        padding: '0.8rem 2rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(255, 118, 117, 0.3)'
      }}
    >
      <span>🏠</span> Начална страница
    </Link>
    
    <Link 
      to={PATH_LIST.CATEGORY_LIST} 
      className="delivery-btn secondary"
      style={{
        background: 'white',
        color: '#ff7675',
        padding: '0.8rem 2rem',
        borderRadius: '50px',
        textDecoration: 'none',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
        border: '2px solid #ff7675',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
      }}
    >
      <span>🍔</span> Виж менюто
    </Link>
  </div>


  <style jsx>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes bounce {
      0% { transform: translateY(0); }
      100% { transform: translateY(-15px); }
    }
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    @keyframes wobble {
      0% { transform: rotate(0deg); }
      25% { transform: rotate(-5deg); }
      50% { transform: rotate(5deg); }
      75% { transform: rotate(-5deg); }
      100% { transform: rotate(0deg); }
    }
    .delivery-btn:hover {
      transform: translateY(-3px);
    }
    .delivery-btn.primary:hover {
      background: #e84393 !important;
      box-shadow: 0 7px 20px rgba(255, 118, 117, 0.4) !important;
    }
    .delivery-btn.secondary:hover {
      background: #f8f8f8 !important;
      boxShadow: 0 7px 20px rgba(0,0,0,0.1) !important;
    }
  `}</style>
</div>
            ) : (
            <ul>
              {cartPrototype.map((product, index) => (
              <li key={index} className="mb-4 p-3 border rounded-3 shadow-sm bg-white">
                <div className="d-flex flex-wrap gap-3">

                  <div className="item-media">
                    <img src={`https://v-menu.eu/uploads/${JSON.parse(product?.item_images)[0]}`}
                      alt={product?.item_name} style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      className="rounded-2" />
                  </div>

                  <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">
                          <Link to={`/products/${product?.item_id}`} className="text-dark text-decoration-none">
                          {product?.item_name}
                          </Link>
                        </h5>
                        <div className="text-muted small">{product?.category_names[0]}</div>
                      </div>

                      <button className="btn btn-sm btn-link text-danger p-0" onClick={()=>
                        handleRemove(product?.item_id)}
                        >
                        <i className="fa fa-trash fa-lg"></i>
                      </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">

                      {/* Price */}
                      <div>
                      {product?.has_discount ? (
                        <>
                          <div className="text-danger fw-bold">
                            {formatPrice(
                              product.item_price - (product.discount_percentage * product.item_price) / 100,
                              product.item_currency,
                              false
                            )}
                            <span className="euro-price text-muted ms-1">
                              (€{convertPrice(
                                product.item_price - (product.discount_percentage * product.item_price) / 100,
                                product.item_currency,
                                'EUR'
                              ).toFixed(2)})
                            </span>
                          </div>
                          <div className="text-muted small">
                            <del>
                              {formatPrice(product.item_price, product.item_currency, false)}
                              (€{convertPrice(product.item_price, product.item_currency, 'EUR').toFixed(2)})
                            </del>
                          </div>
                        </>
                      ) : (
                        <div className="fw-bold">
                          {formatPrice(product.item_price, product.item_currency, false)}
                          <span className="euro-price text-muted ms-1">
                            (€{convertPrice(product.item_price, product.item_currency, 'EUR').toFixed(2)})
                          </span>
                        </div>
                      )}
                    </div>

                      {/* Quantity */}
                      <div className="d-flex align-items-center border rounded px-2 py-1">
                        <button data-no-translate type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>
                          handleDecrement(product?.item_id)}
                          >
                          −
                        </button>
                        <span className="mx-2 fw-semibold" style={{ minWidth: '30px', textAlign: 'center' }}>
                          {cart[index]?.productQuantity}
                        </span>
                        <button data-no-translate type="button" className="btn btn-sm btn-outline-secondary" onClick={()=>
                          handleIncrement(product?.item_id)}
                          >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Addons */}
                {hasAddon(PERK_LIST.ADDONS) && (
                <div className="mt-3">
                  <CartAddons product={product} handleRemoveAddon={handleRemoveAddon} selectedAddons={selectedAddons} />
                </div>
                )}
              </li>

              ))}
            </ul>
            )}
          </div>
        </div>

        <div className="cart-summary-container" translate="no">
          <div className="summary-card">
            <div className="summary-grid">
              <div className="summary-row">
                <span className="summary-label">Продукти:</span>
                <span className="summary-value">
                  {Number(totalPrice).toFixed(2)} {objectData.objectInformation.object_currency}.
                </span>
              </div>

              <div className="summary-row">
                <span className="summary-label">Добавки:</span>
                <span className="summary-value addons">
                  +{Number(totalAddonsPrice).toFixed(2)} {objectData.objectInformation.object_currency}.
                </span>
              </div>

              {totalDiscounts > 0 && (
              <div className="summary-row">
                <span className="summary-label">Отстъпки:</span>
                <span className="summary-value discount">
                  -{Number(totalPrice - discountPrice).toFixed(2)} {objectData.objectInformation.object_currency}.
                </span>
              </div>
              )}

              <div className="divider"></div>

                <div className="summary-row total-row">
                  <span className="summary-label">Общо:</span>
                  <span className="summary-value total">
                    {Number(discountPrice + totalAddonsPrice).toFixed(2)} {objectData.objectInformation.object_currency}.
                    {objectData.objectInformation.object_currency !== 'EUR' && (
                      <span className="euro-conversion">
                        ≈ {convertPrice(
                          discountPrice + totalAddonsPrice,
                          objectData.objectInformation.object_currency,
                          'EUR'
                        ).toFixed(2)} €
                      </span>
                    )}
                  </span>
                </div>

              {totalDiscounts > 0 && (
              <div className="promo-badge">
                <span className="badge-icon">🎁</span>
                <span className="badge-text">
                  Използвани {totalDiscounts} {totalDiscounts === 1 ? 'отстъпка' : 'отстъпки'}
                </span>
              </div>
              )}
            </div>

            <Link to={totalPrice> 0 ? PATH_LIST.APP_CHECKOUT : "#"}
            className={`checkout-btn ${totalPrice > 0 ? '' : 'disabled'}`}
            aria-disabled={totalPrice <= 0} tabIndex={totalPrice <=0 ? -1 : 0} onClick={(e)=> {
              if (totalPrice <= 0) { e.preventDefault(); } }}>
                <span>Продължи към плащане</span>
                <span className="btn-arrow">→</span>
                </Link>
          </div>
        </div>
                  {objectData.MODULES.OBJECT_INFO.COMPONENT_MANAGEMENT.FOOTER.PAGE_CART && <ShowAppMenu />}
      </div>
    </>
  );
};

export default withObjectData(ShowCart);
