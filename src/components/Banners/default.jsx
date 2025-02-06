import { Link } from "react-router-dom";
import LoadingAnimation from "../Animations/Loading";
import { PATH_LIST } from "../../utils/pathList";
import TranslateMenu from "../PageComponents/Plugins/TranslateAPI";

function ShowBanner({objectData}) {
	const timeType = new Date().getHours();
	const getTime = (time) => {
		if(time >= 0 && time < 12){
			return 'Добро Утро,';
		}
		else if(time >= 12 && time < 18){
			return 'Добър Ден,';
		}
		else{
			return 'Добър Вечер,';
		}
	}
	const time = getTime(timeType);

	if(!objectData){
		return <LoadingAnimation/>
	}
    return (

		<div className="author-notification">
			
			<div className="container inner-wrapper">
				<div className="dz-info">
					<span className="text-dark d-block">{time}</span>
					<h2 className="name mb-0 title"> Гост {/*Гост на {objectData.objectInformation.object_name}*/} 👋</h2>
				</div>
				<Link to={PATH_LIST.ANNOUNCE_LIST} className="notify-cart">
					<span className="font-18 font-w600 text-dark">{objectData.objectAnnounces.length}</span>
					<div className="badge">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.8574 17.4858C20.0734 14.5109 19 13.212 19 9.99997C18.9982 8.31756 18.3909 6.692 17.2892 5.42046C16.1876 4.14893 14.665 3.31636 13 3.07497V2.99997C13 2.73475 12.8947 2.4804 12.7071 2.29286C12.5196 2.10533 12.2653 1.99997 12 1.99997C11.7348 1.99997 11.4805 2.10533 11.2929 2.29286C11.1054 2.4804 11 2.73475 11 2.99997V3.07917C9.32471 3.39641 7.81116 4.28459 6.71715 5.59244C5.62313 6.9003 5.01632 8.54695 5.00004 10.252C5.00004 13.212 3.73804 14.826 2.14264 17.4859C2.05169 17.6376 2.00263 17.8107 2.00044 17.9876C1.99826 18.1645 2.04303 18.3388 2.1302 18.4927C2.21737 18.6467 2.3438 18.7747 2.49661 18.8638C2.64943 18.9529 2.82314 18.9999 3.00004 19H21C21.1769 18.9999 21.3507 18.9529 21.5035 18.8638C21.6563 18.7747 21.7828 18.6466 21.8699 18.4927C21.9571 18.3388 22.0019 18.1644 21.9997 17.9875C21.9975 17.8106 21.9484 17.6375 21.8574 17.4858Z"
								fill="white" />
							<path
								d="M14 20H10C9.73478 20 9.48043 20.1054 9.29289 20.2929C9.10536 20.4804 9 20.7348 9 21C9 21.2652 9.10536 21.5196 9.29289 21.7071C9.48043 21.8947 9.73478 22 10 22H14C14.2652 22 14.5196 21.8947 14.7071 21.7071C14.8946 21.5196 15 21.2652 15 21C15 20.7348 14.8946 20.4804 14.7071 20.2929C14.5196 20.1054 14.2652 20 14 20Z"
								fill="white" />
						</svg>
					</div>
				</Link>

				</div>
				</div>
    )
}

const Banner = ShowBanner;

export default Banner;