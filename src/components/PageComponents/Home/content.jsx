import LoadingAnimation from "../../Animations/Loading";
import HomeV2_FeaturedCategory from "./Styles/FeaturedCategory";
import HomeV2LastProducts from "./Styles/LastProducts";
import HomeV2_SCROLLSPY from "./Styles/ScrollSpyProducts";
const HomeContent = ({ objectData }) => {
  if (!objectData.objectInformation) {
    <LoadingAnimation />;
	return;
  }
 
  const landingPageSettings = objectData.MODULES.OBJECT_INFO.LANDING_PAGE_SETTINGS;
  const HOME_STYLE_MODES = {
	LATEST_PRODUCTS: <HomeV2LastProducts objectData={objectData}/>,
	SCROLL_SPY: <HomeV2LastProducts objectData={objectData}/>, // TEMPORARY DISABLED DUE TO BUGS <HomeV2_SCROLLSPY objectData={objectData}/>,
	default: <HomeV2LastProducts objectData={objectData}/>,
  SELECTED_CATEGORY: <HomeV2_FeaturedCategory objectData={objectData}/>,
  }

  const homeStyle = HOME_STYLE_MODES[landingPageSettings.PRESENTATION_LAYER_SETTINGS.PRESENTATION_MODE] || <HomeV2LastProducts/>
  return <>{homeStyle}</>;
};

const HomeV2 = HomeContent;

export default HomeV2;
