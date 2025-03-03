import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartItemsWithQuantity } from "../services/action/product.action"; 

function Checkout() {
  const navigate = useNavigate();


  const cart = useSelector(selectCartItemsWithQuantity);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    zip: "",
    ccName: "",
    ccNumber: "",
    ccExpiration: "",
    ccCVV: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Checkout successful! Redirecting to home...");
      setTimeout(() => navigate("/"), 2000);
    }
  };

  
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = cart.length > 0 ? 30 : 0;
  const finalAmount = totalAmount + shippingCost;

  return (
    <div className="container my-5 py-5 ">
      <div className="row">
        {/*  Billing & Payment */}
        <div className="col-md-8 mt-5 p-3 border rounded-4" >
          <h2 className="mb-3">Billing Address</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* Name & Email */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={formData.name}  placeholder="Enter your full name" onChange={handleChange} />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={formData.email} placeholder="you@example.com" onChange={handleChange} />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            {/* Address Fields */}
            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" value={formData.address} placeholder="1234 Main St" onChange={handleChange} />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            {/* Country, State, Zip */}
            <div className="col-md-5">
              <label htmlFor="country" className="form-label">Country</label>
              <select className="form-select" id="country" value={formData.country}  placeholder="Apartment, suite, etc." onChange={handleChange}>
                <option value="">Choose...</option>
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
              {errors.country && <small className="text-danger">{errors.country}</small>}
            </div>
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" id="state" value={formData.state}  onChange={handleChange}>
                <option value="">Choose...</option>
                <option>Punjab</option>
                <option>Gujarat</option>
                <option>Maharashtra</option>
              </select>
              {errors.state && <small className="text-danger">{errors.state}</small>}
            </div>
            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="text" className="form-control" id="zip" value={formData.zip} placeholder="123456"  onChange={handleChange} />
              {errors.zip && <small className="text-danger">{errors.zip}</small>}
            </div>

            {/* Payment Section */}
            <h4 className="mt-4">Payment</h4>
            <div className="col-md-6">
              <label htmlFor="ccName" className="form-label">Name on Card</label>
              <input type="text" className="form-control" id="ccName" value={formData.ccName}  placeholder="Name as on card"  onChange={handleChange} />
              {errors.ccName && <small className="text-danger">{errors.ccName}</small>}
            </div>
            <div className="col-md-6">
              <label htmlFor="ccNumber" className="form-label">Credit Card Number</label>
              <input type="text" className="form-control" id="ccNumber" value={formData.ccNumber} placeholder="XXXX-XXXX-XXXX-XXXX" onChange={handleChange} />
              {errors.ccNumber && <small className="text-danger">{errors.ccNumber}</small>}
            </div>
            <div className="col-md-3">
              <label htmlFor="ccExpiration" className="form-label">Expiration</label>
              <input type="text" className="form-control" id="ccExpiration" value={formData.ccExpiration} placeholder="MM/YY" onChange={handleChange} />
              {errors.ccExpiration && <small className="text-danger">{errors.ccExpiration}</small>}
            </div>
            <div className="col-md-3">
              <label htmlFor="ccCVV" className="form-label">CVV</label>
              <input type="text" className="form-control" id="ccCVV" value={formData.ccCVV}  placeholder="123" onChange={handleChange} />
              {errors.ccCVV && <small className="text-danger">{errors.ccCVV}</small>}
            </div>

            {/* Checkout Button */}
            <div className="col-12 text-center ">
              <button type="submit" className="btn btn-dark">Continue to Checkout</button>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-md-4">
          <div className="border rounded-4 my-5  p-4 shadow">
            <h4 className="mb-3">Order Summary</h4> <hr />
            <p>Products ({cart.length}): <strong>${totalAmount.toFixed(2)}</strong></p>
            <p>Shipping: <strong>${shippingCost}</strong></p> <hr />
            <h5>Total Amount: <strong>${finalAmount.toFixed(2)}</strong></h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
