import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "../redux/categorySlice";
const getAllCategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/categories/all"
        );
        if (response.data.success === true) {
          dispatch(setCategories(response.data.categories));
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getAllCategories();
  }, []);
};

export default getAllCategories;
