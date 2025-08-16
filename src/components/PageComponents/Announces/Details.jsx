import { useEffect, useState } from "react";
import withObjectData from "../../../HOC/withObjectInfo"
import LoadingAnimation from "../../Animations/Loading";
import { getAnnounceData } from "../../../services/announceServices";
import { Link, useParams } from "react-router-dom";
import { TimeBetween } from "../../../utils/DateUtils";
import ProductDescription from "../Products/ProductDescription";
import { getEnv } from "../../../utils/appData";
import '../../Styles/Tables.css';
import { do_action } from "../../../services/userServices";
import ShowAppMenu from "../../AppMenus/defaultMenu";
import { getMenuLanguage } from "../../../services/appServices";
const ShowDetails = ({objectData}) => {

    if(!objectData){
        return <LoadingAnimation/>;
    }
    const [announceData,setAnnounceData] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        const getAnnounceInfo = async () => {
            getAnnounceData(id).then(response => {
                setAnnounceData(response);
            })
        }

		do_action("view_announce", {announce_id: id,announce_name: announceData.announce_name});
        getAnnounceInfo();
    },[id]);

    if(!announceData){
        return <LoadingAnimation/>;
    }
    console.log(announceData);
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
						<h5 className="title mb-0 text-nowrap">{announceData.entry_headline}</h5>
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
			<div className="blog-detail">
				<div className="media-box mb-3">
					<img src={`${getEnv()}/uploads/${announceData.entry_image}`} alt="/"/>
					<div className="media-content">
						<h2>{announceData.entry_headline}</h2>
						<div className="d-flex align-items-center">
							<div className="media media-40 me-2 rounded-circle border-rounded">
								<img src="/assets/images/avatar/6.jpg" alt="/"/>
							</div>
							<div className="detail-text">
								<h6 className="mb-0">{getMenuLanguage().News.Article.Upload_By} {announceData.announced_by?.['first_name']}</h6>
								<ul className="timeline">
									<li className="d-flex align-items-center">
										<span className="text-soft">{TimeBetween(announceData.createdAt,new Date())}</span>
										<div className="saprete-circle ms-2"></div>
									</li>
									<li>
										<span className="text-soft">{getMenuLanguage().News.Article.Last_Edit} {announceData.updatedAt}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="content-area mt-0">
					<h3>{announceData.entry_headline}</h3>
                    <ProductDescription description={announceData.entry_text}/>
				</div>
			</div>
		</div>
                  {objectData.MODULES.OBJECT_INFO.COMPONENT_MANAGEMENT.FOOTER.PAGE_ANNOUNCEMENTS && <ShowAppMenu />}
	</div>
        </>
    )
}


const AnnounceDetails = withObjectData(ShowDetails);

export default AnnounceDetails;