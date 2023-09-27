import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from "./scenes/home/Home"
import ItemDetailsPage from './scenes/itemDetailsPage/ItemDetailsPage';
import Checkout from './scenes/checkout/Checkout';
import Confirmation from './scenes/checkout/Confirmation';
import Navbar from './scenes/global/Navbar';
import CartMenu from './scenes/global/CartMenu';
import Footer from "./scenes/global/Footer";

const ScrollToTop = () =>{
  const { pathname } = useLocation();

  useEffect(() =>{
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='item/:itemId' element={<ItemDetailsPage />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/succes' element={<Confirmation />} />
          
        </Routes>
        <CartMenu />
        <Footer />

      </BrowserRouter>
    
    </div>
  );
}

export default App;
