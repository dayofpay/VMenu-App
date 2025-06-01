import { Link } from "react-router-dom";
import LoadingAnimation from "../../../Animations/Loading";
import "../../../Styles/happy-icons.min.css";
import "../../../Styles/elegant-icons.min.css";
import "../../../Styles/feather-icons.min.css";
import "../../../Styles/foundation-icons.min.css";
import "../../../Styles/open-iconic.min.css";
import "../../../Styles/tabler-icons.min.css";
import "../../../Styles/LatestProducts.css";
import "../../../Styles/Accent.css";
import GeneratePrefix from "../../../utils/../../utils/categoryPrefix";
import { PATH_LIST } from "../../../../utils/pathList";
import { getEnv } from "../../../../utils/appData";
import { useState, useEffect, useContext } from "react";
import { CallKeys } from "../../../../keys/formKeys";
import { createCall } from "../../../../services/userServices";
import { hasAddon } from "../../../../services/objectServices";
import PERK_LIST from "../../../../utils/perkAddons";
import { getProductsByCategory } from "../../../../services/productServices";
import { CooldownContext } from "../../../../contexts/CoolDownCTX";

const HomeContent = ({ objectData }) => {
  const [callMessage, setCallMessage] = useState("");
  const { cooldowns, setCooldowns, remainingTimes,setRemainingTimes } = useContext(CooldownContext);
  const [isLoading, setIsLoading] = useState(false);
  
  // Cooldown time in seconds
  const COOLDOWN_TIME = 60;
  
  const categoryHighlight = objectData.MODULES.OBJECT_INFO.LANDING_PAGE_SETTINGS.PRESENTATION_LAYER_SETTINGS.MODE_SETTINGS.SELECTED_CATEGORY;
  const landingPageSettings = objectData.MODULES.OBJECT_INFO.LANDING_PAGE_SETTINGS;
  const accentSettings = landingPageSettings.ACCENT_TEXT_SETTINGS;
  
  const [categoryData, setCategoryData] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  
  useEffect(() => {
    const getData = async() => {
      setCategoryData(categoryHighlight.CATEGORY);
      const categoryItemList = await getProductsByCategory(categoryHighlight.CATEGORY);
      setCategoryItems(categoryItemList.categoryData[0]);
    }
    
    getData();
  }, [objectData]);

  useEffect(() => {
    // Timer to update remaining cooldown times
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const updatedTimes = {};
      let hasActiveCooldowns = false;
      
      Object.keys(cooldowns).forEach(key => {
        const remainingSeconds = Math.max(0, Math.ceil((cooldowns[key] + (COOLDOWN_TIME * 1000) - currentTime) / 1000));
        if (remainingSeconds > 0) {
          updatedTimes[key] = remainingSeconds;
          hasActiveCooldowns = true;
        }
      });
      
      setRemainingTimes(updatedTimes);
      
      // If no active cooldowns, clear interval
      if (!hasActiveCooldowns) {
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [cooldowns]);
  
  const handleCall = (action) => {
    const currentTime = Date.now();
    
    // Check if button is on cooldown
    if (cooldowns[action] && currentTime < cooldowns[action] + (COOLDOWN_TIME * 1000)) {
      const remainingSeconds = Math.ceil((cooldowns[action] + (COOLDOWN_TIME * 1000) - currentTime) / 1000);
      setCallMessage(`Моля, изчакайте ${remainingSeconds} секунди преди да повикате отново.`);
      return;
    }
    
    // Set cooldown for this button
    setCooldowns(prev => ({
      ...prev,
      [action]: currentTime
    }));
    
    setRemainingTimes(prev => ({
      ...prev,
      [action]: COOLDOWN_TIME
    }));
    
    setIsLoading(true);
    
    // Execute the existing call logic
    createCall({ call_reason: action }).then((result) => {
      setIsLoading(false);
      !result.hasError
        ? setCallMessage(result.msg)
        : setCallMessage(result.msg);
    });
  };
  
  return (
    <>
      <div className="page-content">
        <div className="content-inner pt-0">
          <div className="container p-b30">
            {/* <div className="search-box mb-4">
					<div className="mb-3 input-group input-radius">
						<span className="input-group-text">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z"
									fill="#7D8FAB" />
							</svg>
						</span>
						<input type="text" placeholder="Потърсете продукт..."
							className="form-control main-in ps-0 bs-0" />
					</div>
				</div> */}

<div className="dashboard-area">
      {hasAddon(PERK_LIST.CALLS) ? (
        <button
          type="button"
          className="server-call-btn"
          data-bs-toggle="modal"
          data-bs-target="#callModal"
        >
          <i className="fa-solid fa-bell"></i>
          <span>Повикване на сервитьор</span>
        </button>
      ) : null}
      
      <div
        className="modal fade"
        id="callModal"
        style={{ display: "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Повикване</h5>
              <button className="btn-close" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <form>
              <div className="modal-body">
                {callMessage && (
                  <div className="alert alert-success">
                    {callMessage}
                  </div>
                )}
                {isLoading ? (
                  <div className="text-center py-3">
                    <LoadingAnimation />
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.CHANGE_ASH_TRAY] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.CHANGE_ASH_TRAY)}
                        disabled={remainingTimes[CallKeys.CHANGE_ASH_TRAY] > 0}
                      >
                        Смяна на пепелник
                        {remainingTimes[CallKeys.CHANGE_ASH_TRAY] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.CHANGE_ASH_TRAY] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.CHANGE_ASH_TRAY]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.REQUEST_BILL] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.REQUEST_BILL)}
                        disabled={remainingTimes[CallKeys.REQUEST_BILL] > 0}
                      >
                        Поискване на сметка
                        {remainingTimes[CallKeys.REQUEST_BILL] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.REQUEST_BILL] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.REQUEST_BILL]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.CHANGE_CUTLERY] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.CHANGE_CUTLERY)}
                        disabled={remainingTimes[CallKeys.CHANGE_CUTLERY] > 0}
                      >
                        Смяна на прибори
                        {remainingTimes[CallKeys.CHANGE_CUTLERY] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.CHANGE_CUTLERY] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.CHANGE_CUTLERY]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.REFILL_WATER] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.REFILL_WATER)}
                        disabled={remainingTimes[CallKeys.REFILL_WATER] > 0}
                      >
                        Попълване на вода
                        {remainingTimes[CallKeys.REFILL_WATER] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.REFILL_WATER] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.REFILL_WATER]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.CLEAN_TABLE] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.CLEAN_TABLE)}
                        disabled={remainingTimes[CallKeys.CLEAN_TABLE] > 0}
                      >
                        Изчистване на масата
                        {remainingTimes[CallKeys.CLEAN_TABLE] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.CLEAN_TABLE] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.CLEAN_TABLE]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.REFILL_NAPKINS] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.REFILL_NAPKINS)}
                        disabled={remainingTimes[CallKeys.REFILL_NAPKINS] > 0}
                      >
                        Попълване на салфетки
                        {remainingTimes[CallKeys.REFILL_NAPKINS] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.REFILL_NAPKINS] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.REFILL_NAPKINS]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.ADDITIONAL_CHAIR] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.ADDITIONAL_CHAIR)}
                        disabled={remainingTimes[CallKeys.ADDITIONAL_CHAIR] > 0}
                      >
                        Допълнителен стол
                        {remainingTimes[CallKeys.ADDITIONAL_CHAIR] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.ADDITIONAL_CHAIR] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.ADDITIONAL_CHAIR]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.CLEAN_SPILL] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.CLEAN_SPILL)}
                        disabled={remainingTimes[CallKeys.CLEAN_SPILL] > 0}
                      >
                        Почистване на разливка
                        {remainingTimes[CallKeys.CLEAN_SPILL] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.CLEAN_SPILL] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.CLEAN_SPILL]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.ADDITIONAL_CONDIMENTS] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.ADDITIONAL_CONDIMENTS)}
                        disabled={remainingTimes[CallKeys.ADDITIONAL_CONDIMENTS] > 0}
                      >
                        Допълнителни подправки
                        {remainingTimes[CallKeys.ADDITIONAL_CONDIMENTS] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.ADDITIONAL_CONDIMENTS] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.ADDITIONAL_CONDIMENTS]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.REQUEST_WAITER_HELP] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.REQUEST_WAITER_HELP)}
                        disabled={remainingTimes[CallKeys.REQUEST_WAITER_HELP] > 0}
                      >
                        Помощ от сервитьор
                        {remainingTimes[CallKeys.REQUEST_WAITER_HELP] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.REQUEST_WAITER_HELP] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.REQUEST_WAITER_HELP]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.CALL_MANAGER] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.CALL_MANAGER)}
                        disabled={remainingTimes[CallKeys.CALL_MANAGER] > 0}
                      >
                        Повикване на управител
                        {remainingTimes[CallKeys.CALL_MANAGER] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.CALL_MANAGER] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.CALL_MANAGER]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                    <div className="col-6 mb-3">
                      <button
                        type="button"
                        className={`call-option-btn ${remainingTimes[CallKeys.REPORT_ORDER_ISSUE] ? 'on-cooldown' : ''}`}
                        onClick={() => handleCall(CallKeys.REPORT_ORDER_ISSUE)}
                        disabled={remainingTimes[CallKeys.REPORT_ORDER_ISSUE] > 0}
                      >
                        Сигнал за проблем с поръчка
                        {remainingTimes[CallKeys.REPORT_ORDER_ISSUE] > 0 && (
                          <div className="cooldown-timer">
                            <div className="cooldown-progress" style={{ 
                              width: `${(remainingTimes[CallKeys.REPORT_ORDER_ISSUE] / COOLDOWN_TIME) * 100}%` 
                            }}></div>
                            <span>{remainingTimes[CallKeys.REPORT_ORDER_ISSUE]}с</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancel"
                data-bs-dismiss="modal"
              >
                Отказ
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {landingPageSettings.ANNOUNCEMENT_SETTINGS.SHOW_ANNOUNCEMENT ? (
        <div className="m-b10">
          <div className="swiper-btn-center-lr">
            <div className="swiper tag-group mt-4 recomand-swiper">
              <div className="swiper-wrapper">
                {objectData?.objectAnnounces.map((announce, index) => (
                  <div
                    className="swiper-slide"
                    key={index}
                    data-aos="fade-up"
                  >
                    <div
                      className="card add-banner"
                      style={{
                        backgroundImage: `url(${getEnv()}/uploads/${
                          announce.entry_image
                        })`,
                      }}
                    >
                      <div
                        className="overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.2)",
                          filter: "blur(3px)",
                        }}
                      ></div>{" "}
                      <div className="circle-1"></div>
                      <div className="circle-2"></div>
                      <div className="card-body">
                        <div
                          className="card-info"
                          style={{
                            textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                          }}
                        >
                          <span className="font-12 font-w500 text-white">
                            {announce.entry_headline}
                          </span>
                          <h5
                            data-text="Новина"
                            className="mb-2"
                            style={{ color: "cyan" }}
                          >
                            {announce.entry_thumbnail_text}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="title-bar mt-0">
        <Link to={PATH_LIST.CATEGORY_LIST}>
          <span className="title mb-0 font-18">Категории</span>
        </Link>
        <Link className="btn-link" to={PATH_LIST.CATEGORY_LIST}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z"
              fill="#7D8FAB"
            />
          </svg>
        </Link>
      </div>
      
      <div className="categories-box">
        <div className="swiper-btn-center-lr">
          <div className="swiper categorie-swiper">
            <div className="swiper-wrapper">
              {objectData.categories.map((category, index) => (
                <div
                  className="swiper-slide"
                  data-aos="fade-down"
                  key={index}
                >
                  <Link to={`/category/${category.entry_id}`}>
                    {" "}
                    <div
                      className="categore-box"
                      style={{
                        backgroundImage: `url(${getEnv()}/uploads/${
                          category.category_background_image
                        })`,
                      }}
                    >
                      {landingPageSettings.CATEGORY_SETTINGS
                        .SHOW_PRODUCT_ICONS ? (
                        <i className={category.category_mini_image}></i>
                      ) : (
                        ""
                      )}
                      <h6 className="font-14 text-white mb-2 text-center">
                        {category.category_name}
                      </h6>
                      <span className="text-white">
                        {category.itemCount}
                        {GeneratePrefix(category.itemCount)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="title-bar">
        {accentSettings.SHOW_ACCENT_TEXT && (
          <span
            className={`title mb-0 font-18 ${
              accentSettings.ACCENT_TEXT_STYLE === "bold"
                ? "accent-text-bold"
                : accentSettings.ACCENT_TEXT_STYLE === "italic"
                ? "accent-text-italic"
                : accentSettings.ACCENT_TEXT_STYLE === "highlight"
                ? "accent-text-highlight"
                : "accent-text-default"
            }`}
          >
            {accentSettings.ACCENT_TEXT_CONTENT}
          </span>
        )}
      </div>
      
      <div className="row g-3 mb-4 latest-products">
        {categoryItems.map((product, index) => (
          <div
            className="col-6 col-md-4"
            key={index}
            data-aos="zoom-out-right"
          >
            <div className="card-item modern-card">
              <div className="card-image-wrapper">
                <Link to={`/products/${product.item_id}`}>
                  {" "}
                  <img
                    src={`${getEnv()}/uploads/${
                      JSON.parse(product.item_images)[0]
                    }`}
                    alt={product.item_name}
                    className="card-image"
                  />
                </Link>
                {product.discount_percentage > 0 && (
                  <span className="discount-badge">
                    -{product.discount_percentage}%
                  </span>
                )}
              </div>
              <div className="card-content">
                <h6 className="product-title">
                  <Link to={`/products/${product.item_id}`}>
                    {product.item_name}{" "}
                  </Link>{" "}
                </h6>{" "}
                <div className="price-section">
                  {product.discount_percentage > 0 ? (
                    <>
                      <span className="price">
                        BGN{" "}
                        {(
                          product.item_price -
                          (product.discount_percentage *
                            product.item_price) /
                            100
                        ).toFixed(2)}
                      </span>
                      <span className="original-price">
                        BGN {Number(product.item_price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="price">
                      BGN {Number(product.item_price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .server-call-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          background: linear-gradient(135deg, #2c82c9, #1a4f7a);
          color: white;
          font-weight: 600;
          border: none;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .server-call-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          background: linear-gradient(135deg, #3498db, #2c82c9);
        }
        
        .server-call-btn i {
          margin-right: 10px;
          font-size: 20px;
        }
        
        .call-option-btn {
          position: relative;
          width: 100%;
          padding: 12px 10px;
          border-radius: 8px;
          background-color: #4caf50;
          color: white;
          font-weight: 500;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          overflow: hidden;
        }
        
        .call-option-btn:hover:not(:disabled) {
          background-color: #43a047;
          transform: translateY(-1px);
        }
        
        .call-option-btn:active:not(:disabled) {
          transform: translateY(1px);
        }
        
        .call-option-btn.on-cooldown {
          background-color: #78909c;
          cursor: not-allowed;
        }
        
        .cooldown-timer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background-color: rgba(0, 0, 0, 0.2);
        }
        
        .cooldown-progress {
          height: 100%;
          background-color: rgba(255, 255, 255, 0.5);
          transition: width 1s linear;
        }
        
        .cooldown-timer span {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 4px;
          padding: 2px 4px;
        }
        
        .btn-cancel {
          padding: 8px 16px;
          border-radius: 6px;
          background-color: #f44336;
          color: white;
          border: none;
          font-size: 14px;
          transition: background-color 0.2s ease;
        }
        
        .btn-cancel:hover {
          background-color: #d32f2f;
        }
        
        .modal-content {
          border-radius: 12px;
          overflow: hidden;
        }
        
        .modal-header {
          background-color: #f5f5f5;
          border-bottom: 1px solid #eeeeee;
        }
        
        .modal-footer {
          border-top: 1px solid #eeeeee;
        }
      `}</style>
    </div>
  
          </div>
        </div>
      </div>
    </>
  );
};

const HomeV2_FeaturedCategory = HomeContent;

export default HomeV2_FeaturedCategory;
