import React from 'react'
//import { Container,Row,Col} from 'react-bootstrap'

function Footer() {
    return (
        <footer>	

			<div id="bottom-footer" className="section">
				<div className="container">	
					<div className="row">
						<div className="text-center py-3"> 
							<span className="copyright">
							Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | 2021 <i class="fa fa-heart-o" aria-hidden="true"></i> by Mukasa William
							</span>
						</div>
					</div>
						
				</div>
			
			</div>
			
        </footer>
    )
}

export default Footer
