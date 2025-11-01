import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/food/${food._id}`}>
          <Card.Img
            src={food.image}
            fluid
            style={{ height: "250px", width: "100%" }}
          />
        </Link>
        <Card.Body>
          <Link className="text-decoration-none" to={`/food/${food._id}`}>
            <Card.Title as="div">
              <strong>{food.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={food.ratings || 1}
                text={`${food.reviews.length} reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>

          <Card.Text as="h3">${food.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default FoodCard;
