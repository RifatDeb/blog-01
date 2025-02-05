import { Col, Container, Row} from 'react-bootstrap';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './navber.scss'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useGlobalState } from '../State/provider';

import { Link} from 'react-router-dom';


const Navigation = () => {
  const [text, setText] = useState("")
  // console.log(text);
const history = useNavigate()

  const Scarch = ()=>{
      history(`/scerchresualt/${text}`);
  }

  const [{ profile}, dispatch] = useGlobalState()



  const logOut =()=> {
    window.localStorage.clear()
    dispatch({
      type:"ADD_PROFILE",
      profile:null

    })
    window.location.href='/'
  }

  return (
    <>
    <Container>
      <Row>
        <Col>
        <Navbar   expand='md'>
    <Container>
      
    <Navbar.Brand> Priti Jadhav</Navbar.Brand>
     
      <Navbar.Toggle aria-controls="responsive" className='hembergar' />
      <Navbar.Collapse id="responsive">
      <Nav className=' ms-auto nav-li'>

      <Nav.Link className='link' as={Link} to={"/"}> Home</Nav.Link>
            <Nav.Link className='link' as={Link} to={"/about"}> About</Nav.Link>
            <Nav.Link  className='link'as={Link} to={"/contract"}> Cantract</Nav.Link>
            <Nav.Link className='link' as={Link} to={"/blog"}>Blog</Nav.Link>
            <input type='text' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Scarch hear'/>
     
          <button className='btn btn-primary' onClick={Scarch} disabled={text.length <=0? true : false}>Scerch</button>

        
        {
          profile !==null ? (
         <>
            <Nav.Link  onClick={logOut}>LogOut</Nav.Link>
            <Nav.Link className='link' as={Link} to={"/ProfilePage"}>Profile</Nav.Link>
         </>
          ) : (
           <>
            <Nav.Link href="/RegistarPage">registar</Nav.Link>
            <Nav.Link href="/loginPage">Login</Nav.Link> 
           </>
          )
        }
       


      </Nav>
      </Navbar.Collapse>
      
     

    </Container>
  </Navbar>
        </Col>
      </Row>

    </Container>
    </>
   
  )
}

export default Navigation
