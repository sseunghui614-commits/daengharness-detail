import BannerSection from "../components/main/BannerSection"
import BestProductsSection from "../components/main/BestProductsSection"
import CategoryCard from "../components/main/CategoryCard"
import LifestyleVideoSection from "../components/main/LifestyleVideoSection"
import PromotionSection from "../components/main/PromotionSection"
import ReviewSection from "../components/main/ReviewSection"
const MainPage = () => {
    return (
        <div id="main-page">
            <BannerSection />
            <BestProductsSection />
            <CategoryCard />
            <LifestyleVideoSection />
            <PromotionSection/>
            <ReviewSection />
        </div>
    )
}

export default MainPage
