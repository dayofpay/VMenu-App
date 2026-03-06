import { useContext, useState, useEffect } from "react";
import withObjectData from "../../../HOC/withObjectInfo";
import useForm from "../../../hooks/useForm";
import CartContext from "../../../contexts/CartCTX";
import { CheckoutKeys } from "../../../keys/formKeys";
import { Link, useNavigate } from "react-router-dom";
import { do_action } from "../../../services/userServices";
import { getMenuLanguage } from "../../../services/appServices";
import { getEnv } from "../../../utils/appData";
import * as storage from '../../../utils/memory';
import StripePaymentWrapper from "./StripePayment";
import PaymentErrorModal from "./PaymentErrorModal";
import { PATH_LIST } from "../../../utils/pathList";

const ShowCheckout = ({ objectData }) => {
  const { checkoutHandler } = useContext(CartContext);

  
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [showStripePayment, setShowStripePayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentData, setPaymentData] = useState(null);   
  const [clientSecret, setClientSecret] = useState(null); 
  const navigate = useNavigate();
  const menuLanguage = getMenuLanguage();

  const { values, onChange } = useForm(null, {
    [CheckoutKeys.CHECKOUT_NAME]: "",
    [CheckoutKeys.CHECKOUT_EMAIL]: "",
    [CheckoutKeys.CHECKOUT_PHONE]: "",
    [CheckoutKeys.CHECKOUT_PAYMENT]: "CASH",
    [CheckoutKeys.CHECKOUT_COMMENT]: "",
  });

  useEffect(() => {
    const savedDiscount = storage.getItem('appliedDiscount');
    if (savedDiscount) {
      setAppliedDiscount(savedDiscount);
    }
  }, []);

  
  const calculateCartTotals = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedAddons = JSON.parse(localStorage.getItem('selectedAddons')) || [];

    let cartTotal = 0;
    let addonsTotal = 0;

    cart.forEach(item => {
      const product = objectData.allProducts?.find(p => p.item_id === item.productId);
      if (product) {
        if (product.has_discount) {
          const discountedPrice = product.item_price * (100 - product.discount_percentage) / 100;
          cartTotal += discountedPrice * item.productQuantity;
        } else {
          cartTotal += product.item_price * item.productQuantity;
        }
      }
    });

    selectedAddons.forEach(addon => {
      addonsTotal += addon.addons.addon_price * addon.addons.addon_quantity;
    });

    return { cartTotal, addonsTotal };
  };

  const handleOrderSubmit = async (formData) => {
    try {
      setLoading(true);

      
      const result = await checkoutHandler(formData);

      if (result.type === 'CASH') {
        navigate(PATH_LIST.FINAL_CHECKOUT);
        return;
      }

      if (result.type === 'CARD') {
        
        setPaymentData(result.paymentData);

        
        const { cartTotal, addonsTotal } = calculateCartTotals();
        const totalAmount = parseFloat(
          (cartTotal + addonsTotal - (appliedDiscount?.amount || 0)).toFixed(2)
        );

        
        const paymentResponse = await fetch(getEnv() + '/api/payments/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            objectId: storage.getItem('restaurantId'),
            amount: totalAmount,
            currency: result.paymentData.currency,
          }),
        });

        const paymentResult = await paymentResponse.json();

        if (!paymentResponse.ok) {
          throw new Error(paymentResult.message || 'Грешка при създаване на плащане');
        }

        
        setClientSecret(paymentResult.clientSecret);
        setPaymentAmount(totalAmount);
        setShowStripePayment(true);
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      alert(error.message || 'Възникна грешка при създаване на поръчката');
    } finally {
      setLoading(false);
    }
  };

  
  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      setShowStripePayment(false);
      setLoading(true);

      
      const orderResponse = await fetch(getEnv() + '/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectData: {
            object_id: paymentData.objectId,
            table_ID: storage.getItem('tableId') || 0,
          },
          customerData: paymentData.customerData,
          cartData: paymentData.cartData,
          item_addons: paymentData.item_addons,
          discountData: paymentData.discountData,
          paymentIntentId: paymentIntent.id, 
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderResult.message || 'Грешка при създаване на поръчка');
      }

      
      localStorage.removeItem('cart');
      localStorage.removeItem('selectedAddons');
      localStorage.removeItem('appliedDiscount');

      navigate(PATH_LIST.FINAL_CHECKOUT);
    } catch (error) {
      console.error('Failed to create order after payment:', error);
      alert('Плащането е успешно, но имаше грешка при създаване на поръчката. Моля, свържете се с поддръжката.');
    } finally {
      setLoading(false);
    }
  };

const [paymentError, setPaymentError] = useState(null); 

const handlePaymentError = (error) => {
  console.log('handlePaymentError received:', error); 
  console.log('decline_code:', error?.decline_code);
  console.log('error?.error?.decline_code:', error?.error?.decline_code); 
  setShowStripePayment(false);
  setPaymentError(error);
};


  const validationSettings = {
    [CheckoutKeys.CHECKOUT_NAME]: { required: true },
    [CheckoutKeys.CHECKOUT_EMAIL]: {
      required: true,
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    [CheckoutKeys.CHECKOUT_PHONE]: {
      required: true,
      regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    },
  };

  const handleNextStep = () => {
    const { Validations } = menuLanguage;

    if (currentStep === 1) {
      let newErrors = {};
      Object.keys(validationSettings).forEach((key) => {
        const rules = validationSettings[key];
        const value = values[key];

        if (rules.required && !value) {
          newErrors[key] = Validations.Required_Field;
        } else if (rules.regex && value && !rules.regex.test(value)) {
          newErrors[key] = Validations.Invalid_Format;
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setErrors({});
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }

    do_action("click_button", {
      button_name: menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Proceed_To_Payment,
    });
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    do_action("click_button", { button_name: menuLanguage.Finalize_Order.Header.Back_Button });
  };

  const handlePaymentSelect = (method) => {
    onChange({ target: { name: CheckoutKeys.CHECKOUT_PAYMENT, value: method } });
    do_action("set_payment_method", {
      payment_method: menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options[method] || method,
    });
    setShowPaymentPopup(false);
  };

  const stepLineWidth = `${(currentStep - 1) * 50}%`;

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      background: '#ffffff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      padding: '15px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 20px',
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
      transition: 'all 0.3s ease',
    },
    title: { fontSize: '1.5rem', fontWeight: 700, color: '#2d3748', margin: 0 },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '30px auto',
      maxWidth: '600px',
      position: 'relative',
    },
    stepLine: {
      position: 'absolute',
      height: '2px',
      background: '#e2e8f0',
      top: '15px',
      left: '10%',
      right: '10%',
      zIndex: 1,
    },
    stepLineActive: { background: '#4299e1', transition: 'all 0.3s ease' },
    step: { display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 },
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
      marginBottom: '8px',
    },
    stepNumberActive: { background: '#4299e1', color: 'white' },
    stepLabel: { fontSize: '0.9rem', color: '#718096', fontWeight: 500 },
    stepLabelActive: { color: '#2d3748', fontWeight: 600 },
    formContainer: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      padding: '30px',
      marginBottom: '30px',
    },
    formTitle: { fontSize: '1.25rem', fontWeight: 600, color: '#2d3748', marginBottom: '20px' },
    inputGroup: { marginBottom: '20px', position: 'relative' },
    inputLabel: { display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#4a5568', fontWeight: 500 },
    inputField: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
    },
    errorMessage: {
      color: '#e53e3e',
      fontSize: '0.8rem',
      marginTop: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    textArea: { minHeight: '100px', resize: 'vertical' },
    paymentOption: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    paymentOptionActive: { borderColor: '#4299e1', background: '#ebf8ff' },
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
      zIndex: 1000,
    },
    paymentPopupContent: {
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      width: '90%',
      maxWidth: '400px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    paymentPopupTitle: { fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px', textAlign: 'center' },
    paymentMethod: {
      padding: '15px',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    paymentMethodActive: { borderColor: '#4299e1', background: '#ebf8ff' },
    actionButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '30px' },
    button: { padding: '12px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease' },
    buttonPrimary: { background: '#4299e1', color: 'white', border: 'none' },
    buttonSecondary: { background: 'white', color: '#4a5568', border: '1px solid #e2e8f0' },
    confirmationCard: { textAlign: 'center', padding: '30px' },
    checkmark: {
      width: '60px',
      height: '60px',
      background: '#48bb78',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      color: 'white',
    },
    confirmationTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' },
    confirmationSubtitle: { color: '#718096', marginBottom: '30px' },
    summaryItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      borderBottom: '1px solid #edf2f7',
      gap: '15px',
    },
    summaryIcon: {
      width: '40px',
      height: '40px',
      background: '#ebf8ff',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#4299e1',
    },
    summaryLabel: { color: '#718096', fontSize: '0.9rem' },
    summaryValue: { fontWeight: 500, marginTop: '3px' },
  };

  const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="currentColor" d="M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8z" />
    </svg>
  );

  return (
    <>
    {paymentError && (
      <PaymentErrorModal
        error={paymentError}
        onRetry={() => {
          setPaymentError(null);
          setShowStripePayment(true);
        }}
        onClose={() => setPaymentError(null)}
      />
    )}
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <Link to="/cart" style={styles.backButton}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              {menuLanguage.Finalize_Order.Header.Back_Button}
            </Link>
            <h1 style={styles.title}>{menuLanguage.Finalize_Order.Header.Text}</h1>
            <div style={{ width: '120px' }}></div>
          </div>
        </header>

        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          <div style={styles.stepLine}></div>
          <div style={{ ...styles.stepLine, ...styles.stepLineActive, width: stepLineWidth }}></div>
          {[1, 2, 3].map((step) => (
            <div key={step} style={styles.step}>
              <div style={{ ...styles.stepNumber, ...(currentStep >= step ? styles.stepNumberActive : {}) }}>
                {step}
              </div>
              <span style={{ ...styles.stepLabel, ...(currentStep >= step ? styles.stepLabelActive : {}) }}>
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

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Label}
                </label>
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
                    <ErrorIcon /> {errors[CheckoutKeys.CHECKOUT_NAME]}
                  </div>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Label}
                </label>
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
                    <ErrorIcon /> {errors[CheckoutKeys.CHECKOUT_EMAIL]}
                  </div>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Label}
                </label>
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
                    <ErrorIcon /> {errors[CheckoutKeys.CHECKOUT_PHONE]}
                  </div>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>
                  {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Label}
                </label>
                <textarea
                  name={CheckoutKeys.CHECKOUT_COMMENT}
                  value={values[CheckoutKeys.CHECKOUT_COMMENT]}
                  onChange={onChange}
                  placeholder={menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Placeholder}
                  style={{ ...styles.inputField, ...styles.textArea }}
                />
              </div>

              <button onClick={handleNextStep} style={{ ...styles.button, ...styles.buttonPrimary }}>
                {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Proceed_To_Payment}
              </button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {currentStep === 2 && (
            <div>
              <h2 style={styles.formTitle}>
                {menuLanguage.Finalize_Order.Form_Fields.Payment.Card_Header}
              </h2>

              <div
                style={{
                  ...styles.paymentOption,
                  ...(values[CheckoutKeys.CHECKOUT_PAYMENT] === 'CASH' ? styles.paymentOptionActive : {}),
                }}
                onClick={() => setShowPaymentPopup(true)}
              >
                <span>
                  {values[CheckoutKeys.CHECKOUT_PAYMENT] === 'CASH'
                    ? menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH
                    : menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD}
                </span>
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.42z" />
                </svg>
              </div>

              <div style={styles.actionButtons}>
                <button onClick={handlePreviousStep} style={{ ...styles.button, ...styles.buttonSecondary }}>
                  {menuLanguage.Finalize_Order.Header.Back_Button}
                </button>
                <button onClick={handleNextStep} style={{ ...styles.button, ...styles.buttonPrimary }}>
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
              <h2 style={styles.confirmationTitle}>
                {menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Text}
              </h2>
              <p style={styles.confirmationSubtitle}>
                {menuLanguage.Finalize_Order.Form_Fields.Confirmation.Header.Subtext}
              </p>

              <div>
                {[
                  {
                    icon: 'M12 4a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z',
                    label: menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Name.Label,
                    value: values[CheckoutKeys.CHECKOUT_NAME],
                  },
                  {
                    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z',
                    label: menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Email.Label,
                    value: values[CheckoutKeys.CHECKOUT_EMAIL],
                  },
                  {
                    icon: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
                    label: menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Guest_Phone.Label,
                    value: values[CheckoutKeys.CHECKOUT_PHONE],
                  },
                  {
                    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z',
                    label: menuLanguage.Finalize_Order.Form_Fields.Payment.Card_Header,
                    value:
                      values[CheckoutKeys.CHECKOUT_PAYMENT] === 'CASH'
                        ? menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CASH
                        : menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options.CARD,
                  },
                ].map((item, idx) => (
                  <div key={idx} style={styles.summaryItem}>
                    <div style={styles.summaryIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div style={styles.summaryLabel}>{item.label}</div>
                      <div style={styles.summaryValue}>{item.value}</div>
                    </div>
                  </div>
                ))}

                {appliedDiscount && (
                  <div style={styles.summaryItem}>
                    <div style={{ ...styles.summaryIcon, background: '#d4edda', color: '#155724' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                    <div>
                      <div style={styles.summaryLabel}>{menuLanguage.Discount_Box.Applied_Discount}</div>
                      <div style={styles.summaryValue}>
                        {appliedDiscount.code} (-{appliedDiscount?.amount?.toFixed(2)}{' '}
                        {objectData.objectInformation.object_currency})
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
                    <div style={styles.summaryLabel}>
                      {menuLanguage.Finalize_Order.Form_Fields.Personal_Data.Additional_Notes.Label}
                    </div>
                    <div style={styles.summaryValue}>
                      {values[CheckoutKeys.CHECKOUT_COMMENT] ||
                        menuLanguage.Finalize_Order.Form_Fields.Confirmation.No_Notes}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.actionButtons}>
                <button onClick={handlePreviousStep} style={{ ...styles.button, ...styles.buttonSecondary }}>
                  {menuLanguage.Finalize_Order.Header.Back_Button}
                </button>
                <button
                  onClick={() => handleOrderSubmit(values)}
                  style={{ ...styles.button, ...styles.buttonPrimary }}
                  disabled={loading}
                >
                  {loading ? '⏳ ' : ''}
                  {menuLanguage.Finalize_Order.Form_Fields.Confirmation.Confirm_Order_Text}
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

              {['CASH', 'CARD'].map((method) => (
                <div
                  key={method}
                  style={{
                    ...styles.paymentMethod,
                    ...(values[CheckoutKeys.CHECKOUT_PAYMENT] === method ? styles.paymentMethodActive : {}),
                  }}
                  onClick={() => handlePaymentSelect(method)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d={
                        method === 'CASH'
                          ? 'M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z'
                          : 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z'
                      }
                    />
                  </svg>
                  <span>{menuLanguage.Finalize_Order.Form_Fields.Payment.Selector.options[method]}</span>
                  {values[CheckoutKeys.CHECKOUT_PAYMENT] === method && (
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
              ))}

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

      {/* Stripe Payment Modal — рендира се само когато clientSecret е наличен */}
      {showStripePayment && clientSecret && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            backdropFilter: 'blur(5px)',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div
              style={{
                padding: '20px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>💳 Онлайн плащане с карта</h3>
              <button
                onClick={() => setShowStripePayment(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#718096' }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              <StripePaymentWrapper
                objectData={objectData}
                amount={paymentAmount}
                clientSecret={clientSecret}
                paymentData={paymentData}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={() => setShowStripePayment(false)}
              />
            </div>

          </div>
        </div>
      )}
      
    </>
  );
  
};

const Checkout = withObjectData(ShowCheckout);
export default Checkout;