import styles from './Homepage.module.css';
import FrontpageProductcard from '../../components/FrontpageProductcard';
import HomepageContent from '../HomepageContent'
import Productpage from '../ProductPage/Productpage';


const Homepage = () => {
  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.title}>Hello there!</h2>
        <Productpage/>
        <HomepageContent />
      </main>
    </>
  )
};

export default Homepage;