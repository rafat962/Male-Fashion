import HeroSlider from "./utils/HeroSlider";
import BannerSection from "./utils/BannerSection";
import ProductTabs from "./utils/ProductTabs";
import DealOfWeek from "./utils/DealOfWeek";
import LatestNews from "./utils/LatestNews";
import InstagramSection from "./utils/InstagramSection";
import Testimonial from "./utils/Testimonials";

const HomePage = () => {
    return (
        <>
            <HeroSlider />
            <BannerSection />
            <ProductTabs />
            <DealOfWeek />
            <InstagramSection />
            <Testimonial />
        </>
    );
};

export default HomePage;
