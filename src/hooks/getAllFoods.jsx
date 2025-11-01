import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAllFoods } from "../redux/foodSlice";
const getAllFoods = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllFoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/food");
        if (response.data.success === true) {
          dispatch(setAllFoods(response.data.foods));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllFoods();
  }, []);
};

export default getAllFoods;
