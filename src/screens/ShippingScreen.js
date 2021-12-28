import React,{useState,useEffect}from 'react'
import {Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

function ShippingScreen({history}) {
    //lets getting the shippingAddress using the dispatchi
    //because our shipping address is within our cart
    const cart = useSelector(state =>state.cart)
    //lets distructure shipping address
    //and we pull out the actual address
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    //these going to be values for shipping form
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        //throwing in values on the action 
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps  step1 step2/>
            <h1>Delivery Address</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlid='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter address'
                    value={address? address: ''}
                    onChange={(e) => setAddress(e.target.value)} 
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlid='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city? city: ''}
                    onChange={(e) => setCity(e.target.value)} 
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlid='postalCode'>
                    <Form.Label>postalCode</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode? postalCode: ''}
                    onChange={(e) => setPostalCode(e.target.value)} 
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlid='country'>
                    <Form.Label>country</Form.Label>
                    <Form.Control
                    required
                    type='text'
                    placeholder='Enter country'
                    value={country? country: ''}
                    onChange={(e) => setCountry(e.target.value)} 
                    >
                    </Form.Control>
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
