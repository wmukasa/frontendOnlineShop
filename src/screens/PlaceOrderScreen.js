import React,{useState,useEffect}from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'
import {ORDER_CREATE_RESET} from '../constants/OrderConstants'


function PlaceOrderScreen({history}) {

    const orderCreate = useSelector(state=>state.orderCreate)
    //lets dis structure this
    const {order,error,success} = orderCreate
    const dispatch = useDispatch() 
    const cart = useSelector(state => state.cart)
    //Now creating our dynamic items
    //we are setting our attribute here
    //we use the method reduce and accumulator and starting value is zero
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+item.price * item.qty,0).toFixed(2)
    //if the price is 0 then we set it to 5000 shs
    cart.shippingPrice = (cart.itemsPrice > 100000 ? 0: 5000).toFixed(2)
    cart.taxPrice = Number((0.18)*cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)
    
    //if we already have our order id, we need to send the user to the user's profile to view the order
    if (!cart.paymentMethod) {
        history.push('/payment')
        dispatch({type:ORDER_CREATE_RESET})
    }
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)

        }
    }, [success, history])
    const placeOrder = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery</h2>
                            <p>
                                <strong>
                                    Address:
                                    {cart.shippingAddress.address},{cart.shippingAddress.city},
                                    {' '}
                                    {cart.shippingAddress.postalCode}
                                    {' '}
                                    {cart.shippingAddress.country}
                                </strong>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>
                                    Method:
                                    {cart.paymentMethod}
                                </strong>
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <p>
                                <strong>
                                {/* if the array of the cart items the array is zero */}
                                {cart.cartItems.length === 0 ? <Message variant='info'>
                                    Your cart is empty
                                </Message> :(
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item,index) =>(
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X Shs {item.price} = Shs {(item.qty * item.price)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                             </strong>
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item:</Col>
                                    <Col>Shs {cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery:</Col>
                                    <Col>Shs {cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Shs {cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Shs {cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                { error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                type='button'
                                className='btn-block'
                                disabled = {cart.cartItems === 0}
                                onClick ={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>  
            </Row>   
        </div>
    )
}

export default PlaceOrderScreen
