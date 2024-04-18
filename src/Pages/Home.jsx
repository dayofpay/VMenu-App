import DefaultBanner from "../components/Banners/default"
import DefaultHeader from "../components/Headers/default"
import DefaultSidebar from "../components/Sidebars/default"
import HomeContent from "../components/PageComponents/Home/content"
import ShowAppMenu from "../components/AppMenus/defaultMenu"
import ScriptLoader from "../components/Scripts/Loader"
import { APP_PAGES } from "../utils/pageData"


export default function Home(){
    return (
        <>
        <ScriptLoader page={APP_PAGES.HOME_PAGE}/>
        <DefaultHeader/>
        <DefaultSidebar/>
        <DefaultBanner/>
        <HomeContent/>
        <ShowAppMenu/>
        </>
    )
}
