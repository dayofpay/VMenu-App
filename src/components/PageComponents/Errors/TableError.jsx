import { useState } from "react"
import { Link } from "react-router-dom"
export const TableError = () => {
    const [memoryReset,isMemoryReset] = useState(false);

    const resetMemory = () => {
        console.log('resetting memory');
        localStorage.clear();
        isMemoryReset(true);
    }
    return (
        <>
<header className="header">
		<div className="main-bar">
			<div className="container">
				<div className="header-content">
					<div className="left-content">

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
                <div className="icon-bx" style={{marginTop:'5em'}}>
                    <svg height="120" viewBox="0 -26 511.82388 511" width="120" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m439.210938 459.449219h-366.609376c-25.160156 0-48.53125-13.027344-61.757812-34.433594-13.230469-21.402344-14.433594-48.128906-3.179688-70.636719l183.304688-313.832031c12.300781-24.59375 37.4375-40.132813 64.9375-40.132813s52.636719 15.539063 64.9375 40.132813l183.304688 313.832031c11.253906 22.507813 10.050781 49.234375-3.179688 70.636719-13.226562 21.40625-36.59375 34.433594-61.757812 34.433594zm0 0"
                            fill="#f0c419"></path>
                        <path
                            d="m439.253906 459.449219h-183.347656v-459.035157c27.566406-.171874 52.804688 15.429688 64.972656 40.167969l183.257813 313.820313c11.269531 22.492187 10.082031 49.21875-3.136719 70.621094-13.222656 21.40625-36.585938 34.433593-61.746094 34.425781zm0 0"
                            fill="#f29c1f" className=""></path>
                        <path
                            d="m291.21875 380c0 19.503906-15.8125 35.3125-35.3125 35.3125s-35.308594-15.808594-35.308594-35.3125c0-19.5 15.808594-35.308594 35.308594-35.308594s35.3125 15.808594 35.3125 35.308594zm0 0"
                            fill="#35495e"></path>
                        <path
                            d="m291.21875 380c0 9.367188-3.71875 18.347656-10.339844 24.972656-6.625 6.621094-15.605468 10.339844-24.972656 10.339844v-70.621094c9.367188-.003906 18.347656 3.714844 24.972656 10.339844 6.621094 6.621094 10.339844 15.605469 10.339844 24.96875zm0 0"
                            fill="#2c3e50"></path>
                        <path
                            d="m255.90625 71.035156c19.5 0 35.3125 15.808594 35.3125 35.3125v167.722656c0 19.5-15.8125 35.308594-35.3125 35.308594s-35.308594-15.808594-35.308594-35.308594v-167.722656c0-19.503906 15.808594-35.3125 35.308594-35.3125zm0 0"
                            fill="#35495e"></path>
                        <path
                            d="m291.21875 106.347656v167.722656c0 9.367188-3.71875 18.347657-10.339844 24.96875-6.625 6.625-15.605468 10.34375-24.972656 10.339844v-238.34375c9.367188-.011718 18.359375 3.703125 24.984375 10.328125 6.621094 6.625 10.339844 15.613281 10.328125 24.984375zm0 0"
                            fill="#2c3e50"></path>
                    </svg>
                </div>
                <div className="clearfix">
                    <h2 className="title">Грешка !</h2>
                    <p>Системата не успя да открие масата, на която седите. Възможно е да има няколко причини за това
                    </p>

                 
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Възможни причини</h5>
                        </div>
                        <div className="card-body py-2">
                            <div className="dz-list">
                                <ul>
                                <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Масата не е добавена в базата данни </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Грешка в QR кода </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Нарушено качество на QR Кода </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Лошо качество на камерата ви </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Проблеми със вашата връзка </span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Технически проблем на апликацията </span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Възможни решения</h5>
                        </div>
                        <div className="card-body py-2">
                            <div className="dz-list">
                                <ul>
                                    <li>
                                        <a href="tel:+359878664334" className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
                                            </div>
                                            <div className="dz-inner">
                                                <span className="title">Позвънете на техническа поддръжка</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={resetMemory}
                                            className="item-content item-link">
                                            <div className="dz-icon">
                                                <img src="/assets/images/avatar/1.jpg" alt="/" />
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