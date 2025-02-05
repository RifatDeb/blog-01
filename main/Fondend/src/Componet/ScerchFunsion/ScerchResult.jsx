import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain } from '../../env'
import { Container, Row, Col} from 'react-bootstrap'
import BlogComponet from '../All_Blog/BlogComponet'




const ScerchResult = () => {
   
        const { q } = useParams ()
        const [reasult, setreasult] = useState(null)
        console.log(reasult);
        

        useEffect(()=>{
            const getScharce = async() =>{
              await axios({
                method: 'get',
                url: `${domain}/api/searchview/${q}/`
              }).then(ress=>{
                console.log(ress.data, ' svrce resualt');
                setreasult (ress.data)
                
              })
      
            }
            getScharce()
      
          },[q])
  return (
   <Container>
    <h1> Scearch Reasual for : {q}</h1>
  <Row>

    {
      reasult?.BlogPost.length !==0 && <>
{
      reasult?.BlogPost.map((item, i)=>(
        <Col sm={12} md={6} lg={4} lgx={5}> <BlogComponet data={item} /> </Col>
      ))
    }

      </>
    }


  </Row>
      
    </Container>
  )}

export default ScerchResult
