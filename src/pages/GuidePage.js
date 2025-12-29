import Main from "../assets/images/Grid/g-main.png";
import Himg from "../assets/images/Grid/g-H-img.png";
import Hment from "../assets/images/Grid/g-H-ment.png";
import "./GuidePage.scss";
import Yimg from "../assets/images/Grid/g-y-img.png";
import Yment from "../assets/images/Grid/g-y-ment.png";
import Bimg from "../assets/images/Grid/g-b-img.png";
import Bment from "../assets/images/Grid/g-b-ment.png";
import Opimg from "../assets/images/Grid/g-op-img.png";
import Opment from "../assets/images/Grid/g-op-ment.png";
import { NavLink } from "react-router-dom";
const GuidePage = () => {
    return (
        <div id="guide-page">
        <div className="main">
            <img src={Main} alt="가이드 메인" />
        </div>
        <div className="guide-h-imgs">
            <img src={Himg} alt="기본형 하네스 사진들" />
            <img src={Hment} alt="기본형 하네스 설명" />
            <NavLink to="/category/H">
            <button className="h-btn">해당 상품 더 보기▶</button>
            </NavLink>
        </div>
        <div className="guide-y-imgs">
            <img src={Yimg} alt="목편한 하네스 사진들" />
            <img src={Yment} alt="목편한 하네스 설명" />
            <NavLink to="/category/Y">
            <button className="y-btn">해당 상품 더 보기▶</button>
            </NavLink>
        </div>
        <div className="guide-b-imgs">
            <img src={Bimg} alt="대형견 추천형 사진들" />
            <img src={Bment} alt="대형견 추천형 설명" />
            <NavLink to="/category/L">
            <button className="b-btn">해당 상품 더 보기▶</button>
            </NavLink>
        </div>
        <div className="guide-op-imgs">
            <img src={Opimg} alt="의류형 하네스 사진들" />
            <img src={Opment} alt="의류형 하네스 설명" />
            <NavLink to="/category/C">
            <button className="op-btn">해당 상품 더 보기 ▶</button>
            </NavLink>
        </div>
        </div>
    )
}

export default GuidePage
