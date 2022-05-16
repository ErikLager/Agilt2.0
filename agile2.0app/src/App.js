import './App.css';
import FontTest from './components/testing/FontTest';
import Shop from './views/Shop';
import Footer from './views/Footer';
import Homepage from './views/Homepage';
import Navbar from './views/Navbar';
import Cart from './views/Cart';
import Contactus from './views/Contactus';
import Productcard from './components/Productcard';
import Button from './components/Button/Button'

function App() {
  return (
    <>
      <FontTest />
      <Homepage/>
      <Navbar/>
      <Contactus/>
      <Productcard/>
      <Button label='Click here' onClick={() => console.log('Hello')} />
      <Cart/>
      <Shop/>
      <Footer/>
    </>
  );
}

export default App;
