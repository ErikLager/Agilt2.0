import styles from './Homepage.module.css';
import FrontpageProductcard from '../../components/FrontpageProductcard';
import HomepageContent from '../HomepageContent'
import Productpage from '../ProductPage/Productpage';
import Cart from '../Cart/Cart';


const Homepage = () => {
  return (
    <>
      <main className={styles.container}>
        <HomepageContent />
      </main>
    </>
  )
};

export default Homepage;