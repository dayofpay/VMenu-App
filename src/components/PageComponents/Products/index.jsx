import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import {
  getProductAddonsList,
  getProductData,
} from "../../../services/productServices";
import { useState } from "react";
import ProductDescription from "./ProductDescription";
import "../../Styles/ProductQuantity.css";
import "../../Styles/AllergeneList.css";
import "../../Styles/ProductDetails.css";
import "../../Styles/Swiper.css"
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
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cartUpdateHandler, cartDeleteHandler } = useContext(CartContext);
  const [productData, setProductData] = useState({});
  const [categoryNames, setCategoryNames] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [productExists, setProductExists] = useState(false);
  const [productAddons, setProductAddons] = useState([]);

  const objectData = storage.getItem("objectData");
  useEffect(() => {
    document.title = "Детайли за продукт";
    const getProduct = async () => {
      try {
        const data = await getProductData(id);
        setProductData(data);
        const updatedCategoryNames = [...categoryNames];
        data.category_names.forEach((category) => {
          updatedCategoryNames.push(category);
        });
        setCategoryNames(updatedCategoryNames);
      } catch (error) {
        // Handle error
        console.error("Error fetching product data:", error);
      }
    };

    const getProductAddons = async () => {
      try {
        const data = await getProductAddonsList(id);
        setProductAddons(data);
      } catch (error) {
        // Handle error
        console.error("Error fetching product data:", error);
      }
    };
    getProductAddons();
    getProduct();
  }, [id]);
  console.log(productExists);
  
  const { values, onChange, onSubmit, setValues } = useForm(
    async () => {
      try {
        if (!productExists) {
          await cartUpdateHandler(values, setProductExists);
          console.log("Product does not exist");
        } else {
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
        [ProductDetailsKeys.PRODUCT_ID]:
          productData?.["item_id"] || "Зареждане...",
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
    new Swiper(".demo-swiper", {
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
  if (!productData.item_images) {
    return <LoadingAnimation />;
  }

  return (
    <div className="page-wraper">
      <header className="header transparent">
        <div className="main-bar">
          <div className="container">
            <div className="header-content">
              <div className="left-content">
                <Link to={`/category/${JSON.parse(productData.item_categories)[0]}`} className="back-btn">
                  <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                    <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z" />
                    <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
                  </svg>
                </Link>
                <h5 className="title mb-0 text-nowrap">Детайли за продукт</h5>
              </div>
              <div className="mid-content"></div>
              {/* <div className="right-content">
              </div> */}
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={onSubmit}>
        <div className="page-content">
          <input
            type="hidden"
            name={ProductDetailsKeys.PRODUCT_ID}
            value={productData.item_id}
          />
          <div className="content-body bottom-content">
          <div className="swiper-btn-center-lr my-0">
              <div className="swiper demo-swiper">
                <div className="swiper-wrapper">
                  {Array.from(JSON.parse(productData.item_images)).map(
                    (image, index) => (
                      <div className="swiper-slide" key={index}>
                        <div className="dz-banner-heading">
                          <div className="overlay-black-light">
                            <img
                              src={`${getEnv()}/uploads/${image}`}
                              className="bnr-img"
                              alt="bg-image"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <div className="swiper-btn">
                  <div className="swiper-pagination style-2 flex-1"></div>
                </div>
              </div>
            </div>

            <div className="account-box style-1">
              <div className="container">
                <div className="company-detail">
                  <div className="detail-content">
                    <div className="flex-1">
                      <h6 className="text-secondary sub-title">
                        {categoryNames.join(" , ")}
                      </h6>
                      <h4>{productData.item_name}</h4>
                      <ProductDescription
                        description={productData.product_description}
                      />
                    </div>
                  </div>
                  <ul className="item-inner">
                    <li>
                      <a className="d-flex delivery" href="#">
                        <i class="fa-solid fa-eye"></i>
                        <h6 className="mb-0 ms-2">
                          {productData.product_views} човека са разглеждали този
                          продукт
                        </h6>
                      </a>
                    </li>
                    {productData.hasDiscount ? (
                      <li>
                        <div className="reviews-info">
                          <i class="fa-solid fa-tags"></i>
                          <h6 className="reviews">В момента намален</h6>
                        </div>
                      </li>
                    ) : null}
                    {/* <li>
									<div className="reviews-info">
										<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M21.3899 11.6C21.6646 11.3192 21.8559 10.9676 21.9424 10.5845C22.029 10.2013 22.0073 9.80162 21.8799 9.43003C21.7604 9.05734 21.5386 8.7257 21.2398 8.47289C20.941 8.22007 20.5773 8.05623 20.1899 8.00003L15.8999 7.34003C15.8799 7.33423 15.8615 7.32404 15.8459 7.3102C15.8303 7.29636 15.818 7.27922 15.8099 7.26003L13.9299 3.26003C13.7651 2.88547 13.4949 2.56693 13.1522 2.34321C12.8095 2.1195 12.4092 2.00026 11.9999 2.00003C11.5954 1.99835 11.1991 2.11354 10.8585 2.33174C10.5179 2.54994 10.2475 2.86187 10.0799 3.23003L8.19994 7.23003C8.18968 7.24953 8.1755 7.2667 8.15829 7.28047C8.14108 7.29423 8.12122 7.3043 8.09994 7.31003L3.81994 8.00003C3.43203 8.05782 3.06776 8.22207 2.76764 8.47453C2.46751 8.72699 2.2433 9.05775 2.11994 9.43003C1.99723 9.80291 1.97896 10.2023 2.0671 10.5848C2.15524 10.9673 2.34643 11.3184 2.61994 11.6L5.77994 14.85C5.78903 14.8705 5.79373 14.8926 5.79373 14.915C5.79373 14.9374 5.78903 14.9596 5.77994 14.98L5.03994 19.52C4.97114 19.9154 5.01599 20.3222 5.16926 20.6931C5.32253 21.064 5.57794 21.3838 5.90577 21.6152C6.23361 21.8467 6.62042 21.9804 7.02122 22.0007C7.42203 22.021 7.82037 21.9272 8.16994 21.73L11.8999 19.66C11.9185 19.6504 11.939 19.6453 11.9599 19.6453C11.9808 19.6453 12.0014 19.6504 12.0199 19.66L15.7499 21.73C16.1 21.9229 16.4972 22.0135 16.8963 21.9913C17.2953 21.9691 17.6801 21.8351 18.0065 21.6045C18.333 21.374 18.5881 21.0563 18.7425 20.6877C18.897 20.3191 18.9446 19.9144 18.8799 19.52L18.1899 15C18.1794 14.9818 18.1739 14.9611 18.1739 14.94C18.1739 14.919 18.1794 14.8983 18.1899 14.88L21.3899 11.6Z"
												fill="#FFA902" />
										</svg>
										<h6 className="reviews">4.6 (4 ревюта)</h6>
									</div>
								</li>
								<li>
									<a className="d-flex delivery" href="#">
										<svg xmlns="http://www.w3.org/2000/svg"
											className="icon icon-tabler icon-tabler-trending-up" width="24" height="24"
											viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none"
											stroke-linecap="round" stroke-linejoin="round">
											<path stroke="none" d="M0 0h24v24H0z" fill="none" />
											<path d="M3 17l6 -6l4 4l8 -8" />
											<path d="M14 7l7 0l0 7" />
										</svg>
										<h6 className="mb-0 ms-2">НАБИРАЩ ПОПУЛЯРНОСТ</h6>
									</a>
								</li> */}
                  </ul>
                </div>

                <div className="price-quantity-wrapper">
                  <div className="price-section">
                    <span className="price-label">Цена</span>
                    {productData.hasDiscount ? (
                      <div className="discount-price-group">
                        <h3 className="current-price">
                          BGN{" "}
                          {(
                            productData.item_price -
                            (productData.discount_percentage *
                              productData.item_price) /
                              100
                          ).toFixed(2)}
                        </h3>
                        <div className="original-price-group">
                          <span className="original-price">
                            BGN {productData.item_price.toFixed(2)}
                          </span>
                          <span className="discount-badge">
                            -{productData.discount_percentage}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <h3 className="current-price">
                        BGN {productData.item_price.toFixed(2)}
                      </h3>
                    )}
                  </div>

                  {hasAddon(PERK_LIST.CART) ? (                  <div className="modern-quantity">
                    <button
                      type="button"
                      className="quantity-control minus"
                      onClick={() =>
                        decrementQuantity(productQuantity, setProductQuantity)
                      }
                      aria-label="Reduce quantity"
                    >
                      <span className="control-icon">−</span>
                    </button>
                    <div className="quantity-display">
                      <input
                        type="text"
                        name={ProductDetailsKeys.PRODUCT_QUANTITY}
                        value={productQuantity}
                        readOnly
                        className="quantity-input"
                        aria-label="Current quantity"
                      />
                    </div>
                    <button
                      type="button"
                      className="quantity-control plus"
                      onClick={() =>
                        incrementQuantity(productQuantity, setProductQuantity)
                      }
                      aria-label="Increase quantity"
                    >
                      <span className="control-icon">+</span>
                    </button>
                  </div>) : null}
                </div>
                {productData.hasDiscount ? (
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="badge bg-accent badge-lg badge-warning font-w400 px-3">
                      В момента намален на -{productData.discount_percentage}% !
                    </div>
                  </div>
                ) : null}
              <Allergens
                productData={productData}
                ALLERGENES_LIST={ALLERGENES_LIST}
              />
              {hasAddon(PERK_LIST.ADDONS) ? (
                <ProductAddons
                  productData={productData}
                  ADDONS_LIST={productAddons}
                  productInCart={storage
                    .getItem("cart")
                    .some(
                      (product) => product.productId === productData.item_id
                    )}
                />
              ) : null}
              </div>
            </div>
          </div>
          {hasAddon(PERK_LIST.CART) ? (
            <div
              className="footer fixed"
              style={{
                visibility:
                  objectData.license.data.plan_id === 1 ? "hidden" : "visible",
              }}
            >
              <div className="container">
                <button
                  type="submit"
                  className={
                    !productExists
                      ? "btn btn-primary text-start w-100"
                      : "btn btn-danger text-start w-100"
                  }
                >
                  <svg
                    className="cart me-4"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.1776 17.8443C16.6362 17.8428 15.3854 19.0912 15.3839 20.6326C15.3824 22.1739 16.6308 23.4247 18.1722 23.4262C19.7136 23.4277 20.9643 22.1794 20.9658 20.638C20.9658 20.6371 20.9658 20.6362 20.9658 20.6353C20.9644 19.0955 19.7173 17.8473 18.1776 17.8443Z"
                      fill="white"
                    />
                    <path
                      d="M23.1278 4.47973C23.061 4.4668 22.9932 4.46023 22.9251 4.46012H5.93181L5.66267 2.65958C5.49499 1.46381 4.47216 0.574129 3.26466 0.573761H1.07655C0.481978 0.573761 0 1.05574 0 1.65031C0 2.24489 0.481978 2.72686 1.07655 2.72686H3.26734C3.40423 2.72586 3.52008 2.82779 3.53648 2.96373L5.19436 14.3267C5.42166 15.7706 6.66363 16.8358 8.12528 16.8405H19.3241C20.7313 16.8423 21.9454 15.8533 22.2281 14.4747L23.9802 5.74121C24.0931 5.15746 23.7115 4.59269 23.1278 4.47973Z"
                      fill="white"
                    />
                    <path
                      d="M11.3404 20.5158C11.2749 19.0196 10.0401 17.8418 8.54244 17.847C7.0023 17.9092 5.80422 19.2082 5.86645 20.7484C5.92617 22.2262 7.1283 23.4008 8.60704 23.4262H8.67432C10.2142 23.3587 11.4079 22.0557 11.3404 20.5158Z"
                      fill="white"
                    />
                  </svg>
                  {!productExists
                    ? "ДОБАВИ В КОЛИЧКАТА"
                    : "ПРЕМАХНИ ОТ КОЛИЧКАТА"}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
