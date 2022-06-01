import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './views/Layout'
import Homepage from './views/Homepage/Homepage'
import Shop from './views/Shop'
import Contactus from './views/Contactus'
import AdminProductList from './views/AdminProductList';
import AdminInbox from './views/AdminInbox/AdminInbox'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='sneakers' element={<Shop />} />
          <Route path='contact' element={<Contactus />} />
          <Route path='admin' element={<AdminProductList />} />
          <Route path='admin/inbox' element={<AdminInbox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
