import { Link } from "react-router-dom";
import LoadingAnimation from "../../../Animations/Loading";
import '../../../Styles/happy-icons.min.css';

import '../../../Styles/elegant-icons.min.css';
import '../../../Styles/feather-icons.min.css';
import '../../../Styles/foundation-icons.min.css';
import '../../../Styles/open-iconic.min.css';
import '../../../Styles/tabler-icons.min.css';
import '../../../Styles/LatestProducts.css'
import GeneratePrefix from "../../../utils/../../utils/categoryPrefix";
import { PATH_LIST } from "../../../../utils/pathList";
import { getEnv } from "../../../../utils/appData";
import { useState } from "react";
import { CallKeys } from "../../../../keys/formKeys";
import { createCall, do_action } from "../../../../services/userServices";
import { hasAddon } from "../../../../services/objectServices";
import PERK_LIST from "../../../../utils/perkAddons";
import { useRef,useEffect } from "react";
const HomeContent = ({
objectData
}) => {
if(!objectData.objectInformation) {
<LoadingAnimation />
}
const [callMessage,setCallMessage] = useState('');

const landingPageSettings = objectData.MODULES.OBJECT_INFO.LANDING_PAGE_SETTINGS;
const [activeKey, setActiveKey] = useState('all');
  const categories = objectData.categories;
  const products = objectData.products;
  const sectionRefs = useRef([]);

  const handleCall = (action) => {
    createCall({ call_reason: action }).then((result) => {
      do_action("call_waiter", { call_reason: action });

      !result.hasError ? setCallMessage(result.msg) : setCallMessage(result.msg);
    });
  };

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    const section = document.getElementById(selectedKey);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveKey(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);
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
					<button type="button" className="btn w-100 btn-primary mb-2" data-bs-toggle="modal"
						data-bs-target="#callModal">Повикване на сервитьор</button>
					) : (null)}
					<div className="modal fade" id="callModal" style={{display: 'none'}}>
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
										{callMessage && <div className="alert alert-success">{callMessage}</div>}
										<div className="row">
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.CHANGE_ASH_TRAY)}>
													Смяна на пепелник
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.REQUEST_BILL)}>
													Поискване на сметка
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.CHANGE_CUTLERY)}>
													Смяна на прибори
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.REFILL_WATER)}>
													Попълване на вода
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.CLEAN_TABLE)}>
													Изчистване на масата
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.REFILL_NAPKINS)}>
													Попълване на салфетки
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.ADDITIONAL_CHAIR)}>
													Допълнителен стол
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.CLEAN_SPILL)}>
													Почистване на разливка
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.ADDITIONAL_CONDIMENTS)}>
													Допълнителни подправки
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.REQUEST_WAITER_HELP)}>
													Помощ от сервитьор
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.CALL_MANAGER)}>
													Повикване на управител
												</button>
											</div>
											<div className="col-6 mb-3">
												<button type="button" className="btn btn-success w-100" onClick={()=>
													handleCall(CallKeys.REPORT_ORDER_ISSUE)}>
													Сигнал за проблем с поръчка
												</button>
											</div>

										</div>


									</div>
								</form>
								<div className="modal-footer">
									<button type="button" className="btn btn-sm btn-danger light"
										data-bs-dismiss="modal">Отказ</button>
								</div>
							</div>
						</div>
					</div>
					<div className="m-b10">
						<div className="swiper-btn-center-lr">
							<div className="swiper tag-group mt-4 recomand-swiper">
								<div className="swiper-wrapper">
									{
									objectData?.objectAnnounces.map((announce, index) => (
									<div className="swiper-slide" key={index} data-aos="fade-up">
										<div className="card add-banner" style={{
											backgroundImage: `url(${getEnv()}/uploads/${announce.entry_image})`
										}}>
											<div className="overlay"
												style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.2)',filter:blur('3px')}}>
											</div>
											<div className="circle-1"></div>
											<div className="circle-2"></div>
											<div className="card-body">
												<div className="card-info"
													style={{textShadow:'1px 1px 2px rgba(0,0,0,0.5)'}}>
													<span
														className="font-12 font-w500 text-white">{announce.entry_headline}</span>
													<h5 data-text="Новина" className="mb-2" style={{color:'cyan'}}>
														{announce.entry_thumbnail_text}</h5>
												</div>
											</div>
										</div>
									</div>

									))
									}
								</div>
							</div>
						</div>
					</div>

					<div className="title-bar mt-0">
						<Link to={PATH_LIST.CATEGORY_LIST}><span className="title mb-0 font-18">Категории</span></Link>
						<Link className="btn-link" to={PATH_LIST.CATEGORY_LIST}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z"
								fill="#7D8FAB" />
						</svg>
						</Link>
					</div>
					<div className="categories-box">
						<div className="swiper-btn-center-lr">
							<div className="swiper categorie-swiper">
								<div className="swiper-wrapper">
									{objectData.categories.map((category, index) => (
									<div className="swiper-slide" data-aos="fade-down" key={index}>
										<Link to={`/category/${category.entry_id}`}> <div className="categore-box"
											style={{backgroundImage: `url(${getEnv()}/uploads/${category.category_background_image})`}}>
										{landingPageSettings.CATEGORY_SETTINGS.SHOW_PRODUCT_ICONS ? <i
											className={category.category_mini_image}></i> : ''}
										<h6 className="font-14 text-white mb-2 text-center">{category.category_name}
										</h6>
										<span className="text-white">{category.itemCount}
											{GeneratePrefix(category.itemCount,objectData?.objectInformation?.menu_language)}</span>
									</div>
									</Link>
								</div>
								))}
							</div>
						</div>
					</div>

				</div>

				<div className="title-bar">
					<span className="title mb-0 font-18">Последни продукти</span>
				</div>
				<div className="row g-3 mb-4 latest-products">
				<div className="content-inner pt-0">
          <div className="container p-b30">

            <div id="all" ref={el => sectionRefs.current[0] = el}>
              <div className="title-bar">
                <span className="title mb-0 font-18">Всички продукти</span>
              </div>
              <div className="row g-3 mb-4 latest-products">
                {products.map((product, index) => (
                  <div className="col-6 col-md-4" key={index} data-aos="zoom-out-right">
                    <div className="card-item modern-card">
                      <div className="card-image-wrapper">
                        <Link to={`/products/${product.item_id}`}>
                          <img
                            src={`${getEnv()}/uploads/${JSON.parse(product.item_images)[0]}`}
                            alt={product.item_name}
                            className="card-image"
                          />
                        </Link>
                        {product.has_discount && (
                          <span className="discount-badge">-{product.discount_percentage}%</span>
                        )}
                      </div>
                      <div className="card-content">
                        <h6 className="product-title">
                          <Link to={`/products/${product.item_id}`}>{product.item_name}</Link>
                        </h6>
                        <div className="price-section">
                          {product.has_discount ? (
                            <>
                              <span className="price">
                                {product.item_currency}{" "}
                                {(
                                  product.item_price -
                                  (product.discount_percentage * product.item_price) / 100
                                ).toFixed(2)}
                              </span>
                              <span className="original-price">
                                {product.item_currency} {Number(product.item_price).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="price">{product.item_currency} {Number(product.item_price).toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Sections */}
            {categories.map((category, index) => (
              <div id={category.category_name} key={index} ref={el => sectionRefs.current[index + 1] = el}>
                <div className="title-bar">
                  <span className="title mb-0 font-18">{category.category_name}</span>
                </div>
                <div className="row g-3 mb-4 latest-products">
                  {products.filter(product => product.product_categories.some(cat => cat.category_name === category.category_name)).map((product, index) => (
                    <div className="col-6 col-md-4" key={index} data-aos="zoom-out-right">
                      <div className="card-item modern-card">
                        <div className="card-image-wrapper">
                          <Link to={`/products/${product.item_id}`}>
                            <img
                              src={`${getEnv()}/uploads/${JSON.parse(product.item_images)[0]}`}
                              alt={product.item_name}
                              className="card-image"
                            />
                          </Link>
                          {product.has_discount && (
                            <span className="discount-badge">-{product.discount_percentage}%</span>
                          )}
                        </div>
                        <div className="card-content">
                          <h6 className="product-title">
                            <Link to={`/products/${product.item_id}`}>{product.item_name}</Link>
                          </h6>
                          <div className="price-section">
                            {product.has_discount ? (
                              <>
                                <span className="price">
                                  {product.item_currency}{" "}
                                  {(
                                    product.item_price -
                                    (product.discount_percentage * product.item_price) / 100
                                  ).toFixed(2)}
                                </span>
                                <span className="original-price">
                                  {product.item_currency} {Number(product.item_price).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="price">{product.item_currency} {Number(product.item_price).toFixed(2)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
			</div>



		</div>




	</div>
	</div>

	</div>
</>
)
}

const HomeV2_SCROLLSPY = HomeContent

export default HomeV2_SCROLLSPY;