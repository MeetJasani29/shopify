import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateCartQuantity, removeFromCart, selectCartItemsWithQuantity, clearCartAsync } from "../services/action/product.action";
import { FaPlus } from "react-icons/fa";
import { IoMdRemove } from "react-icons/io";

function Cart() {
  const cart = useSelector(selectCartItemsWithQuantity);
  const isLogin = useSelector((state) => state.auth?.isLogin); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      dispatch(clearCartAsync()); 
    }
  }, [isLogin, dispatch]);

  const increaseQuantity = (id) => {
    dispatch(updateCartQuantity(id, 1));
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantity(id, -1));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = cart.length > 0 ? 30 : 0;

  return (
    <div className="container my-5 py-5">
      <h2 className="text-center mb-4">Cart</h2> <hr />
      {cart.length === 0 ? (
        <h4 className="text-center text-muted">Your Cart is Empty</h4>
      ) : (
        <div className="row mt-5">
          <div className="col-md-8 col-sm-12 border rounded-4 pt-4 mb-3 ">
            <table className="table table-hover align-middle border rounded-5">
              <thead className="table-secondary border ">
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="my-5">
                {cart.map((item) => (
                  <tr key={item.id} >
                    <td className="d-flex align-items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="img-thumbnail me-2"
                        style={{ width: "60px" }}
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn fs-5 btn-sm"
                          onClick={() => decreaseQuantity(item.id, item.quantity)}
                        >
                         <IoMdRemove />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Order Summary */}
          <div className="col-md-4 col-sm-12">
            <div className=" border rounded-4  p-4 shadow">
              <h4 className="mb-3">Order Summary</h4> <hr />
              <p > 
                Products ({cart.length}): <strong >${totalAmount.toFixed(2)}</strong>
              </p>
              <p>
                Shipping: <strong>${shippingCost}</strong>
              </p> <hr />
              <h5>
                Total Amount: <strong>${(totalAmount + shippingCost).toFixed(2)}</strong>
              </h5> 
              <button
                className="btn btn-dark btn-block mt-3"
                onClick={() => navigate("/checkout")}
              >
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
