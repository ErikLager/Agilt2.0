import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './views/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
