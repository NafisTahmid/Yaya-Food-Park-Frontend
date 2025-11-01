import React from "react";

import FoodCard from "./FoodCard.jsx";
import getAllFoods from "../hooks/getAllFoods.jsx";
import { useSelector } from "react-redux";
const Home = () => {
  getAllFoods();
  const { foods } = useSelector((store) => store.food);
  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            {foods?.map((food) => (
              <div className="col-md-4" key={food.id}>
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
