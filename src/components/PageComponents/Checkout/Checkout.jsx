import { useContext, useState } from "react";
import withObjectData from "../../../HOC/withObjectInfo";
import useForm from "../../../hooks/useForm";
import CartContext from "../../../contexts/CartCTX";
import { CheckoutKeys } from "../../../keys/formKeys";
import { Link } from "react-router-dom";
import "../../Styles/Checkout.css";
import { do_action } from "../../../services/userServices";
const ShowCheckout = ({ objectData }) => {
  const { checkoutHandler } = useContext(CartContext);
  const { values, onChange, onSubmit } = useForm(checkoutHandler, {
    [CheckoutKeys.CHECKOUT_NAME]: "",
    [CheckoutKeys.CHECKOUT_EMAIL]: "",
    [CheckoutKeys.CHECKOUT_PHONE]: "",
    [CheckoutKeys.CHECKOUT_PAYMENT]: "CASH",
    [CheckoutKeys.CHECKOUT_COMMENT]: "",
  });

  // State for step management
  const [currentStep, setCurrentStep] = useState(1);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Validation rules for Step 1 fields
  const validationSettings = {
    [CheckoutKeys.CHECKOUT_NAME]: {
      required: true,
      allowNull: false,
    },
    [CheckoutKeys.CHECKOUT_EMAIL]: {
      required: true,
      allowNull: false,
      regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    [CheckoutKeys.CHECKOUT_PHONE]: {
      required: true,
      allowNull: false,
      regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    },
    [CheckoutKeys.CHECKOUT_COMMENT]: {
      required: false,
      allowNull: true,
    },
  };

  // Handle navigation to the next step in the checkout process
  const handleNextStep = () => {
    // Check if the current step is the first step
    if (currentStep === 1) {
      // Initialize an object to store validation errors for Step 1 fields
      let newErrors = {};

      // Iterate over each field defined in validationSettings
      Object.keys(validationSettings).forEach((key) => {
        // Retrieve validation rules and current field value
        const rules = validationSettings[key];
        const value = values[key];

        // Check if the field is required and if it's empty
        if (rules.required && !value) {
          // Set an error message for required fields that are empty
          newErrors[key] = "Това поле е задължително!";
        }
        // Check if there is a regex rule and if the value does not match the regex
        else if (rules.regex && value && !rules.regex.test(value)) {
          // Set an error message for fields that do not match the regex pattern
          newErrors[key] = "Невалиден формат!";
        }
      });

      // If there are any validation errors, update the errors state and stop
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      } else {
        // Clear any previous errors if validation passes
        setErrors({});
      }
    }

    // Move to the next step if the current step is less than the final step
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
    do_action("click_button", { button_name: "Преминете към плащане" });
  };

  // Handle navigation to the previous step in the checkout process
  const handlePreviousStep = () => {
    // Check if the current step is greater than the first step
    if (currentStep > 1) {
      // Decrement the current step to navigate to the previous step
      setCurrentStep(currentStep - 1);
    }
    do_action("click_button", { button_name: "Предишна стъпка" });
  };

  // This function is called when the user selects a payment method from the dropdown menu.
  // It will update the state of the checkout form with the selected payment method.
  // It will also close the payment popup after the user selects a payment method.
  const handlePaymentSelect = (method) => {
    // Update the state of the checkout form with the selected payment method
    onChange({
      target: { name: CheckoutKeys.CHECKOUT_PAYMENT, value: method },
    });

    do_action("set_payment_method", { payment_method: method });

    // Close the payment popup
    setShowPaymentPopup(false);
  };

  return (
    <div className="modern-checkout">
      {/* Header */}
      <header className="checkout-header bg-light border-bottom">
        <div className="container">
          <nav className="navbar navbar-light px-0 py-3">
            <div className="container-fluid p-0">
              {/* Back Button */}
              <div className="d-flex align-items-center">
                <Link
                  to="/cart"
                  className="btn btn-outline-secondary d-flex align-items-center py-2 px-3"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="me-2"
                    style={{ fill: "currentColor" }}
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  <span className="d-none d-sm-inline">Назад</span>
                </Link>
              </div>

              {/* Title */}
              <h1 className="navbar-brand mb-0 h1 text-primary fs-4 fw-bold mx-auto">
                Финализиране на поръчка
              </h1>

              {/* Spacer for alignment */}
              <div className="d-flex" style={{ width: "120px" }}></div>
            </div>
          </nav>
        </div>
      </header>
      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step ${currentStep === 1 ? "active" : ""}`}>
          1. Лични данни
        </div>
        <div className={`step ${currentStep === 2 ? "active" : ""}`}>
          2. Начин на плащане
        </div>
        <div className={`step ${currentStep === 3 ? "active" : ""}`}>
          3. Потвърждение
        </div>
      </div>

      {/* Checkout Form */}
      <section className="checkout-form">
        <div className="container">
          <div className="checkout-card">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="step-content">
                <h2 className="form-title">Лични данни</h2>

                <form onSubmit={onSubmit}>
                  {/* Name Field */}
                  <div className="mb-3 input-group input-group-icon">
                    <div className="input-group-text">
                      <div className="input-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="nameGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "#6B7B8F", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#3C4B5B", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2Z"
                            fill="url(#nameGradient)"
                          />
                          <path
                            d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
                            stroke="url(#nameGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="text"
                      id="name"
                      name={CheckoutKeys.CHECKOUT_NAME}
                      value={values[CheckoutKeys.CHECKOUT_NAME]}
                      onChange={onChange}
                      placeholder="Въведете вашето име"
                      required
                      className="form-control"
                    />
                  </div>
                  {errors[CheckoutKeys.CHECKOUT_NAME] && (
                    <div className="error-message animate-fade-in">
                      <svg className="error-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
                        />
                      </svg>
                      <span>Име - {errors[CheckoutKeys.CHECKOUT_NAME]}</span>
                    </div>
                  )}

                  {/* Email Field */}
                  <div className="mb-3 input-group input-group-icon">
                    <div className="input-group-text">
                      <div className="input-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="emailGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "#6B7B8F", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#3C4B5B", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="url(#emailGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 6L12 13L2 6"
                            stroke="url(#emailGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name={CheckoutKeys.CHECKOUT_EMAIL}
                      value={values[CheckoutKeys.CHECKOUT_EMAIL]}
                      onChange={onChange}
                      placeholder="Въведете вашият E-Mail"
                      required
                      className="form-control"
                    />
                  </div>
                  {errors[CheckoutKeys.CHECKOUT_EMAIL] && (
                    <div className="error-message animate-fade-in">
                      <svg className="error-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
                        />
                      </svg>
                      <span>Имейл - {errors[CheckoutKeys.CHECKOUT_EMAIL]}</span>
                    </div>
                  )}
                  {/* Phone Field */}
                  <div className="mb-3 input-group input-group-icon">
                    <div className="input-group-text">
                      <div className="input-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="phoneGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "#6B7B8F", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#3C4B5B", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92C18.75 20.92 16.54 20.29 14.58 19.07C12.64 17.85 11.03 16.15 9.91 14.09C8.79 12.04 8.21 9.75 8.21 7.42C8.21 6.87 8.66 6.42 9.21 6.42H12.21C12.76 6.42 13.21 6.87 13.21 7.42C13.21 8.95 13.62 10.45 14.39 11.79C14.53 12.04 14.53 12.34 14.39 12.59L13.08 14.79C14.35 16.76 16.24 18.65 18.21 19.92L20.41 18.61C20.66 18.47 20.96 18.47 21.21 18.61C22.55 19.38 24.05 19.79 25.58 19.79C26.13 19.79 26.58 20.24 26.58 20.79V23.79C26.58 24.34 26.13 24.79 25.58 24.79C22.25 24.79 18.98 23.62 16.35 21.42C13.72 19.22 11.79 16.09 10.79 12.58"
                            stroke="url(#phoneGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="number"
                      id="phone"
                      name={CheckoutKeys.CHECKOUT_PHONE}
                      value={values[CheckoutKeys.CHECKOUT_PHONE]}
                      onChange={onChange}
                      placeholder="Въведете телефонен номер"
                      required
                      className="form-control"
                    />
                  </div>
                  {errors[CheckoutKeys.CHECKOUT_PHONE] && (
                    <div className="error-message animate-fade-in">
                      <svg className="error-icon" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"
                        />
                      </svg>
                      <span>
                        Телефонен номер - {errors[CheckoutKeys.CHECKOUT_PHONE]}
                      </span>
                    </div>
                  )}

                  {/* Comment Field */}
                  <div className="mb-3 input-group input-group-icon">
                    <div className="input-group-text">
                      <div className="input-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <defs>
                            <linearGradient
                              id="commentGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "#6B7B8F", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "#3C4B5B", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                            stroke="url(#commentGradient)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <textarea
                      rows={4}
                      type="text"
                      id="comment"
                      name={CheckoutKeys.CHECKOUT_COMMENT}
                      value={values[CheckoutKeys.CHECKOUT_COMMENT]}
                      onChange={onChange}
                      placeholder="Има ли нещо допълнително, което трябва да знаем за поръчката ви ?"
                      className="form-control"
                    />
                  </div>

                  {/* Next Step Button */}
                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleNextStep}
                    >
                      Следваща стъпка
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="step-content">
                <h2 className="form-title">Начин на плащане</h2>
                <div className="payment-method">
                  <button
                    className="payment-option"
                    onClick={() => setShowPaymentPopup(true)}
                  >
                    <span>
                      {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH"
                        ? "В брой"
                        : "С карта"}
                    </span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="prev-btn"
                    onClick={handlePreviousStep}
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    className="next-btn"
                    onClick={handleNextStep}
                  >
                    Напред
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Summary */}
            {currentStep === 3 && (
              <div className="step-content animate-slide-in">
                <div className="confirmation-card">
                  <div className="confirmation-header">
                    <svg className="checkmark" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                      />
                    </svg>
                    <h2 className="form-title">Потвърждение на поръчката</h2>
                    <p className="confirmation-subtitle">
                      Вашата поръчка е готова за изпращане
                    </p>
                  </div>

                  <div className="order-summary">
                    <div className="summary-grid">
                      <div className="summary-item">
                        <div className="summary-icon">
                          <svg viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <label>Име</label>
                          <p>{values[CheckoutKeys.CHECKOUT_NAME]}</p>
                        </div>
                      </div>

                      <div className="summary-item">
                        <div className="summary-icon">
                          <svg viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <label>E-Mail</label>
                          <p>{values[CheckoutKeys.CHECKOUT_EMAIL]}</p>
                        </div>
                      </div>

                      <div className="summary-item">
                        <div className="summary-icon">
                          <svg viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <label>Телефон</label>
                          <p>{values[CheckoutKeys.CHECKOUT_PHONE]}</p>
                        </div>
                      </div>

                      <div className="summary-item">
                        <div className="summary-icon">
                          <svg viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
                            />
                          </svg>
                        </div>
                        <div>
                          <label>Начин на плащане</label>
                          <p>
                            {values[CheckoutKeys.CHECKOUT_PAYMENT] === "CASH"
                              ? "В брой"
                              : "С карта"}
                          </p>
                        </div>
                      </div>

                      <div className="summary-item">
                        <div className="summary-icon">
                          <svg viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-2 16h-2v-2h2v2zm0-4h-2V8h2v6z"
                            />
                          </svg>
                        </div>
                        <div>
                          <label>Бележки</label>
                          <p
                            className={
                              !values[CheckoutKeys.CHECKOUT_COMMENT]
                                ? "text-muted"
                                : ""
                            }
                          >
                            {values[CheckoutKeys.CHECKOUT_COMMENT] ||
                              "Няма бележки"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handlePreviousStep}
                    >
                      Назад
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                      onClick={onSubmit}
                    >
                      Потвърди поръчката
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Payment Method Popup */}
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h3>Изберете начин на плащане</h3>
            </div>

            <div className="payment-options">
              <button
                className={`payment-btn ${
                  values.paymentMethod === "CASH" ? "active" : ""
                }`}
                onClick={() => handlePaymentSelect("CASH")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>В брой</span>
                {values.paymentMethod === "CASH" && (
                  <div className="checkmark">✓</div>
                )}
              </button>

              <button
                className={`payment-btn ${
                  values.paymentMethod === "CARD" ? "active" : ""
                }`}
                onClick={() => handlePaymentSelect("CARD")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span>С карта</span>
                {values.paymentMethod === "CARD" && (
                  <div className="checkmark">✓</div>
                )}
              </button>

              <button
                className="close-btn"
                onClick={() => setShowPaymentPopup(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Checkout = withObjectData(ShowCheckout);

export default Checkout;
