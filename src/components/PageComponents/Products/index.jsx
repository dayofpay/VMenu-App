import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { getProductAddonsList, getProductData, getProductsByCategory} from "../../../services/productServices";
import ProductDescription from "./ProductDescription";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../../handlers/ProductQuantityHR";
import CartContext from "../../../contexts/CartCTX";
import { ProductDetailsKeys } from "../../../keys/formKeys";
import useForm from "../../../hooks/useForm";
import * as storage from "../../../utils/memory";
import LoadingAnimation from "../../Animations/Loading";
import { getEnv } from "../../../utils/appData";
import { ALLERGENES_LIST } from "../../../utils/regulations";
import Allergens from "../Regulations/Allergens";
import ProductAddons from "../Plugins/Addons";
import { hasAddon } from "../../../services/objectServices";
import PERK_LIST from "../../../utils/perkAddons";
import { do_action } from "../../../services/userServices";
import { convertPrice, formatPrice } from "../../../utils/pricingUtils";
import { getMenuLanguage } from "../../../services/appServices";
import { interpolateString } from "../../../utils/stringUtiils";
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartUpdateHandler, cartDeleteHandler } = useContext(CartContext);
  const [productData, setProductData] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productExists, setProductExists] = useState(false);
  const [productAddons, setProductAddons] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const objectData = storage.getItem("objectData");
  const menuLanguage = getMenuLanguage();
  useEffect(() => {
        
    const fetchData = async () => {
      try {
        const [product, addons] = await Promise.all([
          getProductData(id),
          getProductAddonsList(id),
        ]);
        setProductData(product);
        setProductAddons(addons);
        const relatedProducts = await getProductsByCategory(JSON.parse(product.item_categories)[0]);

        setRelatedProducts(relatedProducts);
setCategoryNames([...new Set(product.category_names)]);

        
      } catch (error) {
        console.error("Error fetching data:", error);

      }
    };
    
    fetchData();
  }, [id]);

  const { values, onChange, onSubmit, setValues } = useForm(
    async () => {
      try {
        if (!productExists) {
          await cartUpdateHandler(values, setProductExists);
          do_action("add_to_cart", {product_id: productData.item_id});
        } else {
          do_action("remove_from_cart", {product_id: productData.item_id});
          await cartDeleteHandler(values, setProductExists);
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    {
      [ProductDetailsKeys.PRODUCT_ID]: productData.item_id,
      [ProductDetailsKeys.PRODUCT_QUANTITY]: productQuantity,
    }
  );

  useEffect(() => {    
    try {
      setValues((prevValues) => ({
        ...prevValues,
        [ProductDetailsKeys.PRODUCT_ID]: productData?.["item_id"] || "Зареждане...",
        [ProductDetailsKeys.PRODUCT_QUANTITY]: productQuantity,
      }));
      setProductExists(
        storage
          .getItem("cart")
          .some((product) => product.productId === productData.item_id)
      );
    } catch (error) {
      navigate("/");
    }
  }, [productData, productQuantity]);

  useEffect(() => {
    new Swiper(".product-swiper", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      autoplay: {
        delay: 3000,
      },
    });
  }, []);

  useEffect(() => {

    
    if (productData?.item_id) {
      do_action("product_view", { 
        product_id: productData.item_id,
        product_name: productData.item_name 
      });
    }
  }, [productData?.item_id]);

  if (!productData.item_images) {
    return <LoadingAnimation />;
  }

  return (
    <div style={styles.container}>
      <style>
        {
          ` .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
          }

          .swiper-pagination-bullet-active {
            background: #fff;
          }

          `
        }
      </style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link to={`/category/${JSON.parse(productData.item_categories)[0]}`} style={styles.backButton}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill="currentColor" />
          </svg>
          </Link>
          <h1 style={styles.headerTitle}>{getMenuLanguage().Product_Details}</h1>
          <div style={styles.headerSpacer}></div>
        </div>
      </header>

      <form onSubmit={onSubmit}>
        <div style={styles.content}>
          <input type="hidden" name={ProductDetailsKeys.PRODUCT_ID} value={productData.item_id} />

          {/* Product Gallery */}
<div style={styles.gallery}>
  <div className="product-swiper" style={styles.swiper}>
    <div className="swiper-wrapper">
      {(() => {
        try {
          const images = typeof productData.item_images === 'string' 
            ? JSON.parse(productData.item_images || '[]')
            : Array.isArray(productData.item_images)
              ? productData.item_images
              : [];
          
          if (images.length === 0) {
            return (
              <div className="swiper-slide" style={styles.slide}>
                <div style={styles.imageContainer}>
                  <img 
                    src={`https://v-menu.eu/errors/no-image.png`} 
                    style={styles.productImage} 
                    alt={productData.item_name || 'Продукт без изображение'}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          }

          return images.map((image, index) => (
            <div className="swiper-slide" key={index} style={styles.slide}>
              <div style={styles.imageContainer}>
                <img 
                  src={`${getEnv()}/uploads/${image}`} 
                  style={styles.productImage} 
                  alt={`${productData.item_name} - Изображение ${index + 1}`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = `https://v-menu.eu/errors/no-image.png`;
                  }}
                />
              </div>
            </div>
          ));

        } catch (error) {
          return (
            <div className="swiper-slide" style={styles.slide}>
              <div style={styles.imageContainer}>
                <img 
                  src={`https://v-menu.eu/errors/no-image.png`} 
                  style={styles.productImage} 
                  alt="Грешка при зареждане на изображенията"
                  loading="lazy"
                />
              </div>
            </div>
          );
        }
      })()}
    </div>
    <div className="swiper-pagination" style={styles.pagination}></div>
  </div>
</div>

          {/* Product Info */}
          <div style={styles.productInfo}>
            <div style={styles.productMeta}>
              <span style={styles.categories}>
                {categoryNames.join(" • ")}
              </span>
              <h2 style={styles.productName}>{productData.item_name}</h2>

              <div style={styles.stats}>
                <div style={styles.statItem}>
                            <i 
                              className="fas fa-eye" 
                              style={{
                                ...styles.statIcon,
                                visibility: productData?.settings?.VISUAL_SETTINGS?.SHOW_PRODUCT_VIEW_COUNT ? 'visible' : 'hidden'
                              }}
                            ></i>
                            <span 
                              style={{
                                visibility: productData?.settings?.VISUAL_SETTINGS?.SHOW_PRODUCT_VIEW_COUNT ? 'visible' : 'hidden'
                              }}
                            >
                              {productData?.product_views || 0} {menuLanguage.Products.Product_Views}
                            </span>
                </div>

                {productData.hasDiscount && (
                <div style={{...styles.statItem, ...styles.discountBadge}}>
                  <i className="fas fa-tag" style={styles.statIcon}></i>
                  <span>-{productData.discount_percentage}%</span>
                </div>
                )}
              </div>
            </div>

            <ProductDescription description={productData.product_description} />

            {/* Price Section */}
            <div style={styles.priceSection}>
  <div style={styles.priceContainer}>
    {productData.hasDiscount ? (
      <>
        <div style={styles.currentPrice}>
          <span style={styles.priceMain}>
            {formatPrice(
              productData.item_price - (productData.discount_percentage * productData.item_price) / 100,
              productData.item_currency,
              false
            )}
          </span>
          {productData.item_currency === 'BGN' && (
            <span style={styles.priceSecondary}>
              (€{convertPrice(
                productData.item_price - (productData.discount_percentage * productData.item_price) / 100,
                'BGN',
                'EUR'
              ).toFixed(2)})
            </span>
          )}
        </div>
        <div style={styles.originalPrice}>
          <span style={styles.strikethrough}>
            {formatPrice(productData.item_price, productData.item_currency, false)}
          </span>
          <span style={styles.discountPercent}>
            -{productData.discount_percentage}%
          </span>
        </div>
      </>
    ) : (
      <div style={styles.currentPrice}>
        <span style={styles.priceMain}>
          {formatPrice(productData.item_price, productData.item_currency, false)}
        </span>
        {productData.item_currency === 'BGN' && (
          <span style={styles.priceSecondary}>
            (€{convertPrice(productData.item_price, 'BGN', 'EUR').toFixed(2)})
          </span>
        )}
      </div>
    )}
  </div>

  {hasAddon(PERK_LIST.CART) && (
    <div style={styles.quantitySelector}>
      <button 
        type="button" 
        style={styles.quantityButton} 
        onClick={() => decrementQuantity(productData.item_id,productQuantity, setProductQuantity)}
        disabled={!productExists}
        aria-label="Намали количество"
      >
        −
      </button>
      <div style={styles.quantityDisplay}>
        <input 
          type="text" 
          name={ProductDetailsKeys.PRODUCT_QUANTITY} 
          value={productQuantity} 
          readOnly
          style={styles.quantityInput} 
          aria-label="Текущо количество" 
        />
      </div>
      <button 
        type="button" 
        style={styles.quantityButton} 
        onClick={() => incrementQuantity(productData.item_id,productQuantity, setProductQuantity)}
        disabled={!productExists}
        aria-label="Увеличи количество"
      >
        +
      </button>
    </div>
  )}
</div>

            {/* Allergens and Addons */}
            <Allergens productData={productData} ALLERGENES_LIST={ALLERGENES_LIST} />

            {hasAddon(PERK_LIST.ADDONS) && (
            <ProductAddons productData={productData} ADDONS_LIST={productAddons}
              productInCart={storage.getItem("cart").some( (product)=> product.productId === productData.item_id
              )}
              />
              )}
          </div>


{hasAddon(PERK_LIST.UPSELL) && (
  productData?.settings?.upsellDetailed?.length > 0 ? (
    <div style={styles.upsellSection}>
      <h3 style={styles.upsellTitle}>
        {(productData.settings.CONVERSION_BOOST_MODULES.UPSELL.TEXT).length > 0 ? productData.settings.CONVERSION_BOOST_MODULES.UPSELL.TEXT : interpolateString(menuLanguage.Marketing_Modules.UpSell.FallBack_Text, { category: productData.category_names[0] })}
      </h3>
      <div style={styles.upsellGrid}>
        {productData.settings.upsellDetailed.slice(0, 4).map((product) => (
          <Link to={`/products/${product.item_id}`} key={product.item_id} style={styles.upsellCard}>
            <div style={styles.upsellImageContainer}>
<img 
  src={`${getEnv()}/uploads/${
    typeof product.item_images === 'string' 
      ? (JSON.parse(product.item_images || '[]')[0] || 'https://v-menu.eu/errors/no-image.png')
      : (Array.isArray(product.item_images) ? product.item_images[0] : 'https://v-menu.eu/errors/no-image.png')
  }`} 
  style={styles.upsellImage}
  alt={product.item_name || 'Product image'} 
  loading="lazy"
  onError={(e) => {
    e.target.src = `https://v-menu.eu/errors/no-image.png`;
  }}
/>
            </div>
            <div style={styles.upsellInfo}>
              <h4 style={styles.upsellName}>{product.item_name}</h4>
              <div style={styles.upsellPrice}>
                {new Date(product.discount_expires) >= new Date() && product.discount_percentage > 0 ? (
                  <>
                    <span style={styles.upsellCurrentPrice}>
                      {(product.item_price - (product.discount_percentage * product.item_price) / 100).toFixed(2)} {product.item_currency}.
                    </span>
                    <span style={styles.upsellOriginalPrice}>
                      {product.item_price.toFixed(2)} {product.item_currency}.
                    </span>
                  </>
                ) : (
                  <span style={styles.upsellCurrentPrice}>
                    {product.item_price.toFixed(2)} {product.item_currency}.
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    Array.isArray(relatedProducts?.categoryData?.[0]) && relatedProducts.categoryData[0].length > 0 && (
      <div style={styles.upsellSection}>
<h3 style={styles.upsellTitle}>
  {interpolateString(menuLanguage.Marketing_Modules.UpSell.FallBack_Text, {
    category: relatedProducts.categoryData[1]?.categoryName
  })}
</h3>
        <div style={styles.upsellGrid}>
          {relatedProducts.categoryData[0].slice(0, 4).map((product) => (
            <Link to={`/products/${product.item_id}`} key={product.item_id} style={styles.upsellCard}>
              <div style={styles.upsellImageContainer}>
              <img 
                src={`${getEnv()}/uploads/${
                  typeof product.item_images === 'string' 
                    ? (JSON.parse(product.item_images || '[]')[0] || 'https://v-menu.eu/errors/no-image.png')
                    : (Array.isArray(product.item_images) ? product.item_images[0] : 'https://v-menu.eu/errors/no-image.png')
                }`} 
                style={styles.upsellImage}
                alt={product.item_name || 'Product image'} 
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://v-menu.eu/errors/no-image.png`;
                }}
              />
              </div>
              <div style={styles.upsellInfo}>
                <h4 style={styles.upsellName}>{product.item_name}</h4>
                <div style={styles.upsellPrice}>
                  {new Date(product.discount_expires) >= new Date() && product.discount_percentage > 0 ? (
                    <>
                      <span style={styles.upsellCurrentPrice}>
                        {(product.item_price - (product.discount_percentage * product.item_price) / 100).toFixed(2)} {product.item_currency}.
                      </span>
                      <span style={styles.upsellOriginalPrice}>
                        {product.item_price.toFixed(2)} {product.item_currency}.
                      </span>
                    </>
                  ) : (
                    <span style={styles.upsellCurrentPrice}>
                      {product.item_price.toFixed(2)} {product.item_currency}.
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  )
)}

        </div>

        {/* Fixed Footer Button */}
        {hasAddon(PERK_LIST.CART) && (
        <div style={{
              ...styles.footer,
              visibility: objectData.license.data.plan_id === 1 ? "hidden" : "visible",
            }}>
          <button type="submit" style={{
                ...styles.cartButton,
                ...(productExists ? styles.cartButtonRemove : {})
              }}>
            <i className={`fas ${productExists ? 'fa-trash-alt' : 'fa-shopping-cart' }`} style={styles.cartIcon}></i>
{!productExists 
  ? menuLanguage.Buttons.CART_MANAGEMENT.Add_To_Cart 
  : menuLanguage.Buttons.CART_MANAGEMENT.Remove_From_Cart
}
          </button>
        </div>
        )}
      </form>
    </div>
    );
}

const styles = {
  container: {
    maxWidth: '100%',
    background: '#fff',
    color: '#333',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
    paddingBottom: '80px'
  },
  header: {
    position: 'sticky',
    top: 0,
    background: '#fff',
    padding: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    zIndex: 10
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#f5f5f5',
    color: '#333',
    marginRight: '15px',
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  },
  headerTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    margin: 0
  },
  headerSpacer: {
    flex: 1
  },
  gallery: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    position: 'relative'
  },
  swiper: {
    width: '100%',
    height: '100%'
  },
  slide: {
    width: '100%',
    height: '100%'
  },
imageContainer: {
  width: '100%',
  height: '100%',
  background: '#f9f9f9',
  overflow: 'hidden'
}
,
productImage: {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
},
  pagination: {
    position: 'absolute',
    bottom: '10px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  productInfo: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  productMeta: {
    marginBottom: '20px'
  },
  categories: {
    display: 'block',
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '5px'
  },
  productName: {
    fontSize: '1.8rem',
    fontWeight: 700,
    margin: '0 0 15px 0',
    color: '#222'
  },
  stats: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.9rem',
    color: '#666'
  },
  statIcon: {
    fontSize: '1rem'
  },
  discountBadge: {
    color: '#e53935',
    fontWeight: 500
  },
  priceSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '25px 0',
    padding: '20px 0',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee'
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  currentPrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px'
  },
  priceMain: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#2e7d32'
  },
  priceSecondary: {
    fontSize: '1rem',
    color: '#666'
  },
  originalPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px'
  },
  strikethrough: {
    textDecoration: 'line-through',
    color: '#999',
    fontSize: '1.2rem'
  },
  discountPercent: {
    background: '#ffebee',
    color: '#e53935',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: 500
  },
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  quantityButton: {
    width: '40px',
    height: '40px',
    background: '#f5f5f5',
    border: 'none',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  quantityDisplay: {
    width: '50px'
  },
  quantityInput: {
    width: '100%',
    height: '40px',
    textAlign: 'center',
    border: 'none',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    fontSize: '1rem'
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '15px',
    background: '#fff',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
    zIndex: 10
  },
  cartButton: {
    width: '100%',
    padding: '15px',
    border: 'none',
    borderRadius: '8px',
    background: '#2e7d32',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cartButtonRemove: {
    background: '#e53935'
  },
  cartIcon: {
    fontSize: '1.1rem'
  },
  upsellSection: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    borderTop: '1px solid #eee'
  },
  upsellTitle: {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginBottom: '20px',
    color: '#333'
  },
  upsellGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px'
  },
  upsellCard: {
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-3px)'
    }
  },
  upsellImageContainer: {
    width: '100%',
    height: '120px',
    background: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  upsellImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
  },
  upsellInfo: {
    padding: '12px'
  },
  upsellName: {
    fontSize: '1rem',
    fontWeight: 500,
    margin: '0 0 8px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  upsellPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  upsellCurrentPrice: {
    fontWeight: 600,
    color: '#2e7d32'
  },
  upsellOriginalPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through'
  }
};

// Responsive styles
const mediaQueries = `
  @media (min-width: 768px) {
    .product-gallery {
      height: 400px;
    }
    
    .product-info {
      padding: 30px;
    }

    .upsell-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .product-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .product-gallery {
      height: 500px;
      position: sticky;
      top: 70px;
      align-self: start;
    }
    
    .product-info {
      padding: 40px;
    }
    
    .product-footer {
      padding: 15px calc(50% - 600px);
    }
  }
`;
