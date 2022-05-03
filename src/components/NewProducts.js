import Rating from '../components/Rating'
import { Link } from 'react-router-dom';
import {Breadcrumb,Row,Col,Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const NewProduct = ({products,title}) => {
    return (  
        <div className="row">
        <div className="clearfix visible-lg visible-md"></div>
            <div className="clearfix visible-lg visible-md visible-sm visible-xs"></div>
                {
                products.map(product=>(
                <div className='col-md-3 col-xs-6' >
                        <div className='product' key={product._id}>
                            <div className='product-img'>
                                <Link to={`/products/${product._id}`}>
                                    <Image src={product.image} alt={product.name} fluid/>
                                </Link>
                                <div class="product-label">
                                    <span class="new">NEW</span>
                                </div>
                            </div>
                            <div className="product-body">
                                <p className="product-category">{product.category}</p>
                                <h6 className="product-name"><Link to={`/products/${product._id}`}>{product.name}</Link></h6>
                                <h4 className="product-price">Shs {product.price}</h4>
                                <div className="product-rating">

                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </div>
                                <div className="product-btns">
                                    {/* <button className="add-to-wishlist"><i className="fa fa-heart-o"></i><span className="tooltipp">add to wishlist</span></button>
                                    <button className="add-to-compare"><i className="fa fa-exchange"></i><span className="tooltipp">add to compare</span></button> 
                                    <button className="quick-view"><i className="fa fa-eye"></i><span className="tooltipp">quick view</span></button>*/}
                                </div>
                            </div>
                            <div className="add-to-cart">
                                <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> add to cart</button>
                            </div>
                        </div>
                    </div>
            )
            )} 

                </div>
    );
}
 
export default NewProduct;