import cdImg1 from "../../assets/images/Harness/Ctype-not-bg3-1.png"
import cdImg2 from "../../assets/images/Harness/Ytype-Not-bg1-1.png"
import "./PromotionSection.scss";

const PromotionSection = () => {
    return (
        <section id="sec-promotion">
            <div className="pro-wrap">
                <div className="pro-title">
                    <p>회원들을 위한 <span>이벤트</span></p>
                </div>
                <div className="pro-cd-wrap">
                    <div className="pro-card">
                        <p className="cd-title">댕댕하네's</p>
                        <div className="cd-txt">
                            <p>우리아이 첫 하네스,</p>
                            <p><span>댕댕하네's</span>에서 골라요!</p>
                        </div>
                        <p className="cd-btn">신규 40% 할인받기</p>
                        <img src={cdImg1} alt="프로모션 카드 이미지01" />
                    </div>
                    <div className="pro-card">
                        <p className="cd-title">댕댕하네's</p>
                        <div className="cd-txt">
                            <p>우리아이 첫 하네스,</p>
                            <p><span>댕댕하네's</span>에서 골라요!</p>
                        </div>
                        <p className="cd-btn">신규 40% 할인받기</p>
                        <img src={cdImg2} alt="프로모션 카드 이미지01" />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PromotionSection
