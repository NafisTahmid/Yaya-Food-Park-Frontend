import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../redux/cartSlice";

const ShippingScreen = () => {
  const { user, token } = useSelector((store) => store.auth);
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItems = [];
  cart.map((item) => {
    const newItem = {
      quantity: item.quantity,
      food: item.food._id,
    };
    orderItems.push(newItem);
  });
  console.log("Order items: ", orderItems);
  const [input, setInput] = useState({
    orderItems: orderItems,
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    status: "pending",
    user: user._id,
  });
  const handleSubmit = async (e) => {
    console.log("Button clicked!");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/orders/create",
        input,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.status === true) {
        toast.success(response.data.message);
        console.log(response.data.message);
        const paymentURL = response.data.paymentData.payment_gateway_url;
        setInput({
          orderItems: [],
          shippingAddress1: "",
          shippingAddress2: "",
          city: "",
          zip: "",
          country: "",
          phone: "",
          status: "pending",
          user: null,
        });
        dispatch(emptyCart([]));
        window.location.href = paymentURL;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const onChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="">
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4">
            <h1 className="text-center font-weight-bold">Shipping Details</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12">
                <Form.Label>Shipping Address 1</Form.Label>
                <Form.Control
                  type="text"
                  name="shippingAddress1"
                  value={input.shippingAddress1}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Shipping Address 2</Form.Label>
                <Form.Control
                  type="text"
                  name="shippingAddress2"
                  value={input.shippingAddress2}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  name="zip"
                  value={input.zip}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={input.phone}
                  onChange={onChangeHandler}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="dark"
                className="mt-2 w-50 mx-auto d-block"
              >
                Proceed to checkout
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;
