import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
  
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    

} from '../constants/OrderConstants'
import {CART_CLEAR_ITEMS} from '../constants/cartConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
        try {
            dispatch({
                type: ORDER_CREATE_REQUEST
            })
            const {
                //to update update our user information we need to be logined
                userLogin: { userInfo },
            } = getState()
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
                     Authorization: `Bearer ${userInfo.token}`         
                }      
            }
            const { data } = await axios.post(
                //we use our request as post
                `${process.env.REACT_APP_API_URL}/api/orders/add/`,
                //we have to pass in our user object here
                order,//we pass in order as the actual method
                config     
            )
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })
            dispatch({
                //this is for clearing our state
                type:CART_CLEAR_ITEMS ,
                payload: data
            })
            //now we clear our localstorage
            localStorage.removeItem('cartItems')
   
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
            })
        }
    }

export const getOrderDetails = (id) => async (dispatch, getState) => {
        // it takes in the user object which will store name, email, password
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        const {
            //to update update our user information we need to be logined
        userLogin: { userInfo },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                        //use send our authorization to our heads thats why we use our token
                 Authorization: `Bearer ${userInfo.token}`         
            }      
        }
        const { data } = await axios.get(
                    //we use our request as post
            `${process.env.REACT_APP_API_URL}/api/orders/${id}/`,
                    //we have to pass in our user object here
            config     
            )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
            })
       
        } catch (error) {
            dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
        }
}
//this method was not finished because it needs to decide on our payment method
export const payOrder = (id,paymentResult) => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
try {
    dispatch({
        type: ORDER_PAY_REQUEST
    })
    //we still need our user because we need to be authenticated to pay
    const {
        //to update update our user information we need to be logined
    userLogin: { userInfo },
    } = getState()
    const config = {
        headers: {
            'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
             Authorization: `Bearer ${userInfo.token}`         
        }      
    }
    const { data } = await axios.put(
                //we use our request as post
        `${process.env.REACT_APP_API_URL}/api/orders/${id}/pay/`,
        paymentResult,
                //we have to pass in our user object here
        config     
        )
    dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data
        })
   
    } catch (error) {
        dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
    }
}


export const deliverOrder = (order) => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
try {
    dispatch({
        type: ORDER_DELIVER_REQUEST
    })
    //we still need our user because we need to be authenticated to pay
    const {
        //to update update our user information we need to be logined
    userLogin: { userInfo },
    } = getState()
    const config = {
        headers: {
            'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
             Authorization: `Bearer ${userInfo.token}`         
        }      
    }
    const { data } = await axios.put(
                //we use our request as post
        `${process.env.REACT_APP_API_URL}/api/orders/${order._id}/deliver/`,
        {},
                //we have to pass in our user object here
        config     
        )
    dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data
        })
   
    } catch (error) {
        dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
try {
    dispatch({
        type: ORDER_LIST_MY_REQUEST
    })
    const {
        //to update update our user information we need to be logined
    userLogin: { userInfo },
    } = getState()
    const config = {
        headers: {
            'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
             Authorization: `Bearer ${userInfo.token}`         
        }      
    }
    const { data } = await axios.get(
                //we use our request as post
        `${process.env.REACT_APP_API_URL}/api/orders/myorders/`,
                //we have to pass in our user object here
        
        config     
        )
    dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data
        })
   
    } catch (error) {
        dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
    }
}
//for the listing down all the orders for admin

export const listOrders = () => async (dispatch, getState) => {
    // it takes in the user object which will store name, email, password
try {
    dispatch({
        type: ORDER_LIST_REQUEST
    })
    const {
        //to update update our user information we need to be logined
    userLogin: { userInfo },
    } = getState()
    const config = {
        headers: {
            'Content-type': 'application/json',
                    //use send our authorization to our heads thats why we use our token
             Authorization: `Bearer ${userInfo.token}`         
        }      
    }
    const { data } = await axios.get(
                //we use our request as post
        `${process.env.REACT_APP_API_URL}/api/orders/`,
                //we have to pass in our user object here
        
        config     
        )
    dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data
        })
   
    } catch (error) {
        dispatch({
        type: ORDER_LIST_FAIL,
        payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    })
    }
}