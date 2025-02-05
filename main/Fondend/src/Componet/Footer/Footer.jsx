import React from 'react'
import { Container,Row,Col} from 'react-bootstrap'
import './footer.scss'
import logo1 from '../../assets/facebook.png'


const Footer = () => {
  return (
    <Container fluid className='footer-body'>
     <Row>
        <Col md={6} sm={12}> 
        <Row>
            <Col md={12} lg={6} > 
            <h6>Contact the Publisher</h6>
            <p>mike@runo.com</p>
            <p>+944 450 904 505 </p>
            
            </Col>
            <Col md={12} lg={6} > 
            <h6>Explorate</h6>
            <p>About</p>
            <p>Partners</p>
            <p>Job Opportunities</p>
            <p>Advertise</p>
            <p>Membership</p>
            </Col>
        </Row>
        </Col>
        <Col md={6} sm={12}> 
        <Row>
            <Col md={12} lg={6} > 
            <h6>Headquarter</h6>
            <p>191 Middleville Road,<br />
NY 1001, Sydney
Australia</p>
            </Col>
            <Col md={12} lg={6} > 
            <h6>Connections</h6>
            <div className='images-alinment'>
            <div > <img className='logo' src={logo1} alt="" /> </div>
           <div>  <img className='logo' src={logo1} alt="" />  </div> 
           <div > <img className='logo' src={logo1} alt="" /> </div>
          <div > <img className='logo' src={logo1} alt="" /> </div>
          </div>
            </Col>
        </Row>
        
        </Col>
        
     </Row>
    </Container>
  )
}

export default Footer
