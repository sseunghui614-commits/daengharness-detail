import "./BestProductsSection.scss";
import BestProductCard from "./BestProductCard";

import cdImg01 from "../../assets/images/C-harness/Ctype5-2.png";
import cdImg01Hover from "../../assets/images/C-harness/Ctype5-1.png";

import cdImg02 from "../../assets/images/Harness/Htype2-2.png";
import cdImg02Hover from "../../assets/images/Harness/Htype2-1.png";

import cdImg03 from "../../assets/images/Harness/Ytype2-2.png";
import cdImg03Hover from "../../assets/images/Harness/Ytype2-1.png";

import cdImg04 from "../../assets/images/Harness/Ytype1-2.png";
import cdImg04Hover from "../../assets/images/Harness/Ytype1-1.png";

import { useNavigate } from "react-router-dom";

const BestProductsSection = () => {
    const products = [
        { id: 1, img: cdImg01, imgHover: cdImg01Hover, title: "의류형", type:"C" },
        { id: 2, img: cdImg02, imgHover: cdImg02Hover, title: "기본형", type:"H"},
        { id: 3, img: cdImg03, imgHover: cdImg03Hover, title: "대형견 추천형", type:"L"},
        { id: 4, img: cdImg04, imgHover: cdImg04Hover, title: "목 편한 유형", type:"Y"}
    ];

    return (
        <section id="sec-best">
            <div className="bst-cd-sec-list">
                {products.map((item) => (
                    <BestProductCard
                        key={item.id}
                        img={item.img}
                        hoverImg={item.imgHover}
                        title={item.title}
                        type={item.type}
                    />
                ))}
            </div>
        </section>
    )
}

export default BestProductsSection
