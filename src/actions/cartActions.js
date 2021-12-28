import axios from 'axios' //importing axios to connect to backend or duplicate the routes 
import { CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
    } from '../constants/cartConstants'// import constanst from our constanst dir
// adding to our cart actions
//This will be also an error function
//a function inside a function, getState helps when getting anystate from store
//dispatch is the method used to dispatch and trigger state changes to the store
export const addToCart = (id,qty) => async(dispatch,getState) =>{
 //lets an api call
 const {data} = await axios.get(`/api/products/${id}`)//trying to get product data
 dispatch({
     type:CART_ADD_ITEM,
     payload:{
         product:data._id,
         name:data.name,
         image:data.image,
         price:data.price,
         countInStock:data.countInStock,
         qty
     } //we want to update the state of the product data  
 })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))//passing in key values and use getState function to get the value
                                                //use cart to get from store
                                                //its a string value so we pass in Json, to sent it as avalue from string
}
//now using our action(CART_REMOVE_ITEM) in the new action
//we want to pass a function within afunction we use to more paraments
export const removeFromCart =(id) => (dispatch,getState)=> {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,

    })
//lets update our localstorage
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress =(data) => (dispatch)=> {
//we ass in the form data
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,

    })
//lets update our localstorage
localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod =(data) => (dispatch)=> {
    //we ass in the form data
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data,
    
        })
    //lets update our localstorage
    localStorage.setItem('paymentMethod',JSON.stringify(data))
    }