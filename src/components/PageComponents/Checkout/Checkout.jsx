import withObjectData from "../../../HOC/withObjectInfo";
import "../../Styles/PaymentType.css";
const ShowCheckout = ({objectData}) => {

    return (
        <>
<header class="header">
    <div class="main-bar">
        <div class="container">
            <div class="header-content">
                <div class="left-content">
                    <a href="javascript:void(0);" class="back-btn">
                        <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                            <path
                                d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z">
                            </path>
                            <path
                                d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z">
                            </path>
                        </svg>
                    </a>
                    <h5 class="title mb-0 text-nowrap">Checkout</h5>
                </div>
                <div class="mid-content">
                </div>
                <div class="right-content">
                </div>
            </div>
        </div>
    </div>
</header>
<section role="tabpanel" class="body current" aria-hidden="false">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Въведете детайли</h5>
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class="fa fa-user"></i></span>
                        <input type="text" class="form-control" placeholder="Вашето име" />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class="fa fa-at"></i></span>
                        <input type="email" class="form-control" placeholder="Вашият E-Mail" />
                    </div>
                    <div class="mb-3 input-group">
                        <span class="input-group-text"><i class="fa-solid fa-phone"></i></span>
                        <input type="number" class="form-control" placeholder="Телефонен номер" />
                    </div>
                    <div class="mb-3 input-group">
                        <div class="payment-type">
                            <label class="payment-type-label" for="paymentType">Начин на плащане</label>
                            <div class="payment-type-select">
                                <select id="paymentType" name="paymentType">
                                    <option value="CASH">В брой</option>
                                </select>
                                <i class="fas fa-chevron-down"></i>
                            </div>
                        </div>

                    </div>
                    <div class="input-group mb-3">
                        <textarea class="form-control" placeholder="Бележки към поръчката ..." rows="4"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<div class="footer fixed ">
    <div class="container">
        <div class="footer-btn d-flex align-items-center"><a class="btn btn-primary flex-1" href="/checkout">ПОРЪЧАЙ</a>
        </div>
    </div>
</div>

        </>
    )
}


const Checkout = withObjectData(ShowCheckout);

export default Checkout;