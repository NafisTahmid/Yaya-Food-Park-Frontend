import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    sex: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/register`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        setInput({
          name: "",
          username: "",
          email: "",
          password: "",
          sex: "",
          phone: "",
          address: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4">
            {" "}
            {/* Added col class for centering */}
            <h1 className="text-center font-weight-bold">Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={input.email}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Sex:(male or female)</Form.Label>
                <Form.Control
                  type="text"
                  name="sex"
                  value={input.sex}
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
              <Form.Group as={Col} md="12">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={input.address}
                  onChange={onChangeHandler}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="dark"
                className="mt-2 w-50 mx-auto d-block"
              >
                Sign up
              </Button>
            </Form>
            <p className="fs-6 font-bold my-2">
              Already have an account?
              <span className="ms-1">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
