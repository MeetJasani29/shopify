import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from '../assets/images/banner.webp'
import { getAllProductAsync, addToCart } from "../services/action/product.action";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Product() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state) => state.product.products);
    const isLogin = useSelector((state) => state.auth?.isLogin || false);

    useEffect(() => {
        dispatch(getAllProductAsync());
    }, [dispatch]);

    const handleAddToCart = (product) => {
        if (!isLogin) {
            toast.error("⚠ Please log in to add products to your cart.");
            setTimeout(() => navigate("/login"), 2000);
            return;
        }
        dispatch(addToCart(product));
        toast.success("🛒 Product Added to Cart!");
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

    
    const trendingProducts = products.slice(0, 8);
    const newArrivalProducts = products.slice(8, 16);

    return (
        <div className="container my-5 py-5">
            <ToastContainer />

            {/* Trending Products */}
            <div className="row">
                <div className="col-12">
                    <h1>Trending Products</h1>
                </div>
                {trendingProducts.length > 0 ? (
                    trendingProducts.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <p className="card-text">{product.category}</p>
                                    <Link to={`/product/${product.id}`} className="card-title">{product.title}</Link>
                                    <div className="d-flex align-items-center card-rating">
                                        {renderStars(product.rating)}{" "}
                                        <span className="ms-2">{product.rating}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 align-items-center">
                                        <p className="card-price">${product.price}</p>
                                        <button onClick={() => handleAddToCart(product)} className="btn btn-primary">
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>Loading products...</p>
                    </div>
                )}
            </div>

                <div className="banner d-flex text-center align-items-cente my-auto"> 
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <div className="banner-img">
                                <img src={banner} alt="banner-img" />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 py-5 my-auto">
                            <div className="banner-right-side">
                                <h2>Don't miss the offer</h2>
                                <h4>Grab it now</h4>
                                <button>Shop Now</button>
                            </div>
                        </div>
                    </div>
                </div>



            {/* New Arrivals */}
            <div className="row mt-5">
                <div className="col-12">
                    <h1>New Arrivals</h1>
                </div>
                {newArrivalProducts.length > 0 ? (
                    newArrivalProducts.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <p className="card-text">{product.category}</p>
                                    <Link to={`/product/${product.id}`} className="card-title">{product.title}</Link>
                                    <div className="d-flex align-items-center card-rating">
                                        {renderStars(product.rating)}{" "}
                                        <span className="ms-2">{product.rating}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 align-items-center">
                                        <p className="card-price">${product.price}</p>
                                        <button onClick={() => handleAddToCart(product)} className="btn btn-primary">
                                            <FaShoppingCart />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>Loading products...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Product;
