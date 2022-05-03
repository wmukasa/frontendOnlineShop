import Rating from '../components/Rating'
import { Link } from 'react-router-dom';
import {Breadcrumb,Row,Col,Image} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const CategoryFiltered= ({products,title}) => {
    return ( 
<div>
		<div id="breadcrumb" className="section">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<ul className="breadcrumb-tree">
							<li><Link to='/'>Home</Link></li>
							<li><a href="#">All Categories</a></li>
							<li><a href="#">Tops</a></li>
							<li className="active">{title}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
       <div className="row">

					<div id="aside" className="col-md-3">
						<div className="aside">
						 
							<h3 className="aside-title">Categories</h3>
							<div className="checkbox-filter">
							
								<div className="input-checkbox">
									 <input type="checkbox" id="category-1"/>
									<label for="category-1">
										<span></span>
                    						T-Shirt
										<small>(120)</small>
									</label>
								</div>
							
								<div className="input-checkbox">
									 <input type="checkbox" id="category-2"/>
									<label for="category-2">
										<span></span>
										Sweaters
										<small>(740)</small>
									</label>
								</div>

								<div className="input-checkbox">
									<input type="checkbox" id="category-3"/>
									<label for="category-3">
										<span></span>
										Dresses
										<small>(1450)</small>
									</label>
								</div>

								<div className="input-checkbox">
									 <input type="checkbox" id="category-4"/>
									<label for="category-4">
										<span></span>
										Bottom
										<small>(578)</small>
									</label>
								</div>

								<div className="input-checkbox">
									 <input type="checkbox" id="category-5"/>
									<label for="category-5">
										<span></span>
										Coats
										<small>(120)</small>
									</label>
								</div>

								<div className="input-checkbox">
									<input type="checkbox" id="category-6"/>
									<label for="category-6">
										<span></span>
										Uniforms
										<small>(740)</small>
									</label>
								</div>
                <div className="input-checkbox">
									<input type="checkbox" id="category-6"/>
									<label for="category-6">
										<span></span>
										Shoes
										<small>(740)</small>
									</label>
								</div>
                <div className="input-checkbox">
									<input type="checkbox" id="category-6"/>
									<label for="category-6">
										<span></span>
										Throw Ons
										<small>(740)</small>
									</label>
								</div>
							</div>
						</div>

						<div className="aside">
							<h3 className="aside-title">Brand</h3>
							<div className="checkbox-filter">
								<div className="input-checkbox">
									 <input type="checkbox" id="brand-1"/>
									<label for="brand-1">
										<span></span>
										Shoes
										<small>(578)</small>
									</label>
								</div>
								<div className="input-checkbox">
									<input type="checkbox" id="brand-2"/>
									<label for="brand-2">
										<span></span>
										Throw Ons
										<small>(125)</small>
									</label>
								</div>

							</div>
						</div>

						<div className="aside">
							<h3 className="aside-title">Top selling</h3>
							<div className="product-widget">
								<div className="product-img">
									{/* <img src="./img/product01.png" alt=""> */}
								</div>

							</div>
						</div>

					</div>

          <div id="store" className="col-md-9">

						<div className="store-filter clearfix">
							<div className="store-sort">
								<label>
									Sort By:
									<select className="input-select">
										<option value="0">Popular</option>
										<option value="1">Position</option>
									</select>
								</label>

								<label>
									Show:
									<select className="input-select">
										<option value="0">20</option>
										<option value="1">50</option>
									</select>
								</label>
							</div>
							{/* <ul className="store-grid">
								<li className="active"><i className="fa fa-th"></i></li>
								<li><a href="#"><i className="fa fa-th-list"></i></a></li>
							</ul> */}
						</div>

           			<div className="row">
						<div className="clearfix visible-lg visible-md"></div>
							<div className="clearfix visible-lg visible-md visible-sm visible-xs"></div>
							{
			        products.map(product=>(
							<div className='col-md-4 col-xs-6' >
								<div className='product' key={product._id}>
									<div className='product-img'>
										<Link to={`/products/${product._id}`}>
											<Image src={product.image} alt={product.name} fluid/>
										</Link>
									   
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
            </div>


           </div>
    </div>
     );
}
 
export default CategoryFiltered;
