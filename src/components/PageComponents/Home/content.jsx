import { Link } from "react-router-dom";
import LoadingAnimation from "../../Animations/Loading";
import '../../Styles/happy-icons.min.css';
import '../../Styles/elegant-icons.min.css';
import '../../Styles/feather-icons.min.css';
import '../../Styles/foundation-icons.min.css';
import '../../Styles/open-iconic.min.css';
import '../../Styles/tabler-icons.min.css';
import GeneratePrefix from "../../../utils/categoryPrefix";
import { PATH_LIST } from "../../../utils/pathList";
const HomeContent = ({
		objectData
	}) => {
		if(!objectData.objectInformation) {
			return <LoadingAnimation/>
		}
return (
<>

	<div className="page-content">
		<div className="content-inner pt-0">
			<div className="container p-b30">

				<div className="search-box mb-4">
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
				</div>

				<div className="dashboard-area">

					<div className="m-b10">
						<div className="swiper-btn-center-lr">
							<div className="swiper tag-group mt-4 recomand-swiper">
								<div className="swiper-wrapper">
									{
									objectData?.objectAnnounces.map((announce, index) => (
										<div className="swiper-slide" key={index} data-aos="fade-up">
										<div className="card add-banner" style={{
											backgroundImage: `url(https://v-menu.eu/uploads/${announce.entry_image})`
										}}>
											<div className="overlay" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',backgroundColor:'rgba(0,0,0,0.2)',filter:blur('3px')}}></div> {/* Add this overlay */}
											<div className="circle-1"></div>
											<div className="circle-2"></div>
											<div className="card-body">
												<div className="card-info" style={{textShadow:'1px 1px 2px rgba(0,0,0,0.5)'}}>
													<span className="font-12 font-w500 text-white">{announce.entry_headline}</span>
													<h5 data-text="Новина" className="mb-2" style={{color:'cyan'}}>{announce.entry_thumbnail_text}</h5>
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
						<span className="title mb-0 font-18">Категории</span>
						<Link className="btn-link" to={PATH_LIST.CATEGORY_LIST}>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
								xmlns="http://www.w3.org/2000/svg">
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
                    <Link to={`/category/${category.entry_id}`}>
                        <div className="categore-box" style={{backgroundImage: `url(https://v-menu.eu/uploads/${category.category_background_image})`}}>
                            {/* <svg width="24" height="24" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.9488 7.87554C18.9488 5.85452 17.3047 4.21039 15.2837 4.21039C14.1548 4.21039 13.1438 4.72381 12.4709 5.52889C11.9729 4.93307 11.2896 4.4979 10.5105 4.31145V4.25301C10.5105 3.38351 11.2178 2.67615 12.0873 2.67615C12.5581 2.67615 12.9397 2.29458 12.9397 1.82379C12.9397 1.35299 12.5581 0.971428 12.0873 0.971428C10.2779 0.971428 8.80573 2.44358 8.80573 4.25301V4.31145C8.02662 4.4979 7.34324 4.93307 6.8453 5.52889C6.17241 4.72381 5.16139 4.21039 4.03252 4.21039C2.01149 4.21039 0.367371 5.85452 0.367371 7.87554C0.367371 9.80417 1.86499 11.3884 3.75816 11.5294C3.39291 12.0992 3.18016 12.7756 3.18016 13.5011C3.18016 15.4297 4.67778 17.0139 6.57095 17.1549C6.2057 17.7248 5.99294 18.4012 5.99294 19.1267C5.99294 21.1477 7.63707 22.7918 9.65809 22.7918C11.6791 22.7918 13.3232 21.1477 13.3232 19.1267C13.3232 18.4012 13.1105 17.7248 12.7452 17.1549C14.6384 17.0139 16.136 15.4297 16.136 13.5011C16.136 12.7756 15.9233 12.0992 15.558 11.5294C17.4512 11.3884 18.9488 9.80417 18.9488 7.87554ZM9.6521 5.91528C9.6541 5.91528 9.65609 5.91561 9.65809 5.91561C9.66009 5.91561 9.66209 5.91528 9.66408 5.91528C10.7424 5.91861 11.6185 6.79661 11.6185 7.87554C11.6185 8.95647 10.739 9.83597 9.65809 9.83597C8.57716 9.83597 7.69766 8.95647 7.69766 7.87554C7.69766 6.79661 8.57383 5.91861 9.6521 5.91528ZM4.03252 9.83597C2.95159 9.83597 2.07209 8.95647 2.07209 7.87554C2.07209 6.79461 2.95159 5.91511 4.03252 5.91511C5.11345 5.91511 5.99294 6.79461 5.99294 7.87554C5.99294 8.95647 5.11345 9.83597 4.03252 9.83597ZM6.8453 15.4615C5.76437 15.4615 4.88488 14.582 4.88488 13.5011C4.88488 12.4202 5.76437 11.5407 6.8453 11.5407C7.92624 11.5407 8.80573 12.4202 8.80573 13.5011C8.80573 14.582 7.92624 15.4615 6.8453 15.4615ZM9.65809 21.0871C8.57716 21.0871 7.69766 20.2076 7.69766 19.1267C7.69766 18.0458 8.57716 17.1663 9.65809 17.1663C10.739 17.1663 11.6185 18.0458 11.6185 19.1267C11.6185 20.2076 10.739 21.0871 9.65809 21.0871ZM12.4709 15.4615C11.3899 15.4615 10.5105 14.582 10.5105 13.5011C10.5105 12.4202 11.3899 11.5407 12.4709 11.5407C13.5518 11.5407 14.4313 12.4202 14.4313 13.5011C14.4313 14.582 13.5518 15.4615 12.4709 15.4615ZM15.2837 9.83597C14.2027 9.83597 13.3232 8.95647 13.3232 7.87554C13.3232 6.79461 14.2027 5.91511 15.2837 5.91511C16.3646 5.91511 17.2441 6.79461 17.2441 7.87554C17.2441 8.95647 16.3646 9.83597 15.2837 9.83597Z"
                                    fill="white" />
                            </svg> */}
                            <i className={category.category_mini_image}></i>
                            <h6 className="font-14 text-white mb-2 text-center">{category.category_name}</h6>
                            <span className="text-white">{category.itemCount} {GeneratePrefix(category.itemCount)}</span>
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
					<div className="row g-3 mb-3">
						{objectData.products.map((product,index) => (
						<div className="col-6" key={index} data-aos="zoom-out-right">
							<div className="card-item style-1">
								<div className="dz-media">
									<img src={`https://v-menu.eu/uploads/${JSON.parse(product.item_images)[0]}`}
										alt={product.item_name} />
									<a href="#" className="r-btn">
										<div className="like-button"><i className="fa-regular fa-heart"></i></div>
									</a>
									{product.has_discount ? ( <div className="label">-{product.discount_percentage}%
									</div>) : (null)}
								</div>
								<div className="dz-content">
									<h6 className="title mb-3"><Link to={`/products/${product.item_id}`}>{product.item_name}</Link></h6>
									<div className="dz-meta">
										<ul>
											{product.has_discount ? (
											<li className="price text-accent">BGN {(product.item_price -
												(product.discount_percentage *
												product.item_price) / 100).toFixed(2)} <br /><span
													className="badge w-100 light badge-light">Намален от {Number(product.item_price).toFixed(2)} ЛВ</span></li>
											) : ( <li className="price text-accent">BGN {Number(product.item_price).toFixed(2)}</li>)}
										</ul>
									</div>
								</div>
							</div>
						</div>
						))}

					</div>

				</div>


				

			</div>
		</div>

	</div>
</>
)
}

const HomeV2 = HomeContent

export default HomeV2;