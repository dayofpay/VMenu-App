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
import { FiArrowLeft, FiStar, FiSend } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUtensils, FaUserFriends, FaLightbulb } from "react-icons/fa";

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
    return (
      <div className="chart-container" style={{ height: '250px' }}>
        <Chart type='bar' data={data} options={options} />
      </div>
    );
  };

  const PieChartComponent = ({ data }) => {
    return (
      <div className="chart-container" style={{ height: '250px' }}>
        <Chart type='pie' data={data} />
      </div>
    );
  };

  const [rating, setRating] = useState(0);
  const [staffRating, setStaffRating] = useState(0);
  const [foodRating, setFoodRating] = useState(0);
  const [ambienceRating, setAmbienceRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    do_action("visit_page", { page_name: "Ревю" });
    
    const mockReviews = [
      { 
        id: 1, 
        user: "Иван П.", 
        rating: 5, 
        comment: "Отлично обслужване и вкусна храна! Поръчката пристигна супер бързо и топла.", 
        date: "2023-05-15",
        details: {
          staff: 5,
          food: 5,
          ambience: 4
        }
      },
      { 
        id: 2, 
        user: "Мария К.", 
        rating: 4, 
        comment: "Добро място, храната беше вкусна, но малко късно пристигна.", 
        date: "2023-05-10",
        details: {
          staff: 4,
          food: 4,
          ambience: 3
        }
      },
      { 
        id: 3, 
        user: "Георги Д.", 
        rating: 3, 
        comment: "Средна храна, доставчикът беше учтив, но липсваше част от поръчката.", 
        date: "2023-05-05",
        details: {
          staff: 4,
          food: 2,
          ambience: 3
        }
      }
    ];
    setReviews(mockReviews);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
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

  const renderStars = (count, setter, interactive = true) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            className={star <= count ? "star-filled" : "star-empty"}
            onClick={() => interactive && setter(star)}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
          >
            {star <= count ? <FaStar /> : <FaRegStar />}
          </span>
        ))}
      </div>
    );
  };

  const calculateAverage = (reviews, category) => {
    const validReviews = reviews.filter(r => r.details && r.details[category]);
    if (validReviews.length === 0) return 0;
    const sum = validReviews.reduce((acc, curr) => acc + curr.details[category], 0);
    return (sum / validReviews.length).toFixed(1);
  };

  const countRatings = (reviews) => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[review.rating - 1]++;
      }
    });
    return counts;
  };

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(activeTab));

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
          'rgba(74, 144, 226, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderColor: [
          'rgba(74, 144, 226, 1)',
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

  if (!objectData) {
    return <LoadingAnimation />;
  }

  return (
    <div className="page-wraper delivery-review-page">
      <header className="delivery-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="back-btn">
              <FiArrowLeft size={24} />
            </Link>
            <h5 className="title mb-0">Ревюта</h5>
          </div>
        </div>
      </header>

      <div className="page-content">
        <div className="container">
          {/* Restaurant Info Card */}
          <div className="restaurant-card">
            <div className="restaurant-image">
              <img src={getEnv() + "/uploads/" + objectData.objectInformation.object_image} alt="Ресторант" />
            </div>
            <div className="restaurant-info">
              <h3>{objectData.objectInformation.object_name}</h3>
              <div className="rating-overview">
                <div className="average-rating">
                  {reviews.length > 0 ? 
                    (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) : 
                    "0.0"}
                </div>
                <div className="stars">
                  {renderStars(Math.round(reviews.length > 0 ? 
                    (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length) : 0), 
                    () => {}, false)}
                </div>
                <div className="review-count">{reviews.length} ревюта</div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-card">
              <div className="stat-item">
                <div className="stat-icon">
                  <FaUserFriends />
                </div>
                <div className="stat-value">{calculateAverage(reviews, 'staff')}</div>
                <div className="stat-label">Обслужване</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FaUtensils />
                </div>
                <div className="stat-value">{calculateAverage(reviews, 'food')}</div>
                <div className="stat-label">Храна</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <FaLightbulb />
                </div>
                <div className="stat-value">{calculateAverage(reviews, 'ambience')}</div>
                <div className="stat-label">Атмосфера</div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="charts-section">
            <div className="chart-card">
              <h4>Средни оценки по категории</h4>
              <BarChartComponent
                data={ratingsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 5,
                      ticks: {
                        stepSize: 1
                      }
                    }
                  },
                  plugins: {
                    legend: {
                      display: false
                    }
                  }
                }}
              />
            </div>
            <div className="chart-card">
              <h4>Разпределение на оценките</h4>
              <PieChartComponent data={ratingDistribution} />
            </div>
          </div>

          {/* Review Form */}
          <div className="review-form-card">
            <h4>Напишете вашето ревю</h4>
            {submitSuccess && (
              <div className="success-message">
                Благодарим ви за вашето ревю! То беше изпратено успешно.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Обща оценка</label>
                {renderStars(rating, setRating)}
              </div>
              
              <div className="rating-details">
                <div className="form-group">
                  <label><FaUserFriends /> Обслужване</label>
                  {renderStars(staffRating, setStaffRating)}
                </div>
                
                <div className="form-group">
                  <label><FaUtensils /> Храна</label>
                  {renderStars(foodRating, setFoodRating)}
                </div>
                
                <div className="form-group">
                  <label><FaLightbulb /> Атмосфера</label>
                  {renderStars(ambienceRating, setAmbienceRating)}
                </div>
              </div>
              
              <div className="form-group">
                <label>Вашето мнение (по избор)</label>
                <textarea 
                  className="form-control" 
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Споделете вашето преживяване с този ресторант..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? (
                  "Изпращане..."
                ) : (
                  <>
                    <FiSend /> Изпрати ревю
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="reviews-section">
            <div className="reviews-header">
              <h4>Последни ревюта</h4>
              <div className="review-filters">
                <button 
                  className={activeTab === 'all' ? 'active' : ''}
                  onClick={() => setActiveTab('all')}
                >
                  Всички
                </button>
                {[5, 4, 3, 2, 1].map(star => (
                  <button
                    key={star}
                    className={activeTab === star.toString() ? 'active' : ''}
                    onClick={() => setActiveTab(star.toString())}
                  >
                    {star} <FiStar />
                  </button>
                ))}
              </div>
            </div>

            {filteredReviews.length === 0 ? (
              <div className="no-reviews">
                Все още няма ревюта за този ресторант.
              </div>
            ) : (
              <div className="reviews-list">
                {filteredReviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          {review.user.charAt(0)}
                        </div>
                        <div className="user-name">{review.user}</div>
                      </div>
                      <div className="review-date">{review.date}</div>
                    </div>
                    <div className="review-rating">
                      {renderStars(review.rating, () => {}, false)}
                    </div>
                    {review.details && (
                      <div className="review-details">
                        <div className="detail-item">
                          <FaUserFriends /> {review.details.staff}/5
                        </div>
                        <div className="detail-item">
                          <FaUtensils /> {review.details.food}/5
                        </div>
                        <div className="detail-item">
                          <FaLightbulb /> {review.details.ambience}/5
                        </div>
                      </div>
                    )}
                    {review.comment && (
                      <div className="review-comment">
                        {review.comment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ShowAppMenu />

      <style jsx>{`
        .delivery-review-page {
          background-color: #f8f9fa;
        }
        
        .delivery-header {
          background: linear-gradient(135deg, #4a90e2 0%, #8e54e9 100%);
          color: white;
          padding: 15px 0;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .delivery-header .header-content {
          display: flex;
          align-items: center;
          padding: 0 15px;
        }
        
        .back-btn {
          color: white;
          margin-right: 15px;
          display: flex;
          align-items: center;
        }
        
        .title {
          font-weight: 600;
          color: white;
        }
        
        .restaurant-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          margin: 20px 0;
        }
        
        .restaurant-image {
          height: 180px;
          overflow: hidden;
        }
        
        .restaurant-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .restaurant-info {
          padding: 15px;
        }
        
        .restaurant-info h3 {
          margin: 0 0 10px 0;
          font-size: 1.4rem;
        }
        
        .rating-overview {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .average-rating {
          font-size: 1.8rem;
          font-weight: 700;
          margin-right: 10px;
          color: #333;
        }
        
        .stars {
          display: flex;
          margin-right: 10px;
        }
        
        .review-count {
          color: #666;
          font-size: 0.9rem;
        }
        
        .stats-section {
          margin: 20px 0;
        }
        
        .stats-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .stat-item {
          text-align: center;
          padding: 0 10px;
        }
        
        .stat-icon {
          font-size: 1.5rem;
          color: #4a90e2;
          margin-bottom: 5px;
        }
        
        .stat-value {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #666;
        }
        
        .charts-section {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          margin: 20px 0;
        }
        
        @media (min-width: 768px) {
          .charts-section {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .chart-card {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .chart-card h4 {
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }
        
        .review-form-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .review-form-card h4 {
          margin-top: 0;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #333;
        }
        
        .rating-details {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
          margin: 20px 0;
        }
        
        @media (min-width: 480px) {
          .rating-details {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        
        .star-rating {
          display: flex;
          gap: 5px;
        }
        
        .star-rating .star-filled {
          color: #FFD700;
        }
        
        .star-rating .star-empty {
          color: #e4e5e9;
        }
        
        textarea.form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          resize: none;
          font-family: inherit;
          transition: border-color 0.3s;
        }
        
        textarea.form-control:focus {
          border-color: #4a90e2;
          outline: none;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #4a90e2 0%, #8e54e9 100%);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .submit-button:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }
        
        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
        }
        
        .success-message {
          background: #d4edda;
          color: #155724;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .reviews-section {
          margin: 20px 0 40px;
        }
        
        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .reviews-header h4 {
          margin: 0;
        }
        
        .review-filters {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding-bottom: 5px;
        }
        
        .review-filters button {
          background: white;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          cursor: pointer;
        }
        
        .review-filters button.active {
          background: #4a90e2;
          color: white;
          border-color: #4a90e2;
        }
        
        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .review-item {
          background: white;
          border-radius: 12px;
          padding: 15px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          background: #4a90e2;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        
        .user-name {
          font-weight: 600;
        }
        
        .review-date {
          color: #666;
          font-size: 0.8rem;
        }
        
        .review-rating {
          margin-bottom: 10px;
        }
        
        .review-details {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
          font-size: 0.9rem;
        }
        
        .detail-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #666;
        }
        
        .review-comment {
          color: #333;
          line-height: 1.5;
        }
        
        .no-reviews {
          text-align: center;
          padding: 40px 0;
          color: #666;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

const ReviewPageWithData = withObjectData(ReviewPage);
export default ReviewPageWithData;