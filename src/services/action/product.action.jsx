import axios from "axios";
import { createSelector } from 'reselect';

export const getAllProduct = (data) => {
    return {
        type: 'GET_ALL_PRODUCT',
        payload: data,
    };
};

export const addProductRej = (msg) => {
    return {
        type: "ADD_PRODUCT_REJ",
        payload: msg,
    };
};

export const singleproduct = (data) => {
    return {
        type: "SINGLE_PRODUCT",
        payload: data,
    };
};

export const getAllCategories = (data) => {
    return {
        type: "GET_ALL_CATEGORIES",
        payload: data,
    };
};

export const getProductsByCategory = (data) => {
    return {
        type: "GET_PRODUCTS_BY_CATEGORY",
        payload: data,
    };
};


export const addToCart = (product) => (dispatch, getState) => {
    const state = getState();
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().product.cartItems));
  };
  

export const updateCartQuantity = (itemId, change) => {
    return (dispatch, getState) => {
        dispatch({ type: "UPDATE_CART_QUANTITY", payload: { itemId, change } });
        localStorage.setItem("cartItems", JSON.stringify(getState().product.cartItems));
    };
};

export const getAllProductAsync = () => {
    return (dispatch) => {
        axios.get(`https://dummyjson.com/products?limit=100`)
            .then((res) => {
                dispatch(getAllProduct(res.data.products));
            })
            .catch((err) => {
                dispatch(addProductRej(err.message));
            });
    };
};

export const getSingleProductAsync = (id) => {
    return (dispatch) => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then((res) => {
                dispatch(singleproduct(res.data));
            })
            .catch((err) => {
                dispatch(addProductRej(err.message));
            });
    };
};

export const getAllCategoriesAsync = () => {
    return (dispatch) => {
        axios.get("https://dummyjson.com/products/categories")
            .then((res) => {
                dispatch(getAllCategories(res.data));
            })
            .catch((err) => {
                dispatch(addProductRej(err.message));
            });
    };
};

export const getProductsByCategoryAsync = (category) => {
    return (dispatch) => {
        axios.get(`https://dummyjson.com/products/category/${category}`)
            .then((res) => {
                dispatch(getProductsByCategory(res.data.products));
            })
            .catch((err) => {
                dispatch(addProductRej(err.message));
            });
    };
};

export const clearCartAsync = (items) => {
    return {
        type: "CLEAR_CART",
        payload: items
    }
}

export const removeFromCart = (itemId) => {
    return async (dispatch, getState) => {
        try {
            const currentCart = getState().product.cartItems;
            const updatedCart = currentCart.filter((item) => item.id !== itemId);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
        } catch (error) {
            console.log("Error removing item from cart:", error);
        }
    };
};

const selectCartItems = (state) => state.product.cartItems;
export const selectCartItemsWithQuantity = createSelector(
    [selectCartItems],
    (cartItems) =>
      cartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1
      }))
  );


