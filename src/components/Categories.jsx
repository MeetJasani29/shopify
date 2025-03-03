import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategoriesAsync } from "../services/action/product.action";
import "./Product.css"; 

const Categories = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.product.categories);

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);

  return (
    <div className="container py-5 my-5 ">
      <h2 className=" mb-4">Categories</h2>
      {allCategories.length === 0 ? (
        <p>Loading categories...</p>
      ) : (
        <div className="row ">
          {allCategories.map((category, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-3">
              <div className="category-card p-3 ">
                <h6 className="mb-2">{category.name}</h6>
                <Link to={`/category/${category.slug}`} className="btn btn-link  p-0">
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
