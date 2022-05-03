import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel,Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import {listTopProducts} from '../actions/productActions'
function ProductCarousel() {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {error,loading,products} =productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },dispatch)
    return ( loading ? <Loader/>//if we are loading , lets just put that loader
        :error//else we check if we have an error
        ? <Message variant=''>{error}</Message>
        :(
            <Carousel pause='hover' 
            //  style={{backgroundColor:"#2E8B57"}}
            
             style={{ 
                //backgroundImage: `url(${'/build/images/shoppingClothing11.jpg'})`,
                backgroundImage:`url(${"staticfiles/images/shoppingClothing11.jpg"})`,
                backgroundRepeat: 'no-repeat',
                
                }}>
             
                { products.map(product =>(//we map through products the color was bg-dark
                    <Carousel.Item key={product._id}>
                        {/* react requires a key  */}
                        <Link to={`/products/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid/>
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name}({product.price}/=)</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
    )
}

export default ProductCarousel
