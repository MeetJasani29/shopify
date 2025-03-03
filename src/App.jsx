
import Navbar from './components/Navbar'
import Home from './components/Home'
import SingleProduct from './components/SingleProduct'
import { Routes, Route } from "react-router-dom";
import AllProduct from './components/AllProduct';
import Categories from './components/Categories';
import CategoryProducts from './components/CategoryProducts';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/Add-to-Cart';
import Checkout from './components/Checkout.JSX';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/products" element={<AllProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </>
  )
}

export default App;
