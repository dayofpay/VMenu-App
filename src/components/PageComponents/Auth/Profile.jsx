import { Link } from "react-router-dom";
import ShowAppMenu from "../../AppMenus/defaultMenu";
import withObjectData from "../../../HOC/withObjectInfo";
import { getEnv } from "../../../utils/appData";
import TranslateAPI from "../Plugins/TranslateAPI";


const Profile = ({objectData}) => {
    if(!objectData){
        return <LoadingAnimation/>;
    }
    return (
        <div class="page-wraper">
    

    

    <header class="header">
		<div class="main-bar">
			<div class="container">
				<div class="header-content">
					<div class="left-content">
						<Link to="/" class="back-btn">
							<svg height="512" viewBox="0 0 486.65 486.65" width="512"><path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z"></path><path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z"></path>
							</svg>
						</Link>
						<h5 class="title mb-0 text-nowrap">Профил</h5>
					</div>
					<div class="mid-content">
					</div>

				</div>
			</div>
		</div>
	</header>

    <div class="dark-overlay"></div>
	

    <div class="page-content bottom-content ">
        <div class="container profile-area">
            <div class="profile">	
				<div class="d-flex align-items-center mb-3">
					<div class="media media-70 me-3">
						<img src={getEnv() + "/uploads/" + objectData.objectInformation.object_image} alt="/"/>
					</div>
					<div class="about-profile">
						<h5 class="sub-title mb-0">Гост на {objectData.objectInformation.object_name}</h5>
						{/* <h6 class="sub-title fade-text mb-1 font-w500">user@v-menu.eu</h6>
						<h6 class="sub-title fade-text mb-0 font-w500">8854760544</h6> */}
						<h6 class="sub-title fade-text mb-0 font-w500">В момента се намирате на маса №{JSON.parse(localStorage.getItem('tableId'))}</h6>
					</div>
					{/* <a href="/edit-profile" class="edit-profile">
						<i class="fa-solid fa-pencil"></i>
					</a> */}
				</div>
				<div class="location-box">
					<i class="location fa-solid fa-location-dot"></i>
					<div class="flex-1">
						<h6 class="text-white font-w400 mb-0">{objectData.objectInformation.object_name}</h6>
						<h6 class="text-white font-w400 mb-0">{objectData.objectInformation.object_address}</h6>
					</div>
					<a href="javascript:void(0);" class="change-btn">Смяна на маса</a>
				</div>		
			</div>   
			<div class="profile-content border-0">
				<ul>
					<li>
					<div class="card">
                        <div class="card-header border-0 pb-0">
                            <h5 class="card-title">💬 Select Language</h5>
                        </div>
                        <div class="card-body">
						<TranslateAPI/>
                        </div>
                    </div>
					</li>
					<li>
						<Link to="/cart">
							<i class="fa-solid fa-bag-shopping"></i>	
							Моята количка
						</Link>
					</li>
					{/* <li>
						<a href="/orders">
							<i class="fa-solid fa-clock"></i>
							Моите поръчки
						</a>
					</li> */}
					{/*  */}
				</ul>
			</div>
        </div>
    </div>
    <ShowAppMenu/>
    

	

</div>
    )
}
const ProfilePage = withObjectData(Profile);

export default ProfilePage;