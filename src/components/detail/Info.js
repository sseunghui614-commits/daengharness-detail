import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../assets/data/products.json";
import {cartAdd} from "../cart/cartProduct";
import "./Info.scss";

const Info = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const { Product: products, size: sizeOptions, color: colorOptions } = productsData;

    const product = useMemo(() => {
        const id = Number(productId);
        return products.find((p) => p.id === id) || products[0];
    }, [productId, products]);

    // ✅ 이미지 require (C-harness만 폴더 다름)
    const getImagePath = (imgPath) => {
        if (!imgPath || !product) return "";
        const fileName = imgPath.split("/").pop();

        if (product.type === "C") {
        return require(`../../assets/images/C-harness/${fileName}`);
        }
        return require(`../../assets/images/Harness/${fileName}`);
    };

    const [mainImg, setMainImg] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (!product) return;
        setMainImg(product.img1);
        setSelectedSize("");
        setSelectedColor("");
        setQty(1);
    }, [product]);

    if (!product) return null;
    const thumbs = [product.img1, product.img2, product.img3].filter(Boolean);

    const handleMinus = () => setQty((prev) => Math.max(1, prev - 1));
    const handlePlus = () => setQty((prev) => prev + 1);

    const isReady = Boolean(selectedSize && selectedColor);
    const unitPrice = Number(product.origin_price) || 0;
    const totalPrice = unitPrice * qty;

    const handleAddCart = () => {
        if (!isReady) {
        alert("사이즈와 색상을 선택해주세요!");
        return;
        }
        cartAdd({
        productId: product.id,
        productName: product.prod_name,
        salePerc: product.sale_perc || 0,    
        size: selectedSize,
        color: selectedColor,
        qty: qty,
        price: Number(product.origin_price) || 0, 
        img: getImagePath(product.img1) || "",              
    });
        navigate("/cart");
    };

    return (
        <section className="detail-info">
        <div className="detail-info-wrap">
            {/* LEFT : 이미지 */}
            <div className="detail-info-media">
            <div className="detail-info-main">
                <img src={getImagePath(mainImg)} alt={product.prod_name} />
            </div>

            <div className="detail-info-thumbs">
                {thumbs.map((img, idx) => (
                <button
                    key={`${img}-${idx}`}
                    type="button"
                    className={`detail-info-thumb ${mainImg === img && idx !== 2 ? "is-active" : ""}`}
                    onClick={() => setMainImg(img)}
                >
                    <img src={getImagePath(img)} alt="thumbnail" />
                </button>
                ))}
            </div>
            </div>

            {/* RIGHT : 구매 */}
            <div className="detail-info-buy">
            {/* 상단 텍스트 */}
            <div className="detail-info-buyTop">
                <h1 className="detail-info-title">{product.prod_name}</h1>
                <p className="detail-info-desc">
                반려견의 움직임을 편안하게, 보호는 안정적으로 잡아주는 데일리 하네스
                </p>

                <ul className="detail-info-bullets">
                <li>목을 조이지 않고 가슴으로 힘을 분산시켜 산책 시 부담을 줄여줘요.</li>
                <li>부드러운 소재로 거부감 없이 적응하기 좋아요.</li>
                <li>가슴둘레 기준으로 사이즈 선택을 추천해요.</li>
                </ul>

                <div className="detail-info-price">￦{Number(unitPrice).toLocaleString()}원</div>
                <p className="detail-info-coupon">회원가입 시 20% 할인 쿠폰 발급</p>
            </div>

            {/* 옵션 */}
            <div className="detail-info-options">
                <select
                className="detail-info-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                >
                <option value="">(필수) 옵션을 선택해주세요 (사이즈)</option>
                {sizeOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
                </select>

                <select
                className="detail-info-select"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                >
                <option value="">(필수) 옵션을 선택해주세요 (색상)</option>
                {colorOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
                </select>
            </div>

            {/* 수량/합계 박스 */}
            <div className="detail-info-summary">
                <div className="detail-info-summaryLeft">
                <span className="detail-info-summaryLabel">(합계) 수량</span>
                <div className="detail-info-qtyBox">
                    <button type="button" className="detail-info-qtyBtn" onClick={handleMinus}>-</button>
                    <span className="detail-info-qtyNum">{qty}</span>
                    <button type="button" className="detail-info-qtyBtn" onClick={handlePlus}>+</button>
                </div>
                </div>

                <div className="detail-info-summaryRight">
                <strong className="detail-info-total">￦{Number(totalPrice).toLocaleString()}원</strong>
                </div>
            </div>

            {/* 장바구니 버튼 */}
            <button
                type="button"
                className={`detail-info-cartBtn ${isReady ? "is-active" : ""}`}
                onClick={handleAddCart}
            >
                <span className="detail-info-cartIcon">🛒</span>
                <span className="detail-info-cartText">장바구니</span>
            </button>
            </div>
        </div>
        </section>
    );
};

export default Info;

