import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { setAuthUser, setToken } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
        "http://localhost:3000/api/v1/users/login",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        console.log("Response: ", response.data);
        dispatch(setAuthUser(response.data.existingUser));
        dispatch(setToken(response.data.token));
        toast(response.data.message);
        setInput({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error message: ", error);
      toast(error.response.data.message);
    }
  };

  return (
    <div className="">
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 col-lg-4">
            {" "}
            <h1 className="text-center font-weight-bold">Sign In</h1>
            <Form onSubmit={handleSubmit}>
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
              <Button
                type="submit"
                variant="dark"
                className="mt-2 w-50 mx-auto d-block"
              >
                Login
              </Button>
            </Form>
            <p className="fs-6 font-bold my-2">
              Don't have an account?
              <span className="ms-1">
                <Link to="/signup">Sign up!</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
