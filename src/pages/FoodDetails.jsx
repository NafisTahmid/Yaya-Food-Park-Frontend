import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Swal from "sweetalert2";

const FoodDetails = () => {
  const { id } = useParams(); // Get the food ID from the URL
  const [foodDetails, setFoodDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1); // Default quantity set to 1
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);

  const addToCartHandler = (food) => {
    const foodWithQty = { quantity: qty, food };

    dispatch(addToCart(foodWithQty));
    Swal.fire({
      title: "Food added to cart :D",
      icon: "success",
      draggable: true,
    });
  };

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true); // Start loading before making the request
        const response = await axios.get(
          `http://localhost:3000/api/v1/food/${id}`
        );
        if (response.data.success === true) {
          setFoodDetails(response.data.food); // Update state with food details
        }
      } catch (err) {
        setError("Failed to fetch food details.");
      } finally {
        setLoading(false); // End loading once the request is done
      }
    };

    fetchFoodDetails(); // Call the async function to fetch food details
    console.log("Cart: ", cart);
  }, [id, cart]); // The effect will run when the `id` changes

  if (loading) return <Loader />; // Display loader if data is still being fetched
  if (error) return <div>{error}</div>; // Display error message if there's an error

  return (
    <div>
      <Link to="/" className="btn btn-light my-3 rounded">
        Go Back
      </Link>

      <div>
        <Row>
          <Col md={6}>
            <Image src={foodDetails?.image} alt={foodDetails?.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{foodDetails?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={foodDetails?.ratings}
                  text={`${foodDetails.reviews?.length} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Category: {foodDetails?.category?.name}
              </ListGroup.Item>
              <ListGroup.Item>Price: ${foodDetails?.price}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${foodDetails?.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{foodDetails?.status}</Col>
                  </Row>
                </ListGroup.Item>
                {foodDetails?.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(foodDetails?.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block mx-auto d-block"
                    type="button"
                    disabled={foodDetails?.status === "unavailable"}
                    onClick={() => addToCartHandler(foodDetails)}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>{/* Add any additional sections like reviews here */}</Row>
      </div>
    </div>
  );
};

export default FoodDetails;
