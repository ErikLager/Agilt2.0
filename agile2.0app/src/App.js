import './App.css';
import FontTest from './components/testing/FontTest';
import Shop from './views/Shop';
import Footer from './views/Footer';
import Homepage from './views/Homepage';
import Navbar from './views/Navbar';
import Cart from './views/Cart';
import Contactus from './views/Contactus';

function App() {
  return (
    <>
      <FontTest />
      <Homepage/>
      <Navbar/>
      <Contactus/>
      <Cart/>
      <Shop/>
      <Footer/>
    </>
  );
}

export default App;
