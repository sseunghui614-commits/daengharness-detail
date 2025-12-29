import { Link } from "react-router-dom";
import "./BestProductCard.scss";


const BestProductCard = ({ img, title, hoverImg,type  }) => {
    return (
        <div className="best-product-card">
            <Link to = {`/category/${type}`}>
                <p className="bst-prod-cd-btn">{title}</p>
            </Link>
            <div className="bst-cd-img">
                <Link to={`/category/${type}`}>
                    <img className="imgBe" src={img} alt={`${title} 이미지`} />
                    <img className="imgHover" src={hoverImg} alt={`${title} 호버 이미지`} />
                </Link>
            </div>
        </div>
    )
}

export default BestProductCard
