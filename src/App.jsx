import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import FoodDetails from "./pages/FoodDetails";
import CartPage from "./pages/CartPage";
import PaymentScreen from "./pages/PaymentScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentSuccess from "./pages/PaymentSuccess";
function App() {
  return (
    <>
      <BrowserRouter>
        <main>
          <Navbar />
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/food/:id" element={<FoodDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/payment-method" element={<PaymentScreen />} />
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
            </Routes>
          </Container>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
