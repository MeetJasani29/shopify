const initialState = {
    isCreated: false,
    error: null,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    isLogin: sessionStorage.getItem("user") ? true : false,
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],  
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUC":
            sessionStorage.setItem("user", JSON.stringify(action.payload)); 
            return {
                ...state,
                isCreated: true,
                isLogin: true,
                user: action.payload,
            };

            case "LOGIN_SUC":
                console.log("User logged in successfully:", action.payload); 
                sessionStorage.setItem("user", JSON.stringify(action.payload));
                return {
                    ...state,
                    user: action.payload,
                    isLogin: true,
                };
            

        case "REGISTER_REJ":
        case "LOGIN_FAIL":
            return {
                ...state,
                error: action.payload
            };

        case "LOGOUT_SUC":
            sessionStorage.removeItem("user");
            return {
                ...state,
                user: null,
                isLogin: false
            };

        case "SET_CART_FROM_LOCAL_STORAGE":
            return { ...state, cartItems: action.payload };

        default:
            return state;
    }
};
