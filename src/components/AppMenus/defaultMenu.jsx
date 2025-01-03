import { Link } from "react-router-dom"
import { PATH_LIST } from "../../utils/pathList"
import * as storage from '../../utils/memory';
const ShowAppMenu = () => {
	const objectData = storage.getItem('objectData');

	
return (
<>

	<div className="menubar-area style-2 footer-fixed border-top rounded-0">
		<div className="toolbar-inner menubar-nav">
			<Link to="/" className="nav-link active">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.14373 20.7821V17.7152C9.14372 16.9381 9.77567 16.3067 10.5584 16.3018H13.4326C14.2189 16.3018 14.8563 16.9346 14.8563 17.7152V20.7732C14.8562 21.4473 15.404 21.9951 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0007C21.1356 20.3586 21.5 19.4868 21.5 18.5775V9.86585C21.5 9.13139 21.1721 8.43471 20.6046 7.9635L13.943 2.67427C12.7785 1.74912 11.1154 1.77901 9.98539 2.74538L3.46701 7.9635C2.87274 8.42082 2.51755 9.11956 2.5 9.86585V18.5686C2.5 20.4637 4.04738 22 5.95617 22H7.87229C8.19917 22.0023 8.51349 21.8751 8.74547 21.6464C8.97746 21.4178 9.10793 21.1067 9.10792 20.7821H9.14373Z"
					fill="#130F26"></path>
			</svg>
			</Link>
			<Link to="/categories" className="nav-link">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid"
				viewBox="0 0 16 16">
				<path
					d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
			</svg>
			</Link>
			{objectData.license.data.plan_id !== 1 && (			<Link to={PATH_LIST.APP_CART} className="nav-link">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 456.569 456.569">
				<path
					d="M345.805 339.465c-29.323-.028-53.117 23.72-53.146 53.043s23.72 53.117 53.043 53.146 53.117-23.72 53.146-53.043v-.051c-.028-29.292-23.752-53.038-53.043-53.095zm94.171-254.244a20.44 20.44 0 0 0-3.855-.373H112.845l-5.12-34.253c-3.19-22.748-22.648-39.673-45.619-39.68H20.48C9.169 10.915 0 20.084 0 31.395s9.169 20.48 20.48 20.48h41.677a5.12 5.12 0 0 1 5.12 4.506l31.539 216.166c4.324 27.468 27.951 47.732 55.757 47.821h213.043c26.771.035 49.866-18.78 55.245-45.005l33.331-166.144c2.149-11.105-5.111-21.849-16.216-23.998zM215.737 390.286c-1.247-28.463-24.737-50.869-53.228-50.77h0c-29.299 1.184-52.091 25.896-50.907 55.195 1.136 28.113 24.005 50.458 52.136 50.943h1.28c29.295-1.284 52.002-26.073 50.719-55.368z" />
			</svg>
			</Link>)}
			<Link to="/announces" className="nav-link">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
					className="bi bi-megaphone" viewBox="0 0 16 16">
					<path
						d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49a68.14 68.14 0 0 0-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 74.663 74.663 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199V2.5zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0zm-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233c.18.01.359.022.537.036 2.568.189 5.093.744 7.463 1.993V3.85zm-9 6.215v-4.13a95.09 95.09 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A60.49 60.49 0 0 1 4 10.065zm-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68.019 68.019 0 0 0-1.722-.082z" />
				</svg>
			</Link>

		</div>
	</div>
</>
)
}

export default ShowAppMenu