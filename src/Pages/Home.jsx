import DefaultBanner from "../components/Banners/default"
import DefaultSidebar from "../components/Sidebars/default"
import ShowAppMenu from "../components/AppMenus/defaultMenu"
import ScriptLoader from "../components/Scripts/Loader"
import { APP_PAGES } from "../utils/pageData"
import Header from "../components/Headers/default"
import HomeV2 from "../components/PageComponents/Home/content"


export default function Home(){
    return (
        <>
        <ScriptLoader page={APP_PAGES.HOME_PAGE}/>
        <Header/> 
        <DefaultSidebar/>
        <DefaultBanner/>
        <HomeV2/>
        <ShowAppMenu/>
        </>
    )
}
