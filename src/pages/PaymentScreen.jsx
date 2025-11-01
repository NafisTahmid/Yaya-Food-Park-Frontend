import React, { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Payment method: ", paymentMethod);
  };
  const navigate = useNavigate();
  return (
    <section className="my-5">
      <Row className="justify-content-center align-items-center">
        <Col md={12}>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as="legend">Select Payment Method</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    label="Sslcommerz"
                    id="payment method"
                    name="paymentMethod"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                  <Form.Check
                    type="radio"
                    label="Credit Card"
                    id="payment method"
                    name="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                onClick={() => navigate("/shipping")}
              >
                Continue
              </Button>
            </Form>
          </FormContainer>
        </Col>
      </Row>
    </section>
  );
};

export default PaymentScreen;
