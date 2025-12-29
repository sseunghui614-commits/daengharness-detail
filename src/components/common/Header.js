import { NavLink } from "react-router-dom";
import logoImg from "../../assets/images/header/logo.png";
import Icon from "../../assets/images/header/cart-icon.png";
import McartIcon from "../../assets/images/header/cart-icon.png";
import myIcon from "../../assets/images/header/my-icon.png";
import "./Header.scss";
import Gnb from "../common/Gnb";

const Header = () => {
  return (
    <header className="header" id="headerMenu">
      <nav className="header-menu">
        {/* 로고 */}
    <div className="logo">
      <NavLink to="/">
        <img src={logoImg} alt="로고" />
      </NavLink>
    </div>

        {/* 메뉴 */}
        <div className="menu-list">
          <NavLink to="/category/C">의류형</NavLink>
          <NavLink to="/category/H">기본형</NavLink>
          <NavLink to="/category/L">대형견 추천</NavLink>
          <NavLink to="/category/Y">목 편한 유형</NavLink>
        </div>
        
        {/* 아이콘 */}
        <div className="icon-group">
          <NavLink to="/cart"> 
            <img src={Icon} alt="장바구니" />
          </NavLink>
          <img src={myIcon} alt="마이페이지" />
        </div>
        <div className="mobile-top">
          <img src={logoImg} alt="로고" />
          <div className="right">
          <img src={McartIcon} alt="장바구니" />
          <Gnb />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
