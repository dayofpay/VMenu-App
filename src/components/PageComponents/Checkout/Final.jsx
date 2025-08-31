import { Link } from "react-router-dom";
import withObjectData from "../../../HOC/withObjectInfo";
import { do_action } from "../../../services/userServices";
import { getMenuLanguage } from "../../../services/appServices";
import { useState, useEffect } from "react";
import "../../Styles/FinalCheckout.css"
const ShowFinalPage = ({objectData}) => {
    const menuLanguage = getMenuLanguage();
    const successData = menuLanguage.Finalize_Order.Form_Fields.Success_Payment;
    const [activeStep, setActiveStep] = useState(0);
    
    useEffect(() => {
        do_action("finalized_order", { 
            message: successData.Header.Text
        });
        
        const stepTimer = setInterval(() => {
            setActiveStep(prev => {
                if (prev >= 1) {
                    clearInterval(stepTimer);
                    return 1;
                }
                return prev + 1;
            });
        }, 800);
        
        return () => clearInterval(stepTimer);
    }, [successData.Header.Text]);

    const steps = menuLanguage.Finalize_Order.Success_Element.steps;

    return (
        <div className="page-content final-step-page">
            <div className="container">
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                    
                    <div className="steps-wrapper">
                        {steps.map((step, index) => (
                            <div 
                                key={index} 
                                className={`step ${index <= activeStep ? 'active' : ''}`}
                            >
                                <div className="step-icon">{step.icon}</div>
                                <div className="step-title">{step.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="payment-confirm-wrapper">
                    <div className="payment-box animated-box">
                        <div className="success-checkmark">
                            <div className="check-icon">
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                    <circle className="circle" cx="26" cy="26" r="25" fill="none"/>
                                    <path className="check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                </svg>
                            </div>
                        </div>
                        
                        <h2 className="text-white">{successData.Header.Text}</h2>	
                        <p className="success-subtext">{successData.Header.Subtext}</p>
                        
                        <div className="order-details">
                            <div className="detail-item">
                                <span className="label">{menuLanguage.Finalize_Order.Expected_Time}:</span>
                                <span className="value">~5-45 {menuLanguage.Finalize_Order.Minutes}</span>
                            </div>
                        </div>
                        
                        <Link 
                            to="/" 
                            className="delivery-btn mx-auto pulse-animation"
                        >
                            {successData.Back_Button}
                            <span className="next ms-auto">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z" fill="#fff"></path>
                                </svg>
                            </span>
                        </Link>
                        
                        <div className="support-text">
                            {menuLanguage.Finalize_Order.Have_Questions} <a href={`tel:${objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.MANAGER_PHONE_NUMBER}`}>{objectData?.MODULES?.OBJECT_INFO?.CONTACTS?.MANAGER_PHONE_NUMBER}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const FinalCheckoutPage = withObjectData(ShowFinalPage);

export default FinalCheckoutPage;