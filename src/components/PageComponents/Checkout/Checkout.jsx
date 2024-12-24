import { useContext } from "react";
import withObjectData from "../../../HOC/withObjectInfo";
import useForm from "../../../hooks/useForm";
import "../../Styles/PaymentType.css";
import CartContext from "../../../contexts/CartCTX";
import { CheckoutKeys } from "../../../keys/formKeys";
import { Link } from "react-router-dom";
import '../../Styles/Checkout.css';
const ShowCheckout = ({objectData}) => {
    const {checkoutHandler} = useContext(CartContext);
    const {values,onChange, onSubmit,errors } = useForm(
        checkoutHandler, {
            [CheckoutKeys.CHECKOUT_NAME]: "",
            [CheckoutKeys.CHECKOUT_EMAIL]: "",
            [CheckoutKeys.CHECKOUT_PHONE]: "",
            [CheckoutKeys.CHECKOUT_PAYMENT]: "CASH",
            [CheckoutKeys.CHECKOUT_COMMENT]: "",
        }, {
            [CheckoutKeys.CHECKOUT_EMAIL]: (value) => {
                if (!value) {
                    return "Моля, въведете валиден E-Mail адрес !";
                }

                const customerEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                if (!customerEmailRegex.test(value)) {
                    return "Моля, въведете валиден E-Mail адрес !";
                }

                return "";
            },
            [CheckoutKeys.CHECKOUT_NAME]: (value) => {
                if (!value) {
                    return "Моля, въведете вашето име !";
                }
                return "";
            },
            [CheckoutKeys.CHECKOUT_PHONE]: (value) => {
                if (!value) {
                    return "Моля, въведете телефонен номер !";
                }
                return "";
            },

        }
    );
    return (
        <>
<header className="header">
    <div className="main-bar">
        <div className="container">
            <div className="header-content">
                <div className="left-content">
                    <Link to="/" className="back-btn">
                    <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                        <path
                            d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z">
                        </path>
                        <path
                            d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z">
                        </path>
                    </svg>
                    </Link>
                    <h5 className="title mb-0 text-nowrap">Финализиране на поръчка</h5>
                </div>
                <div className="mid-content">
                </div>
                <div className="right-content">
                </div>
            </div>
        </div>
    </div>
</header>
<section role="tabpanel" className="body current checkout" aria-hidden="false">
    <div className="col-12">
        <div className="card">
            <div className="card-header">
                <h5 className="card-title">Въведете детайли</h5>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><i className="fa fa-user"></i></span>
                        <input type="text" className="form-control" onChange={onChange}
                            name={CheckoutKeys.CHECKOUT_NAME} placeholder="Вашето име" required
                            value={values[CheckoutKeys.CHECKOUT_NAME]} />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><i className="fa fa-at"></i></span>
                        <input type="email" className="form-control" placeholder="Вашият E-Mail" onChange={onChange}
                            name={CheckoutKeys.CHECKOUT_EMAIL} required value={values[CheckoutKeys.CHECKOUT_EMAIL]} />
                    </div>
                    <div className="mb-3 input-group">
                        <span className="input-group-text"><i className="fa-solid fa-phone"></i></span>
                        <input type="number" className="form-control" placeholder="Телефонен номер" onChange={onChange}
                            name={CheckoutKeys.CHECKOUT_PHONE} value={values[CheckoutKeys.CHECKOUT_PHONE]} />
                    </div>
                    <div className="mb-3 input-group">
                        <div className="payment-type">
                            <label className="payment-type-label" htmlFor="paymentType">Начин на плащане</label>
                            <div className="payment-type-select">
                                <select id="paymentType" onChange={onChange} name={CheckoutKeys.CHECKOUT_PAYMENT}
                                    required>
                                    <option value="CASH">В брой</option>
                                    <option value="CARD">С карта</option>
                                </select>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>

                    </div>
                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="Бележки към поръчката ..." rows="4"
                            name={CheckoutKeys.CHECKOUT_COMMENT} onChange={onChange}
                            value={values[CheckoutKeys.CHECKOUT_COMMENT]}></textarea>
                    </div>
                    <div className="footer fixed ">
                        <div className="container">
                            <div className="footer-btn d-flex align-items-center"><button
                                    className="btn btn-primary flex-1" type="submit">ПОРЪЧАЙ</button>
                            </div>
                        </div>
                    </div>
                </form>
                {Object.keys(errors)
                .filter((fieldName) => errors[fieldName])
                .map((fieldName, index) => (
                <div key={index} className="alert alert-danger light alert-dismissible fade show" role="alert">
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"
                        strokeLinecap="round" strokeLinejoin="round" className="me-2">
                        <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2">
                        </polygon>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <strong>Грешка!</strong> {errors[fieldName]}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                ))}

            </div>
        </div>
    </div>
</section>

        </>
    )
}


const Checkout = withObjectData(ShowCheckout);

export default Checkout;