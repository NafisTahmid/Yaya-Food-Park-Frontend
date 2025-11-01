import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { setFood } from "../redux/foodSlice";

const getFoodDetails = ({ id }) => {
  useEffect(() => {
    const getFoodDetails = async ({ id }) => {
      try {
        const dispatch = useDispatch();
        const response = await axios.get(
          `http://localhost:3000/api/v1/food/${id}`
        );
        if (response.data.success === true) {
          dispatch(setFood(response.data.food));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getFoodDetails();
  }, []);
};

export default getFoodDetails;
