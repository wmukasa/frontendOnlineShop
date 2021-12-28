import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({step1,step2,step3,step4}) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {/* if step1 is complete */}
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Login</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {/* if step1 is complete */}
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Delivery</Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Delivery</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {/* if step1 is complete */}
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>
            <Nav.Item>
                {/* if step1 is complete */}
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ):(
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps

