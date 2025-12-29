import logoImg from "../../assets/images/footer/logo.png";
import Naver from "../../assets/images/footer/naver.png";
import insta from "../../assets/images/footer/instagram.png";
import dogMain from "../../assets/images/footer/dog-main.png";
import dogMobile from "../../assets/images/footer/dog.png";
import "./Footer.scss";

const Footer = () => {

  const moveToHeader = () => {
    const header = document.getElementById("headerMenu");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-ment">
          
          <div className="footer-logo" onClick={moveToHeader}>
            <img src={logoImg} alt="로고" />
          </div>

          <p>대표자 → 김댕댕</p>
          <p>사업장 주소 → 서울특별시 마포구 월드컵북로 402, 3층</p>
          <p>이메일 → dangdangharness@ddhane.co.kr</p>

          <div className="footer-brands">
            <img src={Naver} alt="네이버" />
            <img src={insta} alt="인스타그램" />
          </div>
        </div>

        <img src={dogMain} alt="임시 사진" className="footer-dog" />
        <img src={dogMobile} alt="임시 사진" className="mobile-dog" />
      </div>
    </footer>
  );
};

export default Footer;
