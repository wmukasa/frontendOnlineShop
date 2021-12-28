import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer,
     productDetailsReducer,
     productDeleteReducer,
     productCreateReducer,
     productUpdateReducer,
     productReviewCreateReducer,
     productTopRatedReducer,
    } from './reducers/productReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'
import { cartReducer } from './reducers/cartReducers'
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,userListReducer,userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
//this is for registering our reducer
const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer, //adding cartReducer to our store Redux
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productReviewCreate:productReviewCreateReducer,
    
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,

    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
    productUpdate:productUpdateReducer,
    orderList:orderListReducer,
    orderDeliver:orderDeliverReducer,
    productTopRated:productTopRatedReducer,

    
})
//now our data is in our local storage, then we need to pull it from our localstorage 
//its stringfied and we to convert it to javascript and load it directly to our initial state 
const  cartItemsFromStorage = localStorage.getItem('cartItems') ? //checking whether we have items
        JSON.parse(localStorage.getItem('cartItems')) :[] // if these items don't exit

const  shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? //checking whether we have address
        JSON.parse(localStorage.getItem('shippingAddress')) :{} // if we don't have set it to empty object

const  userInfoFromStorage = localStorage.getItem('userInfo') ? //checking whether we have user information
        JSON.parse(localStorage.getItem('userInfo')) :null // if we can't find the user set to null

const initialState = {
    cart:{ cartItems:cartItemsFromStorage,
        //we add it to cart via
    shippingAddress:shippingAddressFromStorage
    }, 
    userLogin:{ userInfo:userInfoFromStorage},//this is an object

}
const middleware = [thunk]
const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store
