import withObjectData from "../../../HOC/withObjectInfo";
import '../../Styles/ProductQuantity.css';
import { useEffect, useState } from "react";
import { decrementCartQuantity, incrementCartQuantity, removeCartItem } from "../../../handlers/CartQuantityHR";
import { ProductDetailsKeys } from "../../../keys/formKeys";
import LoadingAnimation from "../../Animations/Loading";
import usePersistedState from "../../../hooks/usePersistedState";
import { Link } from "react-router-dom";

const ShowCart = ({ objectData }) => {
    const [cart, setCart] = usePersistedState('cart', []);
    const [cartPrototype, setCartPrototype] = useState([]);

    useEffect(() => {
        const getProductData = async () => {
            const filteredProducts = await Promise.all(
                cart.map(async (product) => {
                    return objectData.products.find((item) => item.item_id === product?.productId);
                })
            );
            return filteredProducts;
        };

        getProductData().then((filteredProducts) => {
            setCartPrototype(filteredProducts);
        });
    }, [cart, objectData]);

    const handleDecrement = (productId) => {
        decrementCartQuantity(productId);
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId && item.productQuantity > 1
                    ? { ...item, productQuantity: item.productQuantity - 1 }
                    : item
            )
        );
    };

    const handleIncrement = (productId) => {
        incrementCartQuantity(productId);
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId
                    ? { ...item, productQuantity: item.productQuantity + 1 }
                    : item
            )
        );
    };

    const handleRemove = (productId) => {
        removeCartItem(productId);
        console.log('removed', productId);
        setCart((prevCart) =>
            prevCart.filter((item) => item.productId !== productId)
        );
    };
    

    if (!objectData) {
        return <LoadingAnimation />;
    }

    return (
        <>
<header className="header">
		<div className="main-bar">
			<div className="container">
				<div className="header-content">
					<div className="left-content">
						<Link to="/" className="back-btn">
							<svg height="512" viewBox="0 0 486.65 486.65" width="512"><path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z"/><path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z"/>
							</svg>
						</Link>
						<h5 className="title mb-0 text-nowrap">Количка</h5>
					</div>
					<div className="mid-content">
					</div>
					<div className="right-content">
					</div>
				</div>
			</div>
		</div>
	</header>

	<div className="page-content">
        <div className="container bottom-content shop-cart-wrapper"> 
        <div className="item-list style-2">
                <ul>
                    {cartPrototype.map((product, index) => (
                        <li key={index}>
                            <div className="item-content">
                                <div className="item-media media media-60">
                                    <img src={`http://localhost:3300/uploads/${JSON.parse(product?.item_images)[0]}`} alt="logo" />
                                </div>
                                <div className="item-inner">
                                    <div className="item-title-row">
                                        <h5 className="item-title sub-title"><a href="product-detail.html">{product?.item_name}</a></h5>
                                        <div className="item-subtitle text-soft">{product?.category_names[0]}</div>
                                    </div>
                                    <div className="item-footer">
                                        <div className="d-flex align-items-center">
                                            {product?.has_discount ? (
                                                <>
                                                    <h6 className="me-2">BGN {(product?.item_price - (product?.discount_percentage *
                                                        product?.item_price) / 100).toFixed(2)}</h6>
                                                    <del className="off-text"><h6>BGN {Number(product?.item_price).toFixed(2)}</h6></del>
                                                </>
                                            ) : (
                                                <><h6>BGN {Number(product?.item_price).toFixed(2)}</h6></>
                                            )}
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <div className="product-quantity">
                                                <button type="button" className="quantity-btn" onClick={() => handleDecrement(product?.item_id)}>-</button>
                                                <input
                                                    type="text"
                                                    name={ProductDetailsKeys.PRODUCT_QUANTITY}
                                                    className="quantity-input"
                                                    value={cart[index]?.productQuantity}
                                                    readOnly
                                                />
                                                <button type="button" className="quantity-btn" onClick={() => handleIncrement(product?.item_id)}>+</button>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
    <i className="fa fa-trash" style={{color:'red',marginLeft:'2em'}} onClick={() => handleRemove(product?.item_id)}></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
		<div className="footer fixed ">
			<div className="container">
				<div className="view-title mb-2">
					<ul>
						<li>
							<span className="text-soft">Subtotal</span>
							<span className="text-soft">$54.76</span>
						</li>
						<li>
							<span className="text-soft">TAX (2%)</span>
							<span className="text-soft">-$1.08</span>
						</li>
						<li>
							<h5>Total</h5>
							<h5>$53.68</h5>
						</li>
						<li>
							<a href="#" className="promo-bx">
								Apply Promotion Code
								<span>2 Promos</span>
							</a>
						</li>
					</ul>
				</div>
				<div className="footer-btn d-flex align-items-center">
					<a href="checkout.html" className="btn btn-primary flex-1">CHECKOUT</a>
				</div>
			</div>
		</div>		
    </div>

        </>
    )
}


const Cart = withObjectData(ShowCart);

export default Cart;