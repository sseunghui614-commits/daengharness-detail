import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import "./Gnb.scss";
const Gnb = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    return (
        <nav>
    <div onClick={toggleMenu} style={{ cursor: "pointer" }}>
        {isOpen ? (
          <CgClose size={50} color="var(--main-yellow)" /> // X 아이콘 빨간색
        ) : (
          <FiMenu size={50} color="var(--main-yellow)" /> // 햄버거 파란색
        )}
    </div>

    <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
            <ul>
                <li>의류형</li>
                <li>기본형</li>
                <li>대형견 추천형</li>
                <li>목 편한 유형</li>
            </ul>
        </div>
        </nav>
    )
}

export default Gnb
