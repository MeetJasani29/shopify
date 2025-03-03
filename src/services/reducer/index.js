import {combineReducers } from  'redux';
import {productReducer} from './productReducer'
import {authReducer} from './auth.reducer'


export const rootReducer = combineReducers ( {
    product : productReducer,
    auth: authReducer, 
    
})