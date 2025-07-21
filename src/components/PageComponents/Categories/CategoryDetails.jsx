import withObjectData from "../../../HOC/withObjectInfo"
import '../../Animations/Packages/slideInFromLeft.css';
import CategoryDetailsList from "./Styles/CategoryDetails/ListCategory";
import CategoryDetailsGrid from "./Styles/CategoryDetails/GridCategory";
import CategoryDetailsModern from "./Styles/CategoryDetails/Modern";
const ShowCategoryData = ({
    objectData
}) => {
    const CATEGORY_PAGE_DESIGN_LIST = {
		'list': <CategoryDetailsList/>,
		'grid' : <CategoryDetailsGrid/>,
		'modern' : <CategoryDetailsModern/>,
		'default': <CategoryDetailsList/>
	}
	const landingPageSettings = objectData.MODULES.OBJECT_INFO.LANDING_PAGE_SETTINGS;

	console.log(landingPageSettings.CATEGORY_SETTINGS.LAYOUT_STYLE);
    return (
		CATEGORY_PAGE_DESIGN_LIST[landingPageSettings.CATEGORY_SETTINGS.LAYOUT_STYLE]
    )
}


const CategoryDetails = withObjectData(ShowCategoryData);

export default CategoryDetails;
