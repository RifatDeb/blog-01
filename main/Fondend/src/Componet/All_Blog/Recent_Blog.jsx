import React, { useEffect, useState } from 'react'
import {Container,Row,Col} from 'react-bootstrap';
import Catagory from '../Catagory/Catagory';
import axios from 'axios'

import { domain } from '../../env'
// import { Link } from 'react-router-dom'
import BlogComponet from './BlogComponet';

const Recent_Blogs = () => {
  const [blog, setblog]= useState(null)
  useEffect(()=>{
    const getBlog = async()=>{
      await axios({
        method:"get",
        url: `${domain}/api/recentblogview/`
      }).then(res=>{
        console.log(res.data , '$$$$$$$$$$blog');
        setblog(res.data)
        
      })
    }
    getBlog()
  },[])

  
  
  return (
    <Container>
     
        <div> <h2>Latest Post</h2></div>
        <Catagory />
        <Row>
            

            {
              blog?.map((item,i )=>(
                <Col key={i} sm={12} md={6} lg={4}>
                  <BlogComponet data={item} /> 
                </Col>
              ))
            }
           

            
            
        </Row>
    </Container>
  )
}

export default Recent_Blogs
