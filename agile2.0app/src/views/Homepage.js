import Productcard from '../components/Productcard';
import './Homepage.css';


const Homepage = () => {
//landingPage
    return (
        <>
        <div class="HomepageContainer">
            <div class="Content">
                <Productcard/>
                <Productcard/>
                <Productcard/>
                <Productcard/>
            </div>

        </div>
        </>
    )
};

export default Homepage;