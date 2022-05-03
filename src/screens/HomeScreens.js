import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {Row,Col, ListGroup,Card,Image } from 'react-bootstrap'
import Product from '../components/Product'
import  Paginate from '../components/Paginate'
import { Link } from 'react-router-dom';
// import products from '../products'
// import axios from 'axios'
import { listProducts} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import ProductSlickslider from '../components/ProductSlickslider'
import Sidebar from '../components/Sidebar'
import ListGroupheader from '../components/ListGroupheader'
import NewProductList from '../components/NewProductList'

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
        <div className="section">
            <div className="container">
            <div className="row">
                
                <div className="col-md-3">
                    <ListGroupheader />
                </div>
                <div className="col-md-9">
                  <div> </div>
                {!keyword && <ProductCarousel/>}
                {/* <div class="row">
        <div className="col-md-6 col-lg-6">
          <div className="widget-small primary coloured-icon"><i className="icon fa fa-users fa-3x"></i>
            <div className="info">
              <h4>Users</h4>
              <p><b>5</b></p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="widget-small info coloured-icon"><i className="icon fa fa-thumbs-o-up fa-3x"></i>
            <div className="info">
              <h4>Likes</h4>
              <p><b>25</b></p>
            </div>
          </div>
        </div>

      </div>
                */}
                </div> 
                <div className="col-md-3">
                    {/* <Card>
                    <div>
                        <h6><i className="fa fa-phone"></i>HELP CENTER</h6>
                        <p>Guide to Customer Care green-question-mark</p>
                        </div>
                        {/* <Image src="/images/green-question-mark.png" /> 

                    </Card> */}
                    {/* <Card>
                         <div className="">
                            <ul className="comment-list">
                               <li className="comment">
                                    <div className="vcard bio">
                                    <Image src="images/product_dress02.jpg" alt="Image placeholder"/>
                                    </div>
                                <div className="comment-body">
                                   <h6>Mukasa</h6>
                               </div>
                              </li>
                              <li className="comment">
                                    <div className="vcard bio">
                                    <Image src="images/product_dress02.jpg" alt="Image placeholder"/>
                                    </div>
                                <div className="comment-body">
                                   <h6>William</h6>
                               </div>
                              </li>
                            </ul>
                         </div>
                    </Card>    */}
                </div>
            </div>
            <div className="col-md-12">
                <div className="section-title" >
                    <h3 className="title">New Products</h3>
                        <div className="section-nav">
                            <ul className="section-tab-nav tab-nav">
                                <li className="active"><a data-toggle="tab" href="#tab2">Tops</a></li>
                               <li><Link  to={`/categoryBlouse`}>Blouse</Link></li>
                                <li><Link to={`/categoryDress`}>Dresses</Link></li>
                                <li><Link to={`/categoryThrowOn`}>Throw Ons</Link></li>
                                <li><Link to={`/categoryTshirts`}>T-shirts</Link></li>
                                <li><a data-toggle="tab" href="#">Bottoms</a></li>
                                <li><a data-toggle="tab" href="#">Uniforms</a></li>
                                <li><a data-toggle="tab" href="#">Shoes</a></li>                
                            </ul>
                        </div>
                </div>
                <NewProductList/>
                {/* <div className="section-title" >
                    <h3 className="title">popular this season</h3>
                </div> */}
                    <div className="card" style={{ color:'white', backgroundColor: '#3CB371'}}>
                            <h5 class="card-header text-center">POPULAR THIS SEASON</h5>
                    </div>
                    <div class="row">
                            <div class="col-sm-6">
                                <div class="card" 
                                style={{ 
                                    //backgroundImage: `url(${'/images/shoppingClothing7.jpg'})`,
                                    backgroundRepeat: 'no-repeat',
                                    // width:'1000px'
                                    //backgroundColor: '#FFE4C4'
                                    height:'250px'
                                    }}>
                                <div class="card-body">
                                    {/* <h5 class="card-title text-center">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                     */}
                                </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card">
                                <div class="card-body"
                                    style={{ 
                                        //backgroundImage: `url(${ '/images/background1.jpg'})`,
                                         backgroundRepeat: 'no-repeat',
                                        //backgroundColor: '#FFE4C4'
                                        height:'250px'
                                        }}>
                                    {/* <h5 class="card-title">Special title treatment</h5>
                                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                                    
                                </div>
                                </div>
                            </div>
                            </div>
            </div>
            
            {loading ? <Loader/>
                :error ? <Message variant='danger'>{error}</Message>
                    :
                <div>
                    <Row>
                        {/* {products.map(product =>(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))} */}
                        <ProductSlickslider/>
                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword} />

                    {/* <!-- Products tab & slick --> */}
               
                </div>        
            }
        {/* {!keyword && <ProductSlickslider/>} */}
        {/* hot deal sections */}
		<div id="hot-deal" className="section">
			<div className="container">	
				<div className="row">
					<div className="col-md-12">
						<div className="hot-deal">
							<ul className="hot-deal-countdown">
								<li>
									<div>
										<h3>02</h3>
										<span>Days</span>
									</div>
								</li>                      
								<li>
									<div>
										<h3>10</h3>
										<span>Hours</span>
									</div>
								</li>
								<li>
									<div>
										<h3>34</h3>
										<span>Mins</span>
									</div>
								</li>
								<li>
									<div>
										<h3>60</h3>
										<span>Secs</span>
									</div>
								</li>
							</ul>
							<h2 className="text-uppercase">hot deal this week</h2>
							<p>New Collection Up to 50% OFF</p>
							<a className="primary-btn cta-btn" href="#">Shop now</a>
						</div>
					</div>
				</div>
			</div>
        </div>
         {/* end of hot deal sections */}
            <Row>
            
         <div className="col-md-12">
						<div className="section-title">
							<h3 className="title">Top selling</h3>
							<div className="section-nav">
								<ul className="section-tab-nav tab-nav">
                                    <li className="active"><a data-toggle="tab" href="#tab2">Tops</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Dresses</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Bottoms</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Kitenge</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Uniforms</a></li>
								</ul>
							</div>
						</div>
					</div>
                    <ProductSlickslider/>

            </Row>
            </div>
        </div>
      
    )
}

export default HomeScreens
