import { Link } from "react-router-dom";
import withObjectData from "../../../HOC/withObjectInfo";

const ShowFinalPage = ({objectData}) => {
    return (
<div class="page-content">

		<div class="payment-confirm-wrapper">
			<div class="payment-box">
				<i class="fa-solid fa-check mb-4"></i>
				<h5 class="text-white">Успешно заявена поръчка!</h5>	
				<p>Вашата поръчка беше успешно създадена. Моля, очаквайте, докато нашият екип я обработи и подготви за вас. </p>
				<Link to="/" class="delivery-btn mx-auto">Връщане обратно
					<span class="next ms-auto">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8.25005 20.25C8.05823 20.25 7.86623 20.1767 7.7198 20.0303C7.42673 19.7372 7.42673 19.2626 7.7198 18.9698L14.6895 12L7.7198 5.03025C7.42673 4.73719 7.42673 4.26263 7.7198 3.96975C8.01286 3.67688 8.48742 3.67669 8.7803 3.96975L16.2803 11.4698C16.5734 11.7628 16.5734 12.2374 16.2803 12.5303L8.7803 20.0303C8.63386 20.1767 8.44186 20.25 8.25005 20.25Z" fill="#fff"></path>
						</svg>
					</span>
				</Link>
			</div>
		</div>

	</div>
    )
}

const FinalCheckoutPage = withObjectData(ShowFinalPage);

export default FinalCheckoutPage;