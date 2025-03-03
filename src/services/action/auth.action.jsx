import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "../../config/firebaseConfig";


const registerSuccess = () => {
    return {
        type: "REGISTER_SUC"
    }
}
const registerFailed = (msg) => {
    return {
        type: "REGISTER_REJ",
        payload: msg
    }
}
const signOutSuc = () => {
    return {
        type: "LOGOUT_SUC",
    }
}
const loginSuc = (user) => {
    return {
        type: "LOGIN_SUC",
        payload: user
    }
}

const loginFail = (msg) => {
    return {
        type: "LOGIN_FAIL",
        payload: msg
    }
}

export const addNewUserAsync = (data) => {
    return async (dispatch) => {
        try {
            let newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
        dispatch(registerSuccess())
        } catch (error) {
            if(error.code == "auth/email-already-in-use"){
                dispatch(registerFailed("Already Register, Please Login!!!"))
            }else
            dispatch(registerFailed(error.message))
        }
    }
}


export const loginUserAsync = (data) => {
    return async (dispatch) => {
        try {
            let userRef = await signInWithEmailAndPassword(auth, data.email, data.password);
            let user = userRef.user;
            dispatch({ type: "LOGIN_SUC", payload: user });
        } catch (error) {
            dispatch({ type: "LOGIN_FAIL", payload: error.message });
        }
    };
};


export const logOutAsync = () => {
    return async (dispatch) => {
        try {
            signOut(auth)
            dispatch(signOutSuc())
        } catch (error) {
            console.log(error);
            dispatch(loginFail(error.message))
        }
    }
}





