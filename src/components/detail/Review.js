import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import productsData from "../../assets/data/products.json";
import reviewData from "../../assets/data/Review.json";
import "./Review.scss";

const Review = () => {
    const { productId } = useParams();
    const products = productsData.Product || [];
    const reviews = reviewData.Review || [];
    const product = useMemo(() => {
        const id = Number(productId);
        return products.find((p) => p.id === id) || products[0];
    }, [productId, products]);
    
    const selectedReviews = useMemo(() => {
        if (!product || reviews.length === 0) return [];
        const sameProductReviews = reviews.filter((r) => {
        const reviewName =
            r.Prod_name || r.prod_name || r.prodName || r.productName || "";
        return reviewName === product.prod_name;
        });
        const source = sameProductReviews.length >= 3 ? sameProductReviews : reviews;
        // 랜덤 3개
        const copied = [...source];
        const result = [];
        for (let i = 0; i < 3 && copied.length > 0; i++) {
        const index = Math.floor(Math.random() * copied.length);
        result.push(copied[index]);
        copied.splice(index, 1);
        }
        return result;
    }, [reviews, product]);
    const renderStars = (value) => {
        if (!value) return "";
        if (typeof value === "string" && value.includes("★")) return value;
        const n = Number(value) || 0;
        return "★".repeat(Math.max(0, Math.min(5, n)));
    };
    if (!product || selectedReviews.length === 0) return null;
    return (
        <section className="detail-review">
        <div className="detail-review-wrap">
            <h2 className="detail-review-title">Review</h2>
            <div className="detail-review-list">
            {selectedReviews.map((r, idx) => {
                const name =
                r.Prod_name || r.prod_name || r.prodName || "(상품명 없음)";
                const star = r.star ?? r.stars ?? r.rating ?? 0;
                const text = r.text || r.content || "";
                const date = r.date || r.buyDate || "";
                return (
                <div className="detail-review-item" key={r.id ?? idx}>
                    <h3 className="detail-review-prod">상품명 : {name}</h3>
                    <p className="detail-review-star">
                    별점 : <span className="star">{renderStars(star)}</span>
                    </p>
                    <p className="detail-review-text">{text}</p>
                    <p className="detail-review-date">구매일 : {date}</p>
                </div>
                );
            })}
            </div>
        </div>
        </section>
    );
    };

export default Review;
