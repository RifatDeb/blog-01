import Axios from 'axios'
import React,{useEffect, useState} from 'react'
 import { useParams } from 'react-router-dom'
 import { domain } from '../../env'
import { Container,Row,Col } from 'react-bootstrap'
import BlogComponet from '../All_Blog/BlogComponet'

const SingelCatagory = () => {
    const { id } = useParams()
    const [bolgCatagory,setbolgCatagory] = useState(null)
   
    useEffect(()=>{
      const getcatagory = async()=>{
        await Axios({
          method:"get",
          url: `${domain}/api/singelcatagory/${id}/`
        }).then(res=>{
          console.log(res.data[0], "gggggggggggggggg");
          setbolgCatagory(res.data[0])
          
        })
        
      }
      getcatagory()

    },[])

   
    
    
  return (
    <Container>
      <Row>
      {
        bolgCatagory?.blog?.map((item, i)=>(
           <Col md={6} sm={12} lg={4} key={i}> 
           <div> 
          
  
  
<BlogComponet  data={item} />
</div>
          </Col>
        ))
      }

</Row>
    
    </Container>
  )
}

export default SingelCatagory
