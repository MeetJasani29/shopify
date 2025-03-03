const initialState = {
    products:  [],
    singleProduct: null,
    categories: [],
    categoryProducts: [],
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    error: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_PRODUCT':
            return {
                ...state,
                products: action.payload,
                error: null
            };

        case "ADD_PRODUCT_REJ":
            return {
                ...state,
                error: action.payload
            };

        case "SINGLE_PRODUCT":
            return {
                ...state,
                singleProduct: action.payload
            };

        case "GET_ALL_CATEGORIES":
            return {
                ...state,
                categories: action.payload
            };

        case "GET_PRODUCTS_BY_CATEGORY":
            return {
                ...state,
                categoryProducts: action.payload
            };

        case "ADD_TO_CART":
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case "GET_CART_DATA":
            return {
                ...state,
                cartData: action.payload
            };

        case "CLEAR_CART":
            return {
                ...state,
                cartItems: []
            };

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.itemId
                        ? { ...item, quantity: item.quantity + action.payload.change }
                        : item
                )
            };

            case "REMOVE_FROM_CART":
                return {
                  ...state,
                  cartItems: state.cartItems.filter((item) => item.id !== action.payload)
                };

        default:
            return state;
    }
};
