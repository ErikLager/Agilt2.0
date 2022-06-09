import HomepageProductCard from "../components/FrontpageProductcard"
import './HomepageContent.css';


const Homepage = () => {
//landingPage
    return (
        <>
        <div className="HomepageContainer">
        <h1 className="Homepagetitel">New stuff</h1>
            <div className="NewsList">
                <HomepageProductCard/>
                <HomepageProductCard/>
                <HomepageProductCard/>
            </div>
            <h1 className="Homepagetitel">Featured list</h1>
            <div className="featuredList">
                <HomepageProductCard/>
                <HomepageProductCard/>
                <HomepageProductCard/>
            </div>
        </div>
        </>
    )
};

export default Homepage;