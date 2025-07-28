import { Link } from "react-router-dom";
import ShowAppMenu from "../AppMenus/defaultMenu";
import withObjectData from "../../HOC/withObjectInfo";
import { getEnv } from "../../utils/appData";
import { useEffect, useState } from "react";
import { do_action } from "../../services/userServices";
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';


ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  ArcElement, 
  Tooltip, 
  Legend
);

const ReviewPage = ({ objectData }) => {
const BarChartComponent = ({ data, options }) => {
  return <Chart type='bar' data={data} options={options} />;
};

const PieChartComponent = ({ data }) => {
  return <Chart type='pie' data={data} />;
};
    const [rating, setRating] = useState(0);
    const [staffRating, setStaffRating] = useState(0);
    const [foodRating, setFoodRating] = useState(0);
    const [ambienceRating, setAmbienceRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        do_action("visit_page", { page_name: "Ревю" });
        

        const mockReviews = [
            { id: 1, user: "Иван П.", rating: 5, comment: "Отлично обслужване и вкусна храна!", date: "2023-05-15" },
            { id: 2, user: "Мария К.", rating: 4, comment: "Добро място, но може да се подобри музиката", date: "2023-05-10" },
            { id: 3, user: "Георги Д.", rating: 3, comment: "Средна храна, персоналът беше учтив", date: "2023-05-05" }
        ];
        setReviews(mockReviews);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newReview = {
                id: reviews.length + 1,
                user: "Вие",
                rating,
                comment,
                date: new Date().toISOString().split('T')[0],
                details: {
                    staff: staffRating,
                    food: foodRating,
                    ambience: ambienceRating
                }
            };
            
            setReviews([newReview, ...reviews]);
            setSubmitSuccess(true);
            resetForm();
            

            // await api.post('/reviews', { 
            //     restaurantId: objectData.objectInformation.object_id,
            //     rating, staffRating, foodRating, ambienceRating, comment 
            // });
            
        } catch (error) {
            console.error("Грешка при изпращане на ревюто:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setRating(0);
        setStaffRating(0);
        setFoodRating(0);
        setAmbienceRating(0);
        setComment("");
        setTimeout(() => setSubmitSuccess(false), 3000);
    };

    const renderStars = (count, setter) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                        key={star} 
                        className={star <= count ? "star-filled" : "star-empty"}
                        onClick={() => setter(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    // Prepare data for charts
    const ratingsData = {
        labels: ['Персонал', 'Храна', 'Атмосфера'],
        datasets: [
            {
                label: 'Средна оценка',
                data: [
                    calculateAverage(reviews, 'staff'),
                    calculateAverage(reviews, 'food'),
                    calculateAverage(reviews, 'ambience')
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    };

    const ratingDistribution = {
        labels: ['1 звезда', '2 звезди', '3 звезди', '4 звезди', '5 звезди'],
        datasets: [
            {
                data: countRatings(reviews),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)'
                ],
                borderWidth: 1
            }
        ]
    };

    function calculateAverage(reviews, category) {
        const validReviews = reviews.filter(r => r.details && r.details[category]);
        if (validReviews.length === 0) return 0;
        const sum = validReviews.reduce((acc, curr) => acc + curr.details[category], 0);
        return (sum / validReviews.length).toFixed(1);
    }

    function countRatings(reviews) {
        const counts = [0, 0, 0, 0, 0];
        reviews.forEach(review => {
            if (review.rating >= 1 && review.rating <= 5) {
                counts[review.rating - 1]++;
            }
        });
        return counts;
    }

    if (!objectData) {
        return <LoadingAnimation />;
    }

    return (
        <div className="page-wraper">
            <header className="header">
                <div className="main-bar">
                    <div className="container">
                        <div className="header-content">
                            <div className="left-content">
                                <Link to="/" className="back-btn">
                                    <svg height="512" viewBox="0 0 486.65 486.65" width="512">
                                        <path d="m202.114 444.648c-8.01-.114-15.65-3.388-21.257-9.11l-171.875-171.572c-11.907-11.81-11.986-31.037-.176-42.945.058-.059.117-.118.176-.176l171.876-171.571c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504l-150.315 150.315 151.833 150.315c11.774 11.844 11.774 30.973 0 42.817-6.045 6.184-14.439 9.498-23.079 9.11z"></path>
                                        <path d="m456.283 272.773h-425.133c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z"></path>
                                    </svg>
                                </Link>
                                <h5 className="title mb-0 text-nowrap">Ревюта</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="dark-overlay"></div>

            <div className="page-content bottom-content">
                <div className="container profile-area">
                    <div className="profile">
                        <div className="d-flex align-items-center mb-3">
                            <div className="media media-70 me-3">
                                <img src={getEnv() + "/uploads/" + objectData.objectInformation.object_image} alt="Ресторант" />
                            </div>
                            <div className="about-profile">
                                <h5 className="sub-title mb-0">{objectData.objectInformation.object_name}</h5>
                                <h6 className="sub-title fade-text mb-0 font-w500">
                                    Среден рейтинг: {reviews.length > 0 ? 
                                        (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : 
                                        "Няма оценки"}
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="card-title">Статистика</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Средни оценки по категории</h6>
                                    <BarChartComponent
                                        data={ratingsData}
                                        options={{
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    max: 5,
                                                    ticks: {
                                                        stepSize: 1
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <h6>Разпределение на оценките</h6>
                                    <PieChartComponent data={ratingDistribution} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="card-title">Напишете вашето ревю</h5>
                        </div>
                        <div className="card-body">
                            {submitSuccess && (
                                <div className="alert alert-success">
                                    Благодарим ви за вашето ревю! То беше изпратено успешно.
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Обща оценка:</label>
                                    {renderStars(rating, setRating)}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Обслужване от персонала:</label>
                                    {renderStars(staffRating, setStaffRating)}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Качество на храната:</label>
                                    {renderStars(foodRating, setFoodRating)}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Атмосфера:</label>
                                    {renderStars(ambienceRating, setAmbienceRating)}
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Вашето мнение (по избор):</label>
                                    <textarea 
                                        className="form-control" 
                                        rows="3"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Споделете вашето преживяване..."
                                    ></textarea>
                                </div>
                                
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={isSubmitting || rating === 0}
                                >
                                    {isSubmitting ? "Изпращане..." : "Изпрати ревю"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Последни ревюта</h5>
                        </div>
                        <div className="card-body">
                            {reviews.length === 0 ? (
                                <div className="alert alert-info">Все още няма ревюта за този ресторант.</div>
                            ) : (
                                <div className="review-list">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-item mb-3 p-3 border rounded">
                                            <div className="d-flex justify-content-between mb-2">
                                                <strong>{review.user}</strong>
                                                <span className="text-muted">{review.date}</span>
                                            </div>
                                            <div className="star-rating mb-2">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <span 
                                                        key={star} 
                                                        className={star <= review.rating ? "star-filled" : "star-empty"}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            {review.details && (
                                                <div className="mb-2 small">
                                                    <span className="me-3">Персонал: {review.details.staff}/5</span>
                                                    <span className="me-3">Храна: {review.details.food}/5</span>
                                                    <span>Атмосфера: {review.details.ambience}/5</span>
                                                </div>
                                            )}
                                            {review.comment && <p className="mb-0">{review.comment}</p>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ShowAppMenu />

            <style jsx>{`
                .star-rating {
                    font-size: 24px;
                    line-height: 1;
                }
                .star-filled {
                    color: #ffc107;
                    cursor: pointer;
                }
                .star-empty {
                    color: #e4e5e9;
                    cursor: pointer;
                }
                .review-item {
                    background-color: #f8f9fa;
                }
                .chart-container {
                    position: relative;
                    height: 300px;
                }
            `}</style>
        </div>
    );
};

const ReviewPageWithData = withObjectData(ReviewPage);
export default ReviewPageWithData;