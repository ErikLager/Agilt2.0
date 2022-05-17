import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Checkout from './views/Checkout'
import './App.css';
import FontTest from './components/testing/FontTest';
import Shop from './views/Shop';
import Footer from './views/Footer';
import Homepage from './views/Homepage';
import Navbar from './views/Navbar/Navbar';
import Cart from './views/Cart';
import Contactus from './views/Contactus';
import FrontpageProductcard from './components/FrontpageProductcard';
import Button from './components/Button/Button'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar />} />
        <Navbar/>
        <FontTest />
        <Homepage/>
        <Contactus/>
        <FrontpageProductcard/>
        <Button label='Hello this is a button' />
        <Cart/>
        <Shop/>
        <Footer/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
