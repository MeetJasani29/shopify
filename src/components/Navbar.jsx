import React from "react";
import { Container, Navbar, Nav, Button, Form, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logOutAsync } from "../services/action/auth.action";
import { clearCartAsync } from "../services/action/product.action"; 
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export default function Header() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => state.product.cartItems);
    
 
    const cartCount = user ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0) : 0;

    const handleLogout = () => {
        dispatch(logOutAsync());
        dispatch(clearCartAsync()); 
        localStorage.removeItem("cartItems"); 
    };

    return (
        <Navbar bg="light" expand="lg" fixed="top" className="shadow">
            <Container className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/" className="fs-2 fw-bold">
                    Shopify
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent" className="justify-content-end">

                    {/* Search Bar */}
                    <Form className="d-flex mx-auto">
                        <FormControl type="search" placeholder="Search" className="me-2" />
                        <Button variant="outline-success">
                            <IoSearch />
                        </Button>
                    </Form>

                    {/* Navigation Links */}
                    <Nav>
                        <Nav.Link as={Link} to="/" className="fw-bold fs-5">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products" className="fw-bold fs-5">Products</Nav.Link>
                        <Nav.Link as={Link} to="/categories" className="fw-bold fs-5">Categories</Nav.Link>

                        {user ? (
                            <button onClick={handleLogout} className="border-0 fw-bold fs-5 bg-light">
                                <MdLogout className="me-2 " /> Logout
                            </button>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="fw-bold fs-5">
                                <FaUser className="me-2 fs-5" /> Login
                            </Nav.Link>
                        )}

                        {/* Cart Icon */}
                        <Nav.Link as={Link} to="/cart" className="fs-5 position-relative">
                            <FaShoppingCart />
                            {cartCount > 0 && (
                                <span> ({cartCount}) </span>
                            )}
                        </Nav.Link>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}  