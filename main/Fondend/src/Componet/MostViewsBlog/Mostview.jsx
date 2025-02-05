import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { domain } from '../../env'

import { Container,Row,Col} from 'react-bootstrap'
import BlogComponet from '../All_Blog/BlogComponet'

const Mostview = () => {
    const [mostView, setMostView] = useState(null)
    useEffect(()=>{
        const getMostViews = async()=>{
            await axios ({
                method: 'get',
                url: `${domain}/api/mostview/`
            }).then(res=>{
                console.log(res.data, 'Most view blogs');
                setMostView (res.data)
                
            })
        } 
        getMostViews()
    },[])
  return (
    <Container>
      <Row>
        <h2> Most Views Blogs</h2>

        {
            mostView?.length !==0 && <>
            {
                mostView?.map((item , i)=>(
                    <Col md={6} sm={12} lg={4} key={i} > <BlogComponet data={item?.blogpost} /> </Col>
                ))
            }
            </>
        }

      </Row>
    </Container>
  )
}

export default Mostview
