import logo from './logo.svg';
import './App.css';
import Shop from './views/Shop';
import Footer from './views/Footer';
import Homepage from './views/Homepage';
import Navbar from './views/Navbar';
import Cart from './views/Cart';

function App() {
  return (
    <>
    <Homepage/>
    <Navbar/>
    <Cart/>
    <Shop/>
    <Footer/>
    </>
  );
}

export default App;
