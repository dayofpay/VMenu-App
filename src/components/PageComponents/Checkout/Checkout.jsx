import { useContext, useState,useEffect } from "react";
import withObjectData from "../../../HOC/withObjectInfo";
import useForm from "../../../hooks/useForm";
import CartContext from "../../../contexts/CartCTX";
import { CheckoutKeys } from "../../../keys/formKeys";
import { Link } from "react-router-dom";
import { do_action } from "../../../services/userServices";
import { getMenuLanguage } from "../../../services/appServices";
import * as storage from '../../../utils/memory'
const ShowCheckout = ({ objectData }) => {
  const { checkoutHandler } = useContext(CartContext);
const { values, onChange, onSubmit } = useForm(async (formData) => {
    try {
      setLoading(true);
      

      const checkoutData = {
        ...formData,
        discountData: appliedDiscount
      };
      
      await checkoutHandler(checkoutData);
    } catch (error) {
      console.error('Order creation failed:', error);

      alert(error.message || 'Възникна грешка при създаване на поръчката');
    } finally {
      setLoading(false);
    }
  }, {
    [CheckoutKeys.CHECKOUT_NAME]: "",
    [CheckoutKeys.CHECKOUT_EMAIL]: "",
    [CheckoutKeys.CHECKOUT_PHONE]: "",
    [CheckoutKeys.CHECKOUT_PAYMENT]: "CASH",
    [CheckoutKeys.CHECKOUT_COMMENT]: "",
  });
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const menuLanguage = getMenuLanguage();
  const [appliedDiscount, setAppliedDiscount] = useState(null);

  useEffect(() => {
    const savedDiscount = storage.getItem('appliedDiscount');
    if (savedDiscount) {
      setAppliedDiscount(savedDiscount);
    }
  }, []);
  // Inline styles
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    header: {
      background: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f7fa',
      borderRadius: '50px',
      padding: '8px 16px',
      textDecoration: 'none',
      color: '#4a5568',
      fontWeight: 500,
      transition: 'all 0.3s ease'
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#2d3748',
      margin: 0
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '30px auto',
      maxWidth: '600px',
      position: 'relative'
    },
    stepLine: {
      position: 'absolute',
      height: '2px',
      background: '#e2e8f0',
      top: '15px',
      left: '10%',
      right: '10%',
      zIndex: 1
    },
    stepLineActive: {
      background: '#4299e1',
      transition: 'all 0.3s ease'
    },
    step: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 2
    },
    stepNumber: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: '#e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      color: '#718096',
      marginBottom: '8px'
    },
    stepNumberActive: {
      background: '#4299e1',
      color: 'white'
    },
    stepLabel: {
      fontSize: '0.9rem',
      color: '#718096',
      fontWeight: 500
    },
    stepLabelActive: {
      color: '#2d3748',
      fontWeight: 600
    },
    formContainer: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      padding: '30px',
      marginBottom: '30px'
    },
    formTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2d3748',
      marginBottom: '20px'
    },
    inputGroup: {
      marginBottom: '20px',
      position: 'relative'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '0.9rem',
      color: '#4a5568',
      fontWeight: 500
    },
    inputField: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    inputFieldFocus: {
      borderColor: '#4299e1',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)'
    },
    inputIcon: {
      position: 'absolute',
      right: '15px',
      top: '40px',
      color: '#a0aec0'
    },
    errorMessage: {
      color: '#e53e3e',
      fontSize: '0.8rem',
      marginTop: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    textArea: {
      minHeight: '100px',
      resize: 'vertical'
    },
    paymentOption: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    paymentOptionActive: {
      borderColor: '#4299e1',
      background: '#ebf8ff'
    },
    paymentOptionHover: {
      borderColor: '#cbd5e0'
    },
    paymentPopup: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    paymentPopupContent: {
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    paymentPopupTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '20px',
      textAlign: 'center'
    },
    paymentMethod: {
      padding: '15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    paymentMethodActive: {
      borderColor: '#4299e1',
      background: '#ebf8ff'
    },
    paymentMethodHover: {
      borderColor: '#cbd5e0'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '30px'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    buttonPrimary: {
      background: '#4299e1',
      color: 'white',
      border: 'none'
    },
    buttonPrimaryHover: {
      background: '#3182ce'
    },
    buttonSecondary: {
      background: 'white',
      color: '#4a5568',
      border: '1px solid #e2e8f0'
    },
    buttonSecondaryHover: {
      background: '#f7fafc',
      borderColor: '#cbd5e0'
    },
    confirmationCard: {
      textAlign: 'center',
      padding: '30px'
    },
    checkmark: {
      width: '60px',
      height: '60px',
      background: '#48bb78',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white'
    },
    confirmationTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      marginBottom: '10px'
    },
    confirmationSubtitle: {
      color: '#718096',
      marginBottom: '30px'
    },
    summaryItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #edf2f7',
      gap: '15px'
    },
    summaryIcon: {
      width: '40px',
      height: '40px',
      background: '#ebf8ff',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4299e1'
    },
    summaryLabel: {
      color: '#718096',
      fontSize: '0.9rem'
    },
    summaryValue: {
      fontWeight: 500,
      marginTop: '3px'
    }
  };

  const validationSettings = {
    [CheckoutKeys.CHECKOUT_NAME]: { required: true },
    [CheckoutKeys.CHECKOUT_EMAIL]: { 
      required: true,
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    [CheckoutKeys.CHECKOUT_PHONE]: {
      required: true,
      regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    }
  };

  /**
   * Handles the next step button click
   * 
   * @function handleNextStep
   * @returns {void}
   */
  const handleNextStep = () => {
    // Get translations for current language
    const { Validations } = menuLanguage;

    // Validate the form on the first step
    if (currentStep === 1) {
      let newErrors = {};
      // Loop over each field in the form
      Object.keys(validationSettings).forEach((key) => {
        const rules = validationSettings[key];
        const value = values[key];

        // If the field is required and empty, add an error
        if (rules.required && !value) {
          newErrors[key] = Validations.Required_Field;
        }
        // If the field has a regex rule and the value does not match it, add an error
        else if (rules.regex && value && !rules.regex.test(value)) {
          newErrors[key] = Validations.Invalid_Format;
        }
      });

      // If there are any errors, set them in the state
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      // If there are no errors, clear the errors
      setErrors({});
    }

    // If we are not on the last step, go to the next step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    

    // Log button click event
    const buttonText = menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Proceed_To_Payment;
    do_action("click_button", { button_name: buttonText });
};

  /**
   * Handle previous step button click
   * 
   * @function handlePreviousStep
   * @returns {void}
   */
  const handlePreviousStep = () => {
    // If not on the first step, go to the previous step
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
    
    // Log button click event
    const buttonText = menuLanguage.Finalize_Order.Header.Back_Button;
    do_action("click_button", { button_name: buttonText });
  };

/**
 * Handle payment select change event
 * 
 * @function handlePaymentSelect
 * @param {string} method - Selected payment method
 * @returns {void}
 */
const handlePaymentSelect = (method) => {
    // Set selected payment method in the form
    onChange({
        target: { name: CheckoutKeys.CHECKOUT_PAYMENT, value: method },
    });
    
    // Get payment method translation
    const paymentMethodText = menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options[method] || method;
    
    // Log payment method selection event
    do_action("set_payment_method", { 
        payment_method: paymentMethodText 
    });
    
    // Hide payment selection popup
    setShowPaymentPopup(false);
};

  // Calculate active step line width
  const stepLineWidth = `${(currentStep - 1) * 50}%`;
const confirmationStepWithDiscount = (
    <div style={styles.confirmationCard}>
      <div style={styles.checkmark}>
        <svg width="30" height="30" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      </div>
      <h2 style={styles.confirmationTitle}>{menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Text}</h2>
      <p style={styles.confirmationSubtitle}>{menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Subtext}</p>
      
      <div>

        <div style={styles.summaryItem}>
          <div style={styles.summaryIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            </svg>
          </div>
          <div>
            <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Label}</div>
            <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_NAME]}</div>
          </div>
        </div>
        
        <div style={styles.summaryItem}>
          <div style={styles.summaryIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
            </svg>
          </div>
          <div>
            <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Label}</div>
            <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_EMAIL]}</div>
          </div>
        </div>
        
        <div style={styles.summaryItem}>
          <div style={styles.summaryIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
          <div>
            <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Label}</div>
            <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_PHONE]}</div>
          </div>
        </div>
        

        <div style={styles.summaryItem}>
          <div style={styles.summaryIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
            </svg>
          </div>
          <div>
            <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Payment.Card_Header}</div>
            <div style={styles.summaryValue}>
              {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" 
                ? menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH 
                : menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD}
            </div>
          </div>
        </div>
        

        {appliedDiscount && (
          <div style={styles.summaryItem}>
            <div style={{...styles.summaryIcon, background: '#d4edda', color: '#155724'}}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
            </div>
            <div>
              <div style={styles.summaryLabel}>Приложена отстъпка</div>
              <div style={styles.summaryValue}>
                {appliedDiscount.code} (-{appliedDiscount?.amount?.toFixed(2)} {objectData.objectInformation.object_currency})
              </div>
            </div>
          </div>
        )}
        

        <div style={styles.summaryItem}>
          <div style={styles.summaryIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm0-4h-2V8h2v6z" />
            </svg>
          </div>
          <div>
            <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Label}</div>
            <div style={styles.summaryValue}>
              {values[CheckoutKeys.CHECKOUT_COMMENT] || menuLanguage.Finalize_Order.Form_Fields.Confirmation.No_Notes}
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.actionButtons}>
        <button
          onClick={handlePreviousStep}
          style={{ ...styles.button, ...styles.buttonSecondary }}
          disabled={loading}
        >
          {menuLanguage.Finalize_Order.Header.Back_Button}
        </button>
        <button
          onClick={() => onSubmit(values)}
          style={{ ...styles.button, ...styles.buttonPrimary }}
          disabled={loading}
        >
          {loading ? '⏳' : ''} {menuLanguage.Finalize_Order.Form_Fields.Confirmation.Confirm_Order_Text}
        </button>
      </div>
    </div>
  );
   return (

    <div style={styles.container}>
      

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <Link to="/cart" style={styles.backButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
              <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            {menuLanguage.Finalize_Order.Header.Back_Button}
          </Link>
          <h1 style={styles.title}>
            {menuLanguage.Finalize_Order.Header.Text}
          </h1>
          <div style={{ width: '120px' }}></div>
        </div>
      </header>

      {/* Step Indicator */}
      <div style={styles.stepIndicator}>
        <div style={styles.stepLine}></div>
        <div style={{ ...styles.stepLine, ...styles.stepLineActive, width: stepLineWidth }}></div>
        
        {[1, 2, 3].map((step) => (
          <div key={step} style={styles.step}>
            <div style={{ 
              ...styles.stepNumber, 
              ...(currentStep >= step ? styles.stepNumberActive : {})
            }}>
              {step}
            </div>
            <span style={{
              ...styles.stepLabel,
              ...(currentStep >= step ? styles.stepLabelActive : {})
            }}>
              {step === 1 
                ? menuLanguage.Finalize_Order.Steps.Personal_Data
                : step === 2 
                  ? menuLanguage.Finalize_Order.Steps.Payment
                  : menuLanguage.Finalize_Order.Steps.Confirmation}
            </span>
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div style={styles.formContainer}>
        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div>
            <h2 style={styles.formTitle}>{menuLanguage.Finalize_Order.Steps.Personal_Data}</h2>
            
            {/* Name Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Label}</label>
              <input
                type="text"
                name={CheckoutKeys.CHECKOUT_NAME}
                value={values[CheckoutKeys.CHECKOUT_NAME]}
                onChange={onChange}
                placeholder={menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Placeholder}
                style={styles.inputField}
              />
              {errors[CheckoutKeys.CHECKOUT_NAME] && (
                <div style={styles.errorMessage}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z" />
                  </svg>
                  {errors[CheckoutKeys.CHECKOUT_NAME]}
                </div>
              )}
            </div>
            
            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Label}</label>
              <input
                type="email"
                name={CheckoutKeys.CHECKOUT_EMAIL}
                value={values[CheckoutKeys.CHECKOUT_EMAIL]}
                onChange={onChange}
                placeholder={menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Placeholder}
                style={styles.inputField}
              />
              {errors[CheckoutKeys.CHECKOUT_EMAIL] && (
                <div style={styles.errorMessage}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z" />
                  </svg>
                  {errors[CheckoutKeys.CHECKOUT_EMAIL]}
                </div>
              )}
            </div>
            
            {/* Phone Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Label}</label>
              <input
                type="tel"
                name={CheckoutKeys.CHECKOUT_PHONE}
                value={values[CheckoutKeys.CHECKOUT_PHONE]}
                onChange={onChange}
                placeholder={menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Placeholder}
                style={styles.inputField}
              />
              {errors[CheckoutKeys.CHECKOUT_PHONE] && (
                <div style={styles.errorMessage}>
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z" />
                  </svg>
                  {errors[CheckoutKeys.CHECKOUT_PHONE]}
                </div>
              )}
            </div>
            
            {/* Comment Field */}
            <div style={styles.inputGroup}>
              <label style={styles.inputLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Label}</label>
              <textarea
                name={CheckoutKeys.CHECKOUT_COMMENT}
                value={values[CheckoutKeys.CHECKOUT_COMMENT]}
                onChange={onChange}
                placeholder={menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Placeholder}
                style={{ ...styles.inputField, ...styles.textArea }}
              />
            </div>
            
            <button
              onClick={handleNextStep}
              style={{ ...styles.button, ...styles.buttonPrimary }}
            >
              {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Proceed_To_Payment}
            </button>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {currentStep === 2 && (
          <div>
            <h2 style={styles.formTitle}>{menuLanguage.Finalize_Order.Form_Fields.Payment.Card_Header}</h2>
            
            <div 
              style={{ 
                ...styles.paymentOption,
                ...(values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" ? styles.paymentOptionActive : {})
              }}
              onClick={() => setShowPaymentPopup(true)}
            >
              <span>
                {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" 
                  ? menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH 
                  : menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD}
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42z" />
              </svg>
            </div>
            
            <div style={styles.actionButtons}>
              <button
                onClick={handlePreviousStep}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                {menuLanguage.Finalize_Order.Header.Back_Button}
              </button>
              <button
                onClick={handleNextStep}
                style={{ ...styles.button, ...styles.buttonPrimary }}
              >
                {menuLanguage.Finalize_Order.Form_Fields.Payment.View_Order}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {currentStep === 3 && (
          <div style={styles.confirmationCard}>
            <div style={styles.checkmark}>
              <svg width="30" height="30" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 style={styles.confirmationTitle}>{menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Text}</h2>
            <p style={styles.confirmationSubtitle}>{menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Subtext}</p>
            
            <div>
              <div style={styles.summaryItem}>
                <div style={styles.summaryIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
                  </svg>
                </div>
                <div>
                  <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Label}</div>
                  <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_NAME]}</div>
                </div>
              </div>
              
              <div style={styles.summaryItem}>
                <div style={styles.summaryIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                </div>
                <div>
                  <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Label}</div>
                  <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_EMAIL]}</div>
                </div>
              </div>
              
              <div style={styles.summaryItem}>
                <div style={styles.summaryIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                </div>
                <div>
                  <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Label}</div>
                  <div style={styles.summaryValue}>{values[CheckoutKeys.CHECKOUT_PHONE]}</div>
                </div>
              </div>
              
              <div style={styles.summaryItem}>
                <div style={styles.summaryIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                  </svg>
                </div>
                <div>
                  <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Payment.Card_Header}</div>
                  <div style={styles.summaryValue}>
                    {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" 
                      ? menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH 
                      : menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD}
                  </div>
                </div>
              </div>
              
              {/* Discount Information */}
              {appliedDiscount && (
                <div style={styles.summaryItem}>
                  <div style={{...styles.summaryIcon, background: '#d4edda', color: '#155724'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.summaryLabel}>Приложена отстъпка</div>
                    <div style={styles.summaryValue}>
                      {appliedDiscount.code} (-{appliedDiscount?.amount?.toFixed(2)} {objectData.objectInformation.object_currency})
                    </div>
                  </div>
                </div>
              )}
              
              <div style={styles.summaryItem}>
                <div style={styles.summaryIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm0-4h-2V8h2v6z" />
                  </svg>
                </div>
                <div>
                  <div style={styles.summaryLabel}>{menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Label}</div>
                  <div style={styles.summaryValue}>
                    {values[CheckoutKeys.CHECKOUT_COMMENT] || menuLanguage.Finalize_Order.Form_Fields.Confirmation.No_Notes}
                  </div>
                </div>
              </div>
            </div>
            
            <div style={styles.actionButtons}>
              <button
                onClick={handlePreviousStep}
                style={{ ...styles.button, ...styles.buttonSecondary }}
              >
                {menuLanguage.Finalize_Order.Header.Back_Button}
              </button>
              <button
                onClick={() => onSubmit(values)}
                style={{ ...styles.button, ...styles.buttonPrimary }}
                disabled={loading}
              >
                {loading ? '⏳' : ''} {menuLanguage.Finalize_Order.Form_Fields.Confirmation.Confirm_Order_Text}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Method Popup */}
      {showPaymentPopup && (
        <div style={styles.paymentPopup}>
          <div style={styles.paymentPopupContent}>
            <h3 style={styles.paymentPopupTitle}>
              {menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.Header}
            </h3>
            
            <div 
              style={{ 
                ...styles.paymentMethod,
                ...(values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" ? styles.paymentMethodActive : {})
              }}
              onClick={() => handlePaymentSelect("CASH")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              </svg>
              <span>{menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH}</span>
              {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH" && (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
            
            <div 
              style={{ 
                ...styles.paymentMethod,
                ...(values[CheckoutKeys.CHECKOUT_PAYMENT] === "CARD" ? styles.paymentMethodActive : {})
              }}
              onClick={() => handlePaymentSelect("CARD")}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
              <span>{menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD}</span>
              {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CARD" && (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
            </div>
            
            <button
              onClick={() => setShowPaymentPopup(false)}
              style={{ ...styles.button, ...styles.buttonSecondary, marginTop: '15px' }}
            >
              {menuLanguage.Header.Information.Close_Button}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Checkout = withObjectData(ShowCheckout);
export default Checkout;