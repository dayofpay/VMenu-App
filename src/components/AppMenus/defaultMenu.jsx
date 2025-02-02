import { Link, NavLink } from "react-router-dom"
import * as storage from '../../utils/memory';
import { useEffect, useState } from "react";
import { hasAddon } from "../../services/objectServices";
import PERK_LIST from "../../utils/perkAddons";
const ShowAppMenu = () => {
const objectData = storage.getItem('objectData');

const [hasCartPerk,setCartPerk] = useState(false);

useEffect(() => {
		if(hasAddon(PERK_LIST.CART)){
			setCartPerk(true);
		}
},[objectData]);

return (
<>

	<div className="menubar-area style-1 footer-fixed border-top rounded-0">
		<div className="toolbar-inner menubar-nav">

			<NavLink to="/" className="nav-link " acitveClassName="active">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
						fill="#130F26"></path>
				</svg>
			</NavLink>
			<NavLink to="/categories" className="nav-link " acitveClassName="active">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
					className="bi bi-grid" viewBox="0 0 16 16">
					<path
						d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
				</svg>
			</NavLink>
			{hasAddon(PERK_LIST.CART) && <>			<Link to="/cart" className="nav-link item-active">
			<div className="circle">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M18.1776 17.8443C16.6362 17.8428 15.3855 19.0911 15.3839 20.6325C15.3824 22.1739 16.6308 23.4247 18.1722 23.4262C19.7136 23.4277 20.9643 22.1793 20.9659 20.6379V20.6353C20.9644 19.0955 19.7173 17.8473 18.1776 17.8443Z"
						fill="white"></path>
					<path
						d="M23.1278 4.4797C23.061 4.46677 22.9932 4.46019 22.9251 4.46009H5.93181L5.66267 2.65955C5.49499 1.46378 4.47216 0.574098 3.26466 0.57373H1.07655C0.481978 0.57373 0 1.05571 0 1.65028C0 2.24485 0.481978 2.72683 1.07655 2.72683H3.26734C3.40423 2.72583 3.52008 2.82776 3.53648 2.96369L5.19436 14.3267C5.42166 15.7705 6.66363 16.8357 8.12528 16.8404H19.3241C20.7313 16.8423 21.9454 15.8532 22.2281 14.4747L23.9802 5.74117C24.0931 5.15743 23.7115 4.59266 23.1278 4.4797Z"
						fill="white"></path>
					<path
						d="M11.3405 20.5157C11.2749 19.0196 10.0401 17.8418 8.54246 17.847C7.00233 17.9092 5.80425 19.2082 5.86648 20.7483C5.9262 22.2261 7.12833 23.4007 8.60707 23.4262H8.67435C10.2143 23.3587 11.4079 22.0557 11.3405 20.5157Z"
						fill="white"></path>
				</svg>
			</div>
			</Link></>}
			<NavLink to="/announces" className="nav-link " acitveClassName="active">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
					className="bi bi-megaphone" viewBox="0 0 16 16">
					<path
						d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z" />
				</svg>
			</NavLink>
			<NavLink to="/profile" className="nav-link " acitveClassName="active">
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="30" height="30" viewBox="0 0 24 24"
					>
					<path
						d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z">
					</path>
				</svg>
			</NavLink>
		</div>
	</div>
</>
)
}

export default ShowAppMenu