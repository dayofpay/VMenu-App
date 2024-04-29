import withObjectData from "../../HOC/withObjectInfo"
import LoadingAnimation from "../Animations/Loading";

const PWAFooter = ({objectData}) => {

    if(!objectData.objectInformation){
        return <LoadingAnimation/>
    }
    return (
        <>
		<div className="offcanvas offcanvas-bottom pwa-offcanvas">
			<div className="container">
				<div className="offcanvas-body small">
					<img className="logo" src={`http://localhost:3300/uploads/${objectData.objectInformation.object_image}`} alt={`${objectData.objectInformation.object_name}`}/>
					<h6 className="title font-w600">Добавете "{objectData.objectInformation.object_name}" като приложения на началният ви екран</h6>
					<p className="pwa-text">Ако желаете да инсталирате нашето приложения, без да се налага да сканирате QR Кода на текущата маса, можете да инсталирате апликацията на вашето устройство дирекнто от бутона по-долу !</p>
                    <small>* Важно: Сесията ще бъде активна само за масата на която се намирате в момента (Маса №{localStorage.getItem('tableId')})</small>
					<button type="button" className="btn btn-sm btn-primary pwa-btn">Добави</button>
					<button type="button" className="btn btn-sm pwa-close btn-secondary ms-2 text-white">Може би по-късно</button>
				</div>
			</div>
		</div>
		<div className="offcanvas-backdrop pwa-backdrop"></div>
        </>
    )
}



export default PWAFooter;
