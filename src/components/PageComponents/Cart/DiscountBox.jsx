import  { useState, useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { getEnv } from "../../../utils/appData";
import { formatPrice } from "../../../utils/pricingUtils";
import "./DiscountBox.scss";
import { do_action } from "../../../services/userServices";
import { triggerVibration } from "../../../utils/vibrationApi";
import { getMenuLanguage } from "../../../services/appServices";
/**
 * The DiscountBox component.
 * @param {object} props - The props passed to the component.
 * @param {array} props.cart - The cart items.
 * @param {array} props.cartPrototype - The cart prototype.
 * @param {object} props.objectData - The object data.
 * @param {function} props.setCartPrototype - The setCartPrototype function.
 * @param {function} props.setDiscountPrice - The setDiscountPrice function.
 * @param {function} props.setAppliedDiscount - The setAppliedDiscount function.
 * @param {object} props.appliedDiscount - The applied discount.
 * @param {array} props.selectedAddons - The selected addons.
 * @returns {JSX.Element} The JSX element representing the component.
 */
export default function DiscountBox({
  cart,
  cartPrototype,
  objectData,
  setCartPrototype,
  setDiscountPrice,
  setAppliedDiscount,
  appliedDiscount,
  selectedAddons = []
}) {
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("info");
  const [isExpanded, setIsExpanded] = useState(false);
  const lastAppliedSignature = useRef(null);
  const menuLanguage = getMenuLanguage();

  useEffect(() => {
    if (cart.length === 0 && appliedDiscount) {
      handleRemoveDiscount();
    }
  }, [cart]);

  const getSelectedAddons = () => {
    if (selectedAddons?.length) {
      return selectedAddons;
    }

    return JSON.parse(localStorage.getItem("selectedAddons") || "[]");
  };

  const getDiscountSignature = (code) => {
    const addons = getSelectedAddons().map((addon) => ({
      addon_id: addon.addons?.addon_id,
      item_id: addon.item_id,
      quantity: addon.addons?.addon_quantity,
      price: addon.addons?.addon_price
    }));

    return JSON.stringify({
      code,
      cart: (cart || []).map((item) => ({
        productId: item.productId,
        quantity: item.productQuantity
      })),
      addons
    });
  };

  const buildCartItems = () => {
    const item_addons = getSelectedAddons();

    return (cart || []).map((item) => {
      const product = (cartPrototype || []).find(
        (p) => p?.item_id === item.productId
      );

      const productAddons = item_addons.filter(addon => addon.item_id === item.productId);
      const addonsTotalPrice = productAddons.reduce((sum, addon) =>
        sum + (addon.addons.addon_price * addon.addons.addon_quantity), 0);

      return {
        productId: item.productId,
        quantity: item.productQuantity,
        price: product?.item_price || 0,
        category_id: product?.category_id || null,
        name: product?.item_name || "",
        addons_total_price: addonsTotalPrice
      };
    });
  };

  const applyDiscountToCart = async (code, { validate = false, silent = false } = {}) => {
    const normalizedCode = code.trim();
    const item_addons = getSelectedAddons();
    const cartItems = buildCartItems();
    let discountInfo = appliedDiscount;

    if (validate) {
      // 1. Validate the code before applying it for the first time.
      const validateRes = await fetch(getEnv() + "/api/discounts/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discount_code: normalizedCode,
          object_id: objectData.objectInformation.object_id,
          customer_email: "",
          customer_phone: ""
        }),
      });

      const validateData = await validateRes.json();

      if (!validateData.success) {
        const errorKey = validateData.error_code || "Invalid_Code";
        const localizedMessage =
          menuLanguage.Discount_Box.Response_List.Error_List[errorKey] ||
          menuLanguage.Discount_Box.Response_List.Invalid_Code;

        return { success: false, variant: "error", message: localizedMessage };
      }

      discountInfo = validateData.discount;
    }

    // 2. Apply or re-apply the discount to the current cart state.
    const applyRes = await fetch(getEnv() + "/api/discounts/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discount_code: normalizedCode,
        cart_items: cartItems,
        object_id: objectData.objectInformation.object_id,
        item_addons: item_addons
      }),
    });

    const applyData = await applyRes.json();

    if (!applyData.success) {
      const errorKey = applyData.error_code || "Apply_Error";
      const localizedMessage =
        menuLanguage.Discount_Box.Response_List.Error_List[errorKey] ||
        menuLanguage.Discount_Box.Response_List.Apply_Error;

      return { success: false, variant: "error", message: localizedMessage };
    }

    if (applyData.discountAmount === null || applyData.discountAmount === undefined) {
      return {
        success: false,
        variant: "warning",
        message: menuLanguage.Discount_Box.Response_List.No_Discount_Applied
      };
    }

    const newCart = applyData.cartItems || [];
    const discountAmount = applyData.discountAmount || 0;

    const updatedCartPrototype = cartPrototype.map(item => {
      if (!item) {
        return item;
      }

      const discountedItem = newCart.find(di => di.productId === item.item_id);
      if (discountedItem) {
        return {
          ...item,
          final_price: discountedItem.final_price,
          discount_amount: discountedItem.discount_amount,
          has_existing_discount: discountedItem.discount_amount > 0,
          addons_discount_amount: discountedItem.addons_discount_amount || 0,
          final_addons_price: discountedItem.final_addons_price || 0,
          discount_description: discountedItem.discount_description,
          is_discounted: discountedItem.is_discounted
        };
      }
      return item;
    });

    const nextAppliedDiscount = {
      code: normalizedCode,
      amount: discountAmount,
      type: discountInfo?.type,
      value: discountInfo?.value,
      description: discountInfo?.description
    };

    lastAppliedSignature.current = getDiscountSignature(normalizedCode);
    setCartPrototype(updatedCartPrototype);
    setDiscountPrice(discountAmount);
    setAppliedDiscount(nextAppliedDiscount);

    return {
      success: true,
      discountAmount,
      discountInfo,
      message: silent ? null :
        `✅ ${discountInfo?.description || menuLanguage.Discount_Box.Response_List.Success} 
        (-${formatPrice(discountAmount, objectData.objectInformation.object_currency, false)})`
    };
  };

  useEffect(() => {
    if (!appliedDiscount?.code || cart.length === 0 || cartPrototype.length === 0) {
      return;
    }

    const signature = getDiscountSignature(appliedDiscount.code);
    if (signature === lastAppliedSignature.current) {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const result = await applyDiscountToCart(appliedDiscount.code, { silent: true });
        if (!result.success) {
          setVariant(result.variant);
          setMessage(result.message);
        }
      } catch (err) {
        console.error("Discount refresh error:", err);
        setVariant("error");
        setMessage(menuLanguage.Discount_Box.Response_List.General_Error);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [cart, cartPrototype, selectedAddons, appliedDiscount?.code]);

  /**
   * Handles the apply discount action.
   * @returns {void}
   */
  const handleApplyDiscount = async () => {
    triggerVibration();
    if (!discountCode.trim()) return;
    setLoading(true);
    setMessage(null);

    try {
      do_action("add_discount_code", { discount_code: discountCode.trim() });
      const result = await applyDiscountToCart(discountCode, { validate: true });

      if (!result.success) {
        setVariant(result.variant);
        setMessage(result.message);
        return;
      }

      setVariant("success");
      setMessage(result.message);
      setIsExpanded(false);

    } catch (err) {
      console.error("Discount error:", err);
      setVariant("error");
      setMessage(menuLanguage.Discount_Box.Response_List.General_Error);

    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the remove discount action.
   * @returns {void}
   */
  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setMessage(null);
    setAppliedDiscount(null);
    

    const originalCartPrototype = cartPrototype.map(item => {
      if (!item) {
        return item;
      }

      return {
        ...item,
        final_price: item.item_price,
        discount_amount: 0,
        has_existing_discount: false,
        addons_discount_amount: 0,
        final_addons_price: 0
      };
    });
    
    setCartPrototype(originalCartPrototype);
    setDiscountPrice(0);
  };

  return (
    <div className="discount-box-ios">
      {appliedDiscount ? (
        <div className="applied-discount-card">
          <div className="discount-header">
            <div className="discount-icon">
              <i className="fas fa-tag"></i>
            </div>
            <div className="discount-info">
              <div className="discount-title">{menuLanguage.Discount_Box.Applied_Discount}</div>
              <div className="discount-code">{appliedDiscount.code}</div>
              <div className="discount-description">{appliedDiscount.description}</div>
            </div>
            <div className="discount-amount">
              -{formatPrice(appliedDiscount.amount, objectData.objectInformation.object_currency, false)}
            </div>
            <button 
              className="remove-discount-btn"
              onClick={handleRemoveDiscount}
              aria-label="Премахни отстъпка"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isExpanded ? (
            <div 
              className="discount-collapsed"
              onClick={() => setIsExpanded(true)}
            >
              <div className="discount-icon">
                <i className="fas fa-tag"></i>
              </div>
              <div className="discount-text">{menuLanguage.Discount_Box.Text}</div>
              <div className="discount-chevron">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          ) : (
            <div className="discount-expanded">
              <div className="discount-input-group">
                <div className="input-with-icon">
                  <i className="fas fa-tag"></i>
                  <input
                    type="text"
                    placeholder={menuLanguage.Discount_Box.Placeholder}
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="discount-input"
                    autoFocus
                  />
                </div>
                <button
                  className="apply-discount-btn"
                  onClick={handleApplyDiscount}
                  disabled={loading || cart.length === 0 || !discountCode}
                >
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" />
                  ) : (
                    `${menuLanguage.Discount_Box.Apply_Button}`
                  )}
                </button>
              </div>
              <button 
                className="close-expanded-btn"
                onClick={() => setIsExpanded(false)}
                aria-label="Затвори"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          {message && (
            <div className={`discount-message discount-message-${variant}`}>
              <div className="message-icon">
                {variant === "success" ? (
                  <i className="fas fa-check-circle"></i>
                ) : variant === "error" ? (
                  <i className="fas fa-exclamation-circle"></i>
                ) : (
                  <i className="fas fa-info-circle"></i>
                )}
              </div>
              <div className="message-text">{message}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
