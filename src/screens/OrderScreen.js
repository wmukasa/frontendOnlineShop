import React,{useState,useEffect}from 'react'
import {Button,Row,Col,ListGroup,Image,Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Message'
import {getOrderDetails,deliverOrder} from '../actions/orderActions'
import { ORDER_DELIVER_RESET } from '../constants/OrderConstants'

//from history to match because we want to distructure order id
function OrderScreen({match,history}) {
    const orderId = match.params.id
    const dispatch = useDispatch() 

    const orderDetails = useSelector(state=>state.orderDetails)
    //lets dis structure this
    const {order,error,loading} = orderDetails

    const orderDeliver = useSelector(state=>state.orderDeliver)
    const {error:errorDeliver,loading:loadingDeliver,success:successDeliver} = orderDeliver

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    //Now creating our dynamic items
    //we are setting our attribute here
    //we use the method reduce and accumulator and starting value is zero
    if(!loading && !error){
        order.itemsPrice = order.orderItems.reduce((acc,item) => acc+item.price * item.qty,0).toFixed(2)
    }
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        if(!order || order._id !== Number(orderId) || successDeliver){
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch,order,orderId,successDeliver])
    const deliverHandler =() =>{
        dispatch(deliverOrder(order))
        //console.log('Clicked')
    }
    return loading ?(
        <Loader />
//if we are not loading we want to check if there's an error
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ):(
        <div>
            <h1>Order:{order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>
                                    Address:
                                    {order.shippingAddress.address},{order.shippingAddress.city},
                                    {' '}
                                    {order.shippingAddress.postalCode}
                                    {' '}
                                    {order.shippingAddress.country}
                                </strong>
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'> Delivered on {order.deliveredAt}</Message>
                            ):(
                                <Message variant='warning'>Not Delivered</Message> 
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>
                                    Method:
                                    {order.paymentMethod}
                                </strong>
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'> Paid on {order.paidAt}</Message>
                            ):(
                                <Message variant='warning'>Not Paid</Message> 
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            <p>
                                <strong>
                                {/* if the array of the order items the array is zero */}
                                {order.orderItems.length === 0 ? <Message variant='info'>
                                    Order is empty
                                </Message> :(
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item,index) =>(
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
                                    <Col>Shs {order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery:</Col>
                                    <Col>Shs {order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>Shs {order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>Shs {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && !order.isDelivered &&(
                            <ListGroup.Item>
                                <Button 
                                 type ='button'
                                 className = 'btn btn-block'
                                 onClick ={deliverHandler}
                                >
                                    Mark as Deliver
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>  
            </Row>   
        </div>
    )
}

export default OrderScreen
