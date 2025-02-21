import { Link, useParams } from "react-router-dom";
import withObjectData from "../../../../../HOC/withObjectInfo";
import { useEffect, useState } from "react";
import { getProductsByCategory } from "../../../../../services/productServices"
import { ProductHasDiscount } from "../../../../../utils/DateUtils";
import LoadingAnimation from "../../../../Animations/Loading";
import '../../../../Animations/Packages/slideInFromLeft.css';
import '../../../../Styles/CategoryDetails.css';
const ShowCategoryData = ({
    objectData
}) => {
    const {id} = useParams();
    const [categoryData,setCategoryData] = useState([]);
	const [categoryName,setCategoryName] = useState('');
    useEffect(() => {
        const getData = async() => {
            const productData = await getProductsByCategory(id);

            setCategoryData(productData.categoryData[0]);

			setCategoryName(productData.categoryData[1].categoryName);
        }

        getData();
    },[objectData,id])

    if(!objectData.objectInformation || !categoryData || !categoryName) {
        return <LoadingAnimation/>
    }
	console.log(categoryData);
    return (
    <>
 

	

    <header className="header">
		<div className="main-bar">
			<div className="container">
				<div className="header-content">
					<div className="left-content">
						<Link to="/" className="back-btn">
							<svg height="512" viewBox="0 0 486.65 486.65" width="512"><path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z"/><path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z"/>
							</svg>
						</Link>
						<h5 className="title mb-0 text-nowrap">{categoryName}</h5>
					</div>
					<div className="mid-content">
					</div>
				</div>
			</div>
		</div>
	</header>
    <div className="page-content">
		<div className="container"> 
			<div className="dz-list style-3">						
				<ul>
					{categoryData.map((product,index) => (
                        <li key={index} style={{animation: '1s ease-out 0s 1 slideInFromLeft'}}>
						<div className="item-content">
							<div className="item-media media media-95"><img src={`https://v-menu.eu/uploads/${JSON.parse(product.item_images)[0]}`} alt="logo"/>
								<a href="#" className="item-bookmark icon-2">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M16.785 2.04751C15.9489 2.04694 15.1209 2.21163 14.3486 2.53212C13.5764 2.85261 12.8751 3.32258 12.285 3.91501L12 4.18501L11.73 3.91501C11.1492 3.2681 10.4424 2.74652 9.65306 2.3822C8.86367 2.01787 8.00824 1.81847 7.13912 1.79618C6.27 1.7739 5.40547 1.9292 4.59845 2.25259C3.79143 2.57599 3.05889 3.06066 2.44566 3.67695C1.83243 4.29325 1.35142 5.02819 1.03206 5.83682C0.712696 6.64544 0.561704 7.51073 0.588323 8.37973C0.614942 9.24873 0.818613 10.1032 1.18687 10.8907C1.55513 11.6783 2.08022 12.3824 2.73002 12.96L12 22.2675L21.3075 12.96C22.2015 12.0677 22.8109 10.9304 23.0589 9.6919C23.3068 8.45338 23.1822 7.16915 22.7006 6.00144C22.2191 4.83373 21.4023 3.83492 20.3534 3.13118C19.3045 2.42744 18.0706 2.05034 16.8075 2.04751H16.785Z" fill="white"/>
									</svg>
								</a>    
							</div>
							<div className="item-inner">
								<div className="item-title-row">
									<h5 className="item-title sub-title">
                                        <Link to={`/products/${product.item_id}`}>{product?.item_name}</Link>
                                    </h5>
									<div className="d-flex align-items-center">
                                    {ProductHasDiscount(product.discount_expires) ? (
                                        <>

										<h6 className="me-2 mb-0">BGN {(product.item_price -
												(product.discount_percentage *
												product.item_price) / 100).toFixed(2)}</h6>
										<del className="off-text"><h6 className="mb-0">BGN {Number(product.item_price).toFixed(2)}</h6></del>
                                        </>
                                    ) : (<>
										<h6 className="me-2 mb-0">BGN {Number(product?.item_price).toFixed(2)}</h6>
                                    </>)}
									</div>    
								</div>
								<div className="item-footer">
                                    {ProductHasDiscount(product.discount_expires) ? (
                                        <>
									<div className="d-flex align-items-center">
										<svg className="me-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_361_453)">
											<path d="M14.6666 0.000106812H9.12485C8.75825 0.000106812 8.24587 0.212488 7.98685 0.471314L0.389089 8.06903C-0.129696 8.58723 -0.129696 9.43684 0.389089 9.95441L6.04624 15.6114C6.56385 16.1296 7.41263 16.1296 7.93103 15.6108L15.5288 8.01423C15.7876 7.75544 16 7.24224 16 6.87642V1.3335C16 0.600298 15.3998 0.000106812 14.6666 0.000106812ZM11.9998 5.33347C11.2634 5.33347 10.6664 4.73585 10.6664 4.00008C10.6664 3.26309 11.2634 2.66669 11.9998 2.66669C12.7362 2.66669 13.3334 3.26309 13.3334 4.00008C13.3334 4.73585 12.7362 5.33347 11.9998 5.33347Z" fill="#C29C1D"/>
											</g>
											<defs>
											<clipPath >
											<rect width="16" height="16" fill="white"/>
											</clipPath>
											</defs>
										</svg>
										<h6 className="font-12 text-accent mb-0 font-w400">В момента на лимитирана -{product.discount_percentage}% отстъпка !</h6>
									</div>
                                        </>
                                    ) : (									<div className="d-flex align-items-center" style={{visibility:'hidden'}}>
                                    <svg className="me-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_361_453)">
                                        <path d="M14.6666 0.000106812H9.12485C8.75825 0.000106812 8.24587 0.212488 7.98685 0.471314L0.389089 8.06903C-0.129696 8.58723 -0.129696 9.43684 0.389089 9.95441L6.04624 15.6114C6.56385 16.1296 7.41263 16.1296 7.93103 15.6108L15.5288 8.01423C15.7876 7.75544 16 7.24224 16 6.87642V1.3335C16 0.600298 15.3998 0.000106812 14.6666 0.000106812ZM11.9998 5.33347C11.2634 5.33347 10.6664 4.73585 10.6664 4.00008C10.6664 3.26309 11.2634 2.66669 11.9998 2.66669C12.7362 2.66669 13.3334 3.26309 13.3334 4.00008C13.3334 4.73585 12.7362 5.33347 11.9998 5.33347Z" fill="#C29C1D"/>
                                        </g>
                                        <defs>
                                        <clipPath >
                                        <rect width="16" height="16" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                    <h6 className="font-12 text-accent mb-0 font-w400">Няма отстъпка ... vmenu.app</h6>
                                </div>)}

								</div>
							</div>
						</div>
					</li>
                    ))}
					
					
										
				</ul>    
			</div>
		</div>
	</div>
    </>
    )
}


const CategoryDetailsList = withObjectData(ShowCategoryData);

export default CategoryDetailsList;
