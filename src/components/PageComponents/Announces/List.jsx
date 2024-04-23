import { Link } from 'react-router-dom';
import withobjectData from '../../../HOC/withObjectInfo';
import LoadingAnimation from '../../Animations/Loading';
import { TimeBetween } from '../../../utils/DateUtils';

const ShowAnnounces = ({objectData}) => {

    if(!objectData){
        return <LoadingAnimation/>
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
							<svg height="512" viewBox="0 0 486.65 486.65" width="512"><path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z"></path><path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z"></path>
							</svg>
						</Link>
						<h5 className="title mb-0 text-nowrap">Новини</h5>
					</div>
					<div className="mid-content">
					</div>
					<div className="right-content">
					</div>
				</div>
			</div>
		</div>
	</header>

<div className="content-body">
<div className="container">
    <div className="search-box">
        <div className="mb-3 input-group input-radius">
            <span className="input-group-text">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.9395 1.9313C5.98074 1.9313 1.94141 5.97063 1.94141 10.9294C1.94141 15.8881 5.98074 19.9353 10.9395 19.9353C13.0575 19.9353 15.0054 19.193 16.5449 17.9606L20.293 21.7067C20.4821 21.888 20.7347 21.988 20.9967 21.9854C21.2587 21.9827 21.5093 21.8775 21.6947 21.6924C21.8801 21.5073 21.9856 21.2569 21.9886 20.9949C21.9917 20.7329 21.892 20.4802 21.7109 20.2908L17.9629 16.5427C19.1963 15.0008 19.9395 13.0498 19.9395 10.9294C19.9395 5.97063 15.8982 1.9313 10.9395 1.9313ZM10.9395 3.93134C14.8173 3.93134 17.9375 7.05153 17.9375 10.9294C17.9375 14.8072 14.8173 17.9352 10.9395 17.9352C7.06162 17.9352 3.94141 14.8072 3.94141 10.9294C3.94141 7.05153 7.06162 3.93134 10.9395 3.93134Z" fill="#7D8FAB"></path>
                </svg>
            </span>
            <input type="search" placeholder="Search" className="form-control main-in ps-0 bs-0"/>
        </div>
    </div>
    <div className="blog-area">
        <div className="media-box">
            <img src="assets/images/food/1.jpg" alt="/"/>
            <div className="badge-bookmark"><i className="fa-solid fa-star"></i></div>	
        </div>
        {/* <div>
            <h4 className="mb-0">The best food Of this month.</h4>
            <ul className="timeline">
                <li className="d-flex align-items-center">
                    <span className="text-soft">2 hours ago</span>
                    <div className="saprete-circle ms-2"></div>
                </li>
                <li>
                    <span className="text-soft">1 min read</span>
                </li>
                <li>
                    <span className="text-soft">By Emile</span>
                </li>
            </ul>
        </div> */}
    </div>
    <div className="blog-area">
        <ul className="blog-list">
            {objectData?.objectAnnounces.map((announce,index) => (
            <li className="list pb-3 border-bottom mb-3" key={index}>
            <a href="blog-detail.html">
                <div className="media media-80 me-2">
                    <img className="rounded" src={`http://localhost:3300/uploads/${announce?.entry_image}`} alt="/"/>
                </div>
                <div className="blog-content">
                    <h6 className="mb-0">{announce?.entry_headline}.</h6>
                    <p className="mb-0">{announce?.entry_thumbnail_text}</p>		
                    <ul className="timeline">
                        <li className="d-flex align-items-center">
                            <span className="text-soft">{TimeBetween(announce?.['createdAt'],new Date())}</span>
                            <div className="saprete-circle ms-1"></div>
                        </li>
                        <li className="d-flex align-items-center">
                            <span className="text-soft">1 min read</span>
                            <div className="saprete-circle ms-1"></div>
                        </li>
                        <li>
                            <span className="text-soft">By Emile</span>
                        </li>
                    </ul>
                </div>
            </a>
        </li>
            ))}
        </ul>
    </div>
</div>
</div>
        </>
    )
}


const Announces = withobjectData(ShowAnnounces);

export default Announces;