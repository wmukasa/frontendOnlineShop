import React from 'react'
//import { Container,Row,Col} from 'react-bootstrap'

function Footer() {
    return (
        <footer>	
			<div id="bottom-footer" className="section" >
				<div className="container">	
					<div className="row">
						<div class="col-md-3 col-xs-6">
						<div class="footer">
								<h3 class="footer-title">location</h3>
								{/* <p> JSM fashions is your global online store that delivers latest fashion apparel for you! We have dresses, tops, bottoms and swimwear for girls and ladies. 
									 Enjoy your shopping at haffyfashions.com. </p> */}
								<ul class="footer-links">
									<li><a href="#"><i class="fa fa-map-marker"></i>Opposite Pastor Sempa Church</a></li>
									<li><a href="#"><i class="fa fa-phone"></i>+256-704-160-994</a></li>
									<li><a href="#"><i class="fa fa-envelope-o"></i>wmukasa@gmail.com</a></li>
								</ul>
							</div>
						</div>
						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">SITE INFO</h3>
								<ul class="footer-links">
									<li><a href="#">About Us</a></li>
									<li><a href="#">Privacy Policy</a></li>
									<li><a href="#">Terms & Conditions</a></li>
									<li><a href="#">Sitemap</a></li>
								</ul>
							</div>
						</div>

						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">CUSTOMER Service</h3>
								<ul class="footer-links">
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">My Account</a></li>
									<li><a href="#">Track Order</a></li>
									<li><a href="#">Cancel Order</a></li>
									<li><a href="#">Editing Delivery Adress</a></li>
									
								</ul>
							</div>
						</div>
						<div class="col-md-3 col-xs-6">
							<div class="footer">
								<h3 class="footer-title">HELP CENTER</h3>
								<ul class="footer-links">
									<li><a href="#">Q&A</a></li>
									<li><a href="#">Payment Method</a></li>
									<li><a href="#">Delivery</a></li>
									<li><a href="#">Returns and Exchange</a></li>
								</ul>
							</div>
						</div>
						<div className="text-center py-3"> 
							<span className="copyright">
							Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | 2022 <i class="fa fa-heart-o" aria-hidden="true"></i> by Mukasa William
							</span>
						</div>
					</div>		
				</div>
			</div>	
        </footer>
    )
}

export default Footer
