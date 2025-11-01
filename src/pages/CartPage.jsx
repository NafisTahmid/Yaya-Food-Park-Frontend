import React from "react";
import { Button, Col, Image, ListGroup, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import Swal from "sweetalert2";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  const navigate = useNavigate();
  const removeFromCartHandler = (food) => {
    dispatch(removeFromCart(food));
    Swal.fire({
      title: "Food removed from cart :D",
      icon: "warning",
      draggable: true,
    });
  };
  return (
    <div className="p-5">
      <Row>
        <Col md={8}>
          {cart.length === 0 ? (
            <Message variant="info">
              Your Cart is empty. <Link to="/">Go back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cart.map((item, index) => (
                <ListGroup.Item key={index + 1}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item.food.image}
                        alt={item.food.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/food/${item.food._id}`}>
                        {item.food.name}
                      </Link>
                    </Col>
                    <Col md={2}>${item.food.price}</Col>

                    <Col md={3}>
                      <Form.Control as="select" value={item.quantity}>
                        {[
                          ...Array(
                            Math.max(0, item.food.countInStock || 0)
                          ).keys(),
                        ].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.food)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h2>
                Subtotal: (
                {cart.reduce((acc, item) => acc + Number(item.quantity), 0)}{" "}
                Items)
              </h2>
              $
              {cart
                .reduce(
                  (acc, item) =>
                    acc + Number(item.quantity) * Number(item.food.price),
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block mx-auto d-block"
                disabled={cart.length === 0}
                onClick={() => navigate("/payment-method")}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
