import "./ReviewCard.scss";

const ReviewCard = ({ text, prodName, star, date }) => {
    return (
        <div className="review-item">
            <p className="review-text">{text}</p>

            <p className="review-prod">{prodName}</p>

            <div className="review-meta">
                <span className="review-star">{star}</span>
                <span className="review-date">{date}</span>
            </div>
        </div>
    );
};

export default ReviewCard;
