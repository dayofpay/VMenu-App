import { useState } from "react"
import { Link } from "react-router-dom"
export const QRError = () => {
    const [memoryReset,isMemoryReset] = useState(false);

    const resetMemory = () => {
        console.log('resetting memory');
        localStorage.clear();
        isMemoryReset(true);
    }

    const setDefaultObject = () => {
        console.log('setting default object');
        localStorage.setItem('restaurantId',2);
        localStorage.setItem('tableId',1);
    }
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
						<h5 className="title mb-0 text-nowrap">Грешка</h5>
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
			<div className="error-page">
				<div className="icon-bx">
					<svg height="120" viewBox="0 -26 511.82388 511" width="120" xmlns="http://www.w3.org/2000/svg"><path d="m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0" fill="#f0c419"></path><path d="m439.253906 459.449219h-183.347656v-459.035157c27.566406-.171874 52.804688 15.429688 64.972656 40.167969l183.257813 313.820313c11.269531 22.492187 10.082031 49.21875-3.136719 70.621094-13.222656 21.40625-36.585938 34.433593-61.746094 34.425781zm0 0" fill="#f29c1f" className=""></path><path d="m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0" fill="#35495e"></path><path d="m291.21875 380c0 9.367188-3.71875 18.347656-10.339844 24.972656-6.625 6.621094-15.605468 10.339844-24.972656 10.339844v-70.621094c9.367188-.003906 18.347656 3.714844 24.972656 10.339844 6.621094 6.621094 10.339844 15.605469 10.339844 24.96875zm0 0" fill="#2c3e50"></path><path d="m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0" fill="#35495e"></path><path d="m291.21875 106.347656v167.722656c0 9.367188-3.71875 18.347657-10.339844 24.96875-6.625 6.625-15.605468 10.34375-24.972656 10.339844v-238.34375c9.367188-.011718 18.359375 3.703125 24.984375 10.328125 6.621094 6.625 10.339844 15.613281 10.328125 24.984375zm0 0" fill="#2c3e50"></path></svg>
				</div>
				<div className="clearfix">
					<h2 className="title">Грешка !</h2>
					<p>За да може V-MENU да ви идентифицира като потребител, вие трябва да сканирате QR Код, който репрезентира вашата маса и номер на обект, ако не сте сканирали QR Кода на заведението няма как апликацията да ви идентифицира.</p>

                    <p>В случай че сте сканирали кода, но все пак сте тук, не се безпокойте. Ето няколко стъпки, които може да ви помогнат:</p>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Възможни решения</h5>
                        </div>
                        <div className="card-body py-2">
                            <div className="dz-list">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/"/>
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Затворете страницата и сканирайте кода отново</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="tel:+359878664334" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/"/>
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Позвънете на техническа поддръжка</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={setDefaultObject} className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/"/>
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Задайте заведение по подразбиране</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={resetMemory} className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/"/>
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Нулирайте паметта на апликацията</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {memoryReset ? (
                                <div className="alert alert-success light alert-dismissible fade show">
                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>	
                                <strong>Успешно!</strong> Вие нулирахте паметта на апликацията.
                                <button className="btn-close" onClick={() => isMemoryReset(false)} data-bs-dismiss="alert" aria-label="btn-close">
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            ) : (null)}
                        </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
        </>
    )
}