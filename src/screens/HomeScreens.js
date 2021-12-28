import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col } from 'react-bootstrap'
import Product from '../components/Product'
import  Paginate from '../components/Paginate'
// import products from '../products'
// import axios from 'axios'
import { listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
function HomeScreens(history) {
    // const [products,setProducts] =useState([]);
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading,products,page,pages} =productList

    let keyword =history.location.search
    // console.log(keyword)
    useEffect(() =>{
        // async function fetchProducts(){
        //     const {data} = await axios.get('/api/products/')
        //     setProducts(data)
        // }
        // fetchProducts()
        //now we can have our keyword sent to the backend
        dispatch(listProducts(keyword))
    },[dispatch,keyword])
  
    return (
        <div>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                :error ? <Message variant='danger'>{error}</Message>
                    :
                <div>
                    <Row>
                        {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />
                </div>
                    
            }

        </div>
    )
}

export default HomeScreens
