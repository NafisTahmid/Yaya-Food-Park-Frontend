import React from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
const PaymentSuccess = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <Message variant="success">
            Your payment is successful :D <Link to="/">Go to home</Link>
          </Message>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
