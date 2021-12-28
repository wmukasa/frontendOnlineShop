import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Row,Col,ListGroup,Form,Button,Card,Image } from 'react-bootstrap'
import Message from '../components/Message'
//using the actions
import { addToCart,removeFromCart } from '../actions/cartActions'

function CartScreen({match,location,history}) {//history helps us to get data from brwoser or url
    const productId = match.params.id 
    const qty = location.search ? Number(location.search.split('=')[1]):1//if this exit split off the equal sign and we are left with the number 
    // console.log('qty:',qty)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart //abstracting the result of cart
    //console.log('carItems:',cartItems)
    useEffect(()=>{ //if product exists
        if(productId){
            dispatch(addToCart(productId,qty))
        }
    },[dispatch,productId,qty])//adding the dependencies
    
    //removeFromErrorHandler
    //we want to dispatch removeFromCart in our removeFromHandler
    const removeFromCartHandler = (id) => {
        //console.log('remove:',id)
        dispatch(removeFromCart(id))
    }
    const checkoutHandler= ()=>{
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {/* first check if we any items in the shope then we add to the cart, give message cart empty or no */}
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>
                //put in our else statement    
                ):(
                    <ListGroup variant='flush'>
                        {/* lets map through the cart items */}
                        {cartItems.map(item => (
                            //every time we are looping this react needs a key,
                            //Remember product is the id of the product
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        {item.price}/=
                                    </Col>
                                    <Col md={3}>
                                    <Form.Control
                                        as="select"
                                        value={item.qty}
                                        //when we dispatch the value we add to the cart
                                        onChange={(e) => dispatch(addToCart(item.product,Number(e.target.value)))}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x)=>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                        type='button'
                                        variant='light'
                                        //using remove and error function
                                        onClick={()=> removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}  
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* acc stand for accumulator  */}
                            <h2>Subtotal ({cartItems.reduce((acc,item)=> acc +item.qty,0)}) items</h2>
                            {cartItems.reduce((acc,item)=> acc +item.qty *item.price,0).toFixed(2)}/=
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length ===0}
                            onClick={checkoutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen

