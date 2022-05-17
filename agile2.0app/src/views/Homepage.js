import HomepageProductCard from "../components/FrontpageProductcard"
import './Homepage.css';


const Homepage = () => {
//landingPage
    return (
        <>
        <div class="HomepageContainer">
        <h1 class="Homepagetitel">New stuff</h1>
            <div class="NewsList">
                <HomepageProductCard/>
                <HomepageProductCard/>
                <HomepageProductCard/>
            </div>
            <h1 class="Homepagetitel">Featured list</h1>
            <div class="featuredList">
                <HomepageProductCard/>
                <HomepageProductCard/>
                <HomepageProductCard/>
            </div>
        </div>
        </>
    )
};

export default Homepage;