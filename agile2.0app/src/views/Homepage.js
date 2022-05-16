import Productcard from '../components/Productcard';
import './Homepage.css';


const Homepage = () => {
//landingPage
    return (
        <>
        <div class="HomepageContainer">
        <h1 class="Homepagetitel">New stuff</h1>
            <div class="NewsList">
                <Productcard/>
                <Productcard/>
                <Productcard/>
            </div>
            <h1 class="Homepagetitel">Featured list</h1>
            <div class="featuredList">
                <Productcard/>
                <Productcard/>
                <Productcard/>
            </div>
        </div>
        </>
    )
};

export default Homepage;