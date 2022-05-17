import styles from './Homepage.module.css';
import FrontpageProductcard from '../../components/FrontpageProductcard';
import HomepageContent from '../HomepageContent'


const Homepage = () => {
  return (
    <>
      <main class={styles.container}>
        <h2 className={styles.title}>Hello there!</h2>
        <HomepageContent />
      </main>
    </>
  )
};

export default Homepage;