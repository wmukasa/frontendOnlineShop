import React,{useState,useEffect}from 'react'
import {Form,Button,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

function PaymentScreen({history}) {
    //lets getting the shippingAddress using the dispatchi
    //because our shipping address is within our cart
    const cart = useSelector(state =>state.cart)
    //lets distructure shipping address
    //and we pull out the actual address
    const {shippingAddress} = cart
    //lets astate
    const [paymentMethod,setPayMethod] = useState('MobileMoney')
    const dispatch = useDispatch()
    //we want to add a condition here if the user has their delivery information added
    if(!shippingAddress.address){
        history.push('/shipping')
    }
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')

    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Payment Method
                    <Col>
                        <Form.Check
                        type='radio'
                        label ='Mobile Money or Airtel Money'
                        id = 'mobilemoney'
                        name = 'paymentMethod'
                        checked
                        onchange = {(e) => setPayMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Label>
            </Form.Group>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
            
        </FormContainer>
    )
}

export default PaymentScreen
