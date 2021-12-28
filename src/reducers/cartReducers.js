import { CART_ADD_ITEM,
        CART_REMOVE_ITEM,
        CART_SAVE_SHIPPING_ADDRESS,
        CART_SAVE_PAYMENT_METHOD,

        CART_CLEAR_ITEMS
        } from '../constants/cartConstants'


export const cartReducer =(state ={cartItems:[],shippingAddress:{}},action) =>{//adding the item to the cart incase it is not there
    switch(action.type){
        case CART_ADD_ITEM:
            const item =action.payload //the payload will be the item
            const existItem = state.cartItems.find(x => x.product === item.product)//using the find method to find that to be added exits or not
            if(existItem){//if it does exists
                return{
                    ...state,//current state
                    cartItems: state.cartItems.map(x=>
                        x.product === existItem.product ? item :x)//map the item in the cart and if item matches the item in cart
                                                    //we just want to update
                                                    //product is the product id
                                                    //=== means matches 
                                                    //existItem.product that is the existing product ? replace it with new item
                }
            }else{
                return{
                    ...state,//returns the original state
                    cartItems:[...state.cartItems,item]//...spreading the state to original, and adds new item to original

                }
            }
    //now we build our case remove item 
            case CART_REMOVE_ITEM:
                return {
                    //using the state operator for the state
                    ...state,
                    //we wanna filter out the value in the cart items, we use filter method
                    //set the value to x and then we use the error function
                    cartItems:state.cartItems.filter(x => x.product !== action.payload)
                }
            case CART_SAVE_SHIPPING_ADDRESS:
                return{
                    //here we just want to return the original state
                    ...state,
                    //we want to modify our shipping address
                    shippingAddress:action.payload//payload is the form data
                }
            case CART_SAVE_PAYMENT_METHOD:
                return{
                    ...state,
                    paymentMethod:action.payload
                }
            case CART_CLEAR_ITEMS:
                return{
                    ...state,
                    cartItems:[]
                }
        default:
            return state
    }

}