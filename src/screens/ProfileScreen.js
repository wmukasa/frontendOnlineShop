import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import {LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
//we are dispatch our action in our profileScreen
import {USER_UPDATE_PROFILE_RESET} from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
function ProfileScreen({history}) {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    //we want to destructure that
    const {error,loading,user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile 

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading:loadingOrders,error:errorOrders,orders} = orderListMy

    useEffect(() => {
        if(!userInfo)
        {
            history.push('/login')
        }else{
            //we create two actions, another dependecy
            //we check if we don't have/downloaded user information and if
            if(!user || !user.name || success || userInfo._id !== user._id){
                //as success is true before or after, we want to clear our state
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user,success])//adding success to our dependences
    const submitHandler =(e) =>{
        e.preventDefault()
        //console.log('Submitted')
        if( password != confirmPassword){
            setMessage('Password do not match')
        }else{
            //we want to dispatch this our user profile screen if our password match
            dispatch(updateUserProfile({
                'id':user._id,
                'name':name,
                'email':email,
                'password':password
            }))//here we send in the user object 
            setMessage('')   
        }     
    }
    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}
            >
                <Form.Group controlid='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    required
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                    >

                    </Form.Control>

                </Form.Group>
                <Form.Group controlid='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} //on change we want to update our value
                                    //it going to be an error function, we take in the event
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlid='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} //on change we want to update our value
                                    //it going to be an error function, we take in the event
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlid='passwordConfirm'>
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} //on change we want to update our value
                                    //it going to be an error function, we take in the event
                    > 
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders?(
                    <Loader/>
                ):errorOrders ?(
                    <Message variant='danger'>{errorOrders}</Message>
                ):(
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                                    <tr>
                                        <td>{order._id}</td> 
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>Shs {order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) :(
                                            <i className='fas fa-times' style={{ color:'red'}}></i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
