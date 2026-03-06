import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import withObjectData from "../../../HOC/withObjectInfo";
import { do_action } from "../../../services/userServices";
import LoadingAnimation from "../../Animations/Loading";
import { getAppProperty, getEnv } from "../../../utils/appData";


const stripePromise = loadStripe(getAppProperty("STRIPE_PUBLIC_KEY"));

const StripePaymentForm = ({ amount, onSuccess, onError, onCancel, currency = 'eur' }) => {
  const stripe = useStripe();     
  const elements = useElements(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error: confirmError, paymentIntent: confirmedPayment } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
        },
        redirect: 'if_required',
      });

      if (confirmError) throw confirmError;

      if (confirmedPayment.status === 'succeeded') {
        onSuccess?.(confirmedPayment);
        do_action("payment_success", { amount, currency });
      } else if (confirmedPayment.status === 'requires_payment_method') {
        setError('Моля, опитайте с друга карта или метод на плащане');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Възникна грешка при плащането');
      onError?.(err);
      do_action("payment_failed", { error: err.message });
    } finally {
      setLoading(false);
    }
  };
  const styles = {
    container: {
      padding: '20px',
    },
    form: {
      maxWidth: '500px',
      margin: '0 auto',
    },
    error: {
      color: '#e53e3e',
      padding: '10px',
      marginBottom: '15px',
      background: '#fff5f5',
      borderRadius: '8px',
      fontSize: '14px',
    },
    amount: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#2d3748',
    },
    actions: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
    button: {
      flex: 1,
      padding: '12px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    payButton: {
      background: '#4299e1',
      color: 'white',
      border: 'none',
    },
    cancelButton: {
      background: 'white',
      color: '#4a5568',
      border: '1px solid #e2e8f0',
    },
    disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.amount}>
        Сума за плащане: {amount?.toFixed(2)} {currency.toUpperCase()}
      </div>
      
      {error && <div style={styles.error}>{error}</div>}

      <PaymentElement />

      <div style={styles.actions}>
        <button type="button" onClick={onCancel} style={{ ...styles.button, ...styles.cancelButton }}>
          Отказ
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          style={{ ...styles.button, ...styles.payButton, ...(!stripe || loading ? styles.disabled : {}) }}
        >
          {loading ? '⏳ Обработка...' : `Плати ${amount?.toFixed(2)} ${currency.toUpperCase()}`}
        </button>
      </div>
    </form>
  );
};

const StripePaymentWrapper = ({ amount, clientSecret, onSuccess, onError, onCancel, currency = 'eur' }) => {
  if (!clientSecret) {
    return <LoadingAnimation />;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#4299e1',
        colorBackground: '#ffffff',
        colorText: '#2d3748',
        colorDanger: '#e53e3e',
        fontFamily: "'Inter', system-ui, sans-serif",
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripePaymentForm   
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </Elements>
  );
};
export default withObjectData(StripePaymentWrapper);