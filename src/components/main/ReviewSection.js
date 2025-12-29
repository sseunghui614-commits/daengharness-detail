// src/components/main/ReviewSection.js
import "./ReviewSection.scss";
import ReviewCard from "./ReviewCard";
import reviewData from "../../assets/data/Review.json";

/**
 * ✅ 섹션 파일의 역할
 * 1) json 불러오기
 * 2) 화면에 뿌릴 데이터로 가공(원하면 내용/제목 바꾸기)
 * 3) 무한 이동을 위해 "복제"해서 2배 배열 만들기
 * 4) 트랙에 map으로 렌더링
 */
const ReviewSection = () => {
    // ✅ json 구조: { "Review": [...] }
    const reviews = reviewData?.Review ?? [];

    /**
     * ✅ 여기서 "카드 안 내용 바꾸기" 가능
     * 예: prod_name을 너가 원하는 방식으로 가공한다거나,
     *     text 앞에 이모지 붙이거나, 날짜 형식을 바꾸거나 등
     */
    const normalized = reviews.map((r) => ({
        id: r.id,
        text: r.text,
        prodName: r.prod_name,
        star: r.star,
        date: r.date,
    }));

    /**
     * ✅ 무한 이동 핵심: 배열 2번 붙이기
     * - 트랙이 끊겨 보이지 않게 동일한 카드 세트를 뒤에 한번 더 붙임
     */
    const loop = [...normalized, ...normalized];

    return (
        <section className="review-section">
            <div className="review-wrap">
                <div className="re-title">
                    <p>카테고리 별 <span>베스트 리뷰</span></p>
                </div>

                {/* ✅ 밖으로 나가면 잘리는 “창” */}
                <div className="review-list">
                    {/* ✅ 실제로 움직이는 트랙 */}
                    <div className="review-track">
                        {loop.map((item, idx) => (
                            /**
                             * ✅ key 중복 방지:
                             * - 동일 데이터가 2번 나오니까 idx를 섞어서 유니크 처리
                             */
                            <ReviewCard
                                key={`${item.id}-${idx}`}
                                text={item.text}
                                prodName={item.prodName}
                                star={item.star}
                                date={item.date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;
