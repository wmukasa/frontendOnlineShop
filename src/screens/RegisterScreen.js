import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({location,history}) {

    //we set the two sets
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] :'/'

    const userRegister = useSelector(state => state.userRegister)
    //we want to destructure that
    const {error,loading,userInfo} = userRegister

    useEffect(() => {
        if(userInfo)
        {
            history.push(redirect)
        }
    },[history,userInfo,redirect])
    const submitHandler =(e) =>{
        e.preventDefault()
        //console.log('Submitted')
        if( password != confirmPassword){
            setMessage('Password do not match')
        }else{
            dispatch(register(name,email,password))
        }
        
    }
    return (
        <FormContainer>
            <h1>Register</h1>
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
                    required
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
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} //on change we want to update our value
                                    //it going to be an error function, we take in the event
                    > 
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?<Link 
                    to={redirect ? `/login?redirect=${redirect}` : '/login'}> 
                        Sign In
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
