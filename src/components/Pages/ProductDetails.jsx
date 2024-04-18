import ProductDetails from "../PageComponents/Products";
import ScriptLoader from "../Scripts/Loader";
import { APP_PAGES } from "../../utils/pageData";
export default function ShowProductDetails () {
    return (
        <>
            <ScriptLoader page={APP_PAGES.PRODUCT_DETAILS_PAGE}/>
            <ProductDetails/>
        </>
    )
}