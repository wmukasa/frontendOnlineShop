import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

function SlickContainer({product}){
    
    return (
        <Card className="my-3 p-3 rounded" style={{width:365}}>
             <Link to={`/products/${product._id}`}>
                <Card.Img src={product.image} style={{height: 280}}/>
             </Link>
             <Card.Body>
             <Link to={`/products/${product._id}`}>
                <Card.Title as="div">
                    <strong>
                        {product.name}
                    </strong>
                </Card.Title>
             </Link>
             <Card.Text as="div">
                 <div className="my-2">
                    <Rating value={product.rating} text={`${product.numReviews} ratings`}color={'#f8e825'} /> 
                 </div>
             </Card.Text>
             <Card.Text as="h3">
                 {product.price}/=
             </Card.Text>
             </Card.Body>
        </Card>
    )
}

export default SlickContainer
