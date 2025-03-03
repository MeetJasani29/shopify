import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { getSingleProductAsync, addToCart } from "../services/action/product.action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart } from "react-icons/fa";

function SingleProduct() {
    const { id } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const product = useSelector((state) => state.product.singleProduct);
    const isLogin = useSelector((state) => state.auth?.isLogin || false); 

    useEffect(() => {
        dispatch(getSingleProductAsync(id)); 
    }, [dispatch, id]);

    const handleAddToCart = () => {
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
        toast.success("🛒 Added to Cart Successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    };

    const goToCart = () => {
        navigate("/cart"); 
    };

    if (!product) {
        return <h2 className="text-center my-5">Loading product...</h2>;
    }

    return (
        <div className="container my-5 py-5">
            <ToastContainer />
            <div className="row">
                
                {/* Product Image */}
                <div className="col-md-4">
                    <img src={product.thumbnail} className="img-fluid" alt={product.title} />
                </div>

                {/* Product Details */}
                <div className="col-md-4">
                    <h2>{product.title}</h2>
                    <h3 className="text-danger">${product.price}</h3>
                    <p className="text-muted m-0"> <strong>Category:</strong> {product.category}</p>
                    <p className="text-muted m-0"><strong>Stock:</strong> {product.stock}</p>
                    <p className="text-muted"> <strong> Brand: </strong> {product.brand}</p>
                    <h5>About the product</h5>
                    <p>{product.description}</p>

                    <button className="btn btn-primary me-2" onClick={handleAddToCart}>
                    <FaShoppingCart />
                    </button>
                    <button className="btn btn-warning" onClick={goToCart}>
                        Go to Cart
                    </button>
                </div>

                {/* Reviews Section */}
                <div className="col-md-4">
                    <h3>Reviews</h3>
                    {product.reviews && product.reviews.length > 0 ? (
                        <ul className="list-group">
                            {product.reviews.map((review, index) => (
                                <li key={index} className="list-group-item">
                                    <strong>{review.username}</strong> - ⭐ {review.rating}
                                    <p>{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
