import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductAsync, addToCart } from "../services/action/product.action";
import { FaRegStar, FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./product.css";

function AllProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const products = useSelector((state) => state.product.products);
    const isLogin = useSelector((state) => state.auth?.isLogin || false);

    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortType, setSortType] = useState("");

    useEffect(() => {
        dispatch(getAllProductAsync());
    }, [dispatch]);

    useEffect(() => {
        let sortedArray = [...products];

        if (sortType === "low-to-high") {
            sortedArray.sort((a, b) => a.price - b.price);
        } else if (sortType === "high-to-low") {
            sortedArray.sort((a, b) => b.price - a.price);
        }

        setSortedProducts(sortedArray);
    }, [products, sortType]);

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

    return (
        <div className="container my-5 py-5 ">
            <div className="row">
                <div className="col-12 d-flex justify-content-between align-items-center mb-5">
                    <h4>All Products</h4>

                    <select
                        className="form-select w-25"
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>
                </div>

                {sortedProducts.length > 0 ? (
                    sortedProducts.map((product) => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3  mb-4">
                            <div className="card" style={{ width: "18rem" }}>
                                <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <p className="card-text text-muted">{product.category}</p>
                                    <Link to={`/product/${product.id}`} className="card-title">
                                        {product.title}
                                    </Link>
                                    <div className="d-flex align-items-center card-rating">
                                        {renderStars(product.rating)} <span className="ms-2">{product.rating}</span>
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
                    ))
                ) : (
                    <div className="col-12">
                        <p>Loading products...</p>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default AllProduct;
