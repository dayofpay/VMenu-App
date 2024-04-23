import DefaultBanner from "../components/Banners/default"
import DefaultSidebar from "../components/Sidebars/default"
import ShowAppMenu from "../components/AppMenus/defaultMenu"
import ScriptLoader from "../components/Scripts/Loader"
import { APP_PAGES } from "../utils/pageData"
import Header from "../components/Headers/default"
import HomeV2 from "../components/PageComponents/Home/content"
import withObjectData from "../HOC/withObjectInfo"
import LoadingAnimation from "../components/Animations/Loading"


function ShowHome({objectData}){
    if(!objectData.objectInformation){
        return <LoadingAnimation/>
    }
    return (
        <>
        <ScriptLoader page={APP_PAGES.HOME_PAGE}/>
        <Header objectData={objectData}/> 
        <DefaultSidebar objectData={objectData}/>
        <DefaultBanner objectData={objectData}/>
        <HomeV2 objectData={objectData}/>
        <ShowAppMenu objectData={objectData}/>
        </>
    )
}

const Home = withObjectData(ShowHome);

export default Home;