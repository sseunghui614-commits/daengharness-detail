import "./BannerSection.scss";
import bannerImg01 from "../../assets/images/banner/Banner01.png";
import bannerImg02 from "../../assets/images/banner/Banner02.png";
import bannerImg03 from "../../assets/images/banner/Banner03.png";
import { useEffect, useState, useRef } from "react"; 




const BannerSection = () => {
    // 0: 1번, 1: 2번, 2: 3번, 3: (복제 1번)
    const [idx, setIdx] = useState(0);

    // 오류 테스트 
    
    // 트랜지션 제어용 (true면 애니메이션 켜짐, false면 꺼짐)
    const [isAnimating, setIsAnimating] = useState(true);
    
    const timeRef = useRef(null);

    // 1. 자동 슬라이드 (3초마다 idx 증가)
    useEffect(() => {
        timeRef.current = setInterval(() => {
            setIdx((prev) => prev + 1);
            setIsAnimating(true); // 이동할 때는 항상 애니메이션 켜기
        }, 3000);

        return () => clearInterval(timeRef.current);
    }, []);

    // 2. 무한 슬라이드 눈속임 (Clone 로직)
    useEffect(() => {
        // 마지막 복제 슬라이드(3번 인덱스)에 도달했다면
        if (idx === 3) {
            // 0.5초(CSS transition 시간) 기다렸다가
            setTimeout(() => {
                setIsAnimating(false); // 애니메이션 끄기 (순간이동을 위해)
                setIdx(0); // 진짜 1번(인덱스 0)으로 위치 초기화
            }, 500); 
        }
    }, [idx]);

    return (
        <section id="sec-banner">
            <div className="bnr-wrap">
                <div 
                    className="bnr-track"
                    style={{
                        // idx에 따라 x축 이동 (-100%, -200% ...)
                        transform: `translateX(-${idx * 100}%)`,
                        // isAnimating이 false일 때는 transition을 없애서 순간이동 시킴
                        transition: isAnimating ? "transform 0.5s ease-in-out" : "none" 
                    }}
                >
                    <div className="bnr-sec01">
                        <img src={bannerImg01} alt="배너 이미지 01" />
                    </div>
                    <div className="bnr-sec02">
                        <img src={bannerImg02} alt="배너 이미지 02" />
                    </div>
                    <div className="bnr-sec03">
                        <div className="bnr-btn">
                            <a href="/guide">자세히 보러가기 →</a>
                        </div>
                        <img src={bannerImg03} alt="배너 이미지 03" />
                    </div>
                    
                    {/* 마지막에 붙은 1번 복제본 */}
                    <div className="bnr-sec01 clone">
                        <img src={bannerImg01} alt="배너 이미지 01(복제)" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerSection;