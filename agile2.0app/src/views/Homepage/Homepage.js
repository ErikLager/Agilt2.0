import styles from './Homepage.module.css';
import FrontpageProductcard from '../../components/FrontpageProductcard';


const Homepage = () => {
  return (
    <>
      <main class={styles.container}>
        <h2 className={styles.title}>Hello there!</h2>
        <FrontpageProductcard />
      </main>
    </>
  )
};

export default Homepage;