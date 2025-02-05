import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { domain } from '../../env';
import {Container,Row,Col} from 'react-bootstrap';

import Car from './Carulos';

import Carousel from 'react-bootstrap/Carousel';


const  Slider = () => {
    const [slider, setSlider] = useState(null)
    console.log(slider);
    
    useEffect(()=>{
        const getSliders = async() =>{
            await axios({
                method: "get",
                url: `${domain}/api/slider/`
            }).then(res=>{
                console.log(res.data);
                setSlider(res.data)
                
            })
        }
        getSliders()
    },[])
  return (
    

  <>
    
   <Container fluid>
    <Row>
        <Col>

        <Carousel controls={false} >
       
        {
    slider?.map((item, i)=>(
 <Carousel.Item key={i} interval={1000} >   <Car data={item} /> </Carousel.Item>
     
    )
)

}

</Carousel>
        
        </Col>
    </Row>
   </Container>
       
       
</>
  )
}

export default Slider
