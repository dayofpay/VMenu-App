import { getEnv } from "../../utils/appData";
import OBJECT_TYPES from "../../utils/objectTypes";
import LoadingAnimation from "../Animations/Loading";
import '../Styles/CKContent.css';

function DefaultHeader({objectData}) {
    if(!objectData.objectInformation) {
        return <LoadingAnimation/>
    }
    console.log(objectData);
    
    return (
        <header className="header">
            <div className="main-bar">
                <div className="container">
                    <div className="header-content">
                        <div className="left-content">
                            <h5 className="title mb-0 text-nowrap">{objectData?.objectInformation?.object_name}</h5>
                        </div>
                        <div className="mid-content"></div>
                        <div className="right-content">
                            <button className="btn w-100 btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#objectInfoModal"
                                class="mb-2 me-2 btn btn-icon btn-primary"><i className="fa-solid fa-circle-info"></i></button>
                            {/*TEMPORARY REMOVED -  {objectData?.license.perksData.tc_darkMode ? (
                            <a href="#" className="theme-btn">
                                <svg className="dark" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"
                                    height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                    <path
                                        d="M11.57,2.3c2.38-0.59,4.68-0.27,6.63,0.64c0.35,0.16,0.41,0.64,0.1,0.86C15.7,5.6,14,8.6,14,12s1.7,6.4,4.3,8.2 c0.32,0.22,0.26,0.7-0.09,0.86C16.93,21.66,15.5,22,14,22c-6.05,0-10.85-5.38-9.87-11.6C4.74,6.48,7.72,3.24,11.57,2.3z" />
                                </svg>
                                <svg className="light" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"
                                    height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                    <rect fill="none" height="24" width="24" />
                                    <path
                                        d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
                                </svg>
                            </a>
                            ) : (null)} */}
                        </div>
                        <div className="modal fade" id="objectInfoModal" style={{ display: 'none' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Информация за {OBJECT_TYPES?.[objectData?.objectInformation?.object_type]} {objectData?.objectInformation?.object_name}</h5>
                                        <button className="btn-close" data-bs-dismiss="modal">
                                            <i className="fa-solid fa-xmark"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5 className="card-title">
                                                            <i className="fa-solid fa-wifi"></i> WiFi Информация
                                                        </h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-6 mb-3">
                                                                <h6>SSID:</h6>
                                                                <p className="fw-bold">{objectData?.MODULES?.OBJECT_INFO?.FEATURES?.WIFI_SSID || 'Няма информация'}</p>
                                                            </div>
                                                            <div className="col-md-6 mb-3">
                                                                <h6>Парола:</h6>
                                                                <p className="fw-bold">{objectData?.MODULES?.OBJECT_INFO?.FEATURES?.WIFI_PASSCODE || 'Няма информация'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header d-block">
                                                        <h5 className="card-title">Контактна Информация</h5>
                                                        <p className="sub-title mb-0">Свържете се с управителя:</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row g-2">
                                                            <div className="col-12 mb-2">
                                                                <a href={`tel:${objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.MANAGER_PHONE_NUMBER || ''}`} className="btn btn-phone btn-icon-text w-100">
                                                                    <i className="fa fa-phone"></i> {objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.MANAGER_PHONE_NUMBER || 'Не е наличен'}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-3">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header d-block">
                                                        <h5 className="card-title">Социални Връзки</h5>
                                                        <p className="sub-title mb-0">Свържете се с нас в социалните мрежи:</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row g-2">
                                                            {objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_FACEBOOK && (
                                                                <div className="col-6">
                                                                    <a href={objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_FACEBOOK} target="_blank" rel="noopener noreferrer" className="btn btn-facebook btn-icon-text w-100">
                                                                        <i className="fab fa-facebook-f"></i> Facebook
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_INSTAGRAM && (
                                                                <div className="col-6">
                                                                    <a href={objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="btn btn-instagram btn-icon-text w-100">
                                                                        <i className="fab fa-instagram"></i> Instagram
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_TIKTOK && (
                                                                <div className="col-6">
                                                                    <a href={objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_TIKTOK} target="_blank" rel="noopener noreferrer" className="btn btn-tiktok btn-icon-text w-100">
                                                                        <i className="fab fa-tiktok"></i> TikTok
                                                                    </a>
                                                                </div>
                                                            )}
                                                            {objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_TWITTER && (
                                                                <div className="col-6">
                                                                    <a href={objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.SOCIAL_TWITTER} target="_blank" rel="noopener noreferrer" className="btn btn-twitter btn-icon-text w-100">
                                                                        <i className="fab fa-twitter"></i> Twitter
                                                                    </a>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="divider border-warning inner-divider mt-3">
                                            <i className="fa-solid fa-heart"></i>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <h6><i className="fa-solid fa-info-circle"></i> Допълнителна Информация:</h6>
                                                <div className="ck-content" dangerouslySetInnerHTML={{ __html: objectData?.MODULES?.OBJECT_INFO?.DESIGN_MODULE?.DATA || 'Няма допълнителна информация' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-danger light" data-bs-dismiss="modal">Затвори</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div style={{
                textAlign: 'center',
                fontSize: '10px',
                color: '#888',
                opacity: '0.7',
                padding: '5px 0',
                fontFamily: 'sans-serif',
                backgroundColor: 'rgba(0,0,0,0.02)'
            }}>
                Поддържано и разработвано от V-MENU
{objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.HEADER_SETTINGS?.SHOW_LOGO && (
                    <div style={{
                        marginTop: '10px',
                        maxWidth: '100%',
                        width: '200px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '10px',
                        borderRadius: '8px',
                    }}>
                        <img 
                            src={objectData?.MODULES?.OBJECT_INFO?.LANDING_PAGE_SETTINGS?.HEADER_SETTINGS?.SHOW_LOGO && `${getEnv() + "/uploads/" + objectData.objectInformation.object_image}`}
                            alt="Logo" 
                            style={{
                                width: '200%',
                                height: 'auto',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                            }} 
                        />
                    </div>
                )}
            </div>

        </header>

    )
}

const Header = DefaultHeader;
export default Header;