import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { getProductsByCategoryAsync, addToCart } from "../services/action/product.action";


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  const categoryProducts = useSelector((state) => state.product.categoryProducts);
  const isLogin = useSelector((state) => state.auth?.isLogin || false); 

  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategoryAsync(category));
    }
  }, [category, dispatch]);

 
  const handleAddToCart = (product) => {
    if (!isLogin) {
      toast.error("⚠ Please log in to add products to your cart.", {
        position: "top-right",
        autoClose: 2000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
      return;
    }

    dispatch(addToCart(product));
    toast.success("🛒 Product Added to Cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={stars.length} className="text-secondary" />);
    }
    return stars;
  };

  return (
    <div className="container my-5 py-5">
      <h4 className="text-xl font-bold dark:text-white capitalize mb-5">
        {category} Products
      </h4>

      {categoryProducts.length === 0 ? (
        <p >Loading products...</p>
      ) : (
        <div className="row">
          {categoryProducts.map((product) => (
            <div key={product.id} className="col-md-3 mb-4">
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                />
                <div className="card-body">
                  <p className="card-text">{product.category}</p>
                  <Link to={`/product/${product.id}`} className="card-title">
                    {product.title}
                  </Link>
                  <div className="d-flex align-items-center card-rating">
                    {renderStars(product.rating)}{" "}
                    <span className="ms-2">{product.rating}</span>
                  </div>
                  <div className="d-flex justify-content-between mt-2 align-items-center">
                    <p className="card-price">${product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CategoryProducts;
