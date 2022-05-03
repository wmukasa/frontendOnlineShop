import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Carousel,Image,Row,Col} from 'react-bootstrap'
import Slider from "react-slick";
import Loader from './Loader'
import Message from './Message'
// import { listProductwithoutPage} from '../actions/productActions'
import SlickContainer from '../components/SlickContainer'
function ProductSlickslider() {

      const dispatch = useDispatch()

      const productList = useSelector(state => state.productList)
      const {error,loading,products} =productList

      // useEffect(()=>{
      //     dispatch(listProductwithoutPage())
      // },dispatch)
      var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
        
      };
        return (
            <div>
              <Row>
                <Slider {...settings}>
                  
                  {
                    
                          products.map(product => (
                           <Col  key={product._id} sm={12} md={6} lg={3} xl={3}>
                            {
                            // <Image src={product.image} alt={product.name} style={{width:200}}/>
                            <SlickContainer product={product}/>
                            }</Col>  
                      )) 
                    
                  }
                 
              </Slider>
              </Row>
        </div>
        );
        }
export default ProductSlickslider