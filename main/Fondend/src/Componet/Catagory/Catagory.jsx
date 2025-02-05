import Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { domain } from '../../env'
import SingelcCatagoryLink from '../../Componet/Catagory/SingelcCatagoryLink '
import { useNavigate } from 'react-router-dom'






const Catagory = () => {
    const [Catagorys,setCatagorys]=useState(null)
    useEffect(()=>{
        const getcatagory =async()=>{
        await Axios({
            method:"get",
            url: `${domain}/api/catagoryhedingview/`

        }).then(res=>{
            console.log(res.data, 'Backen data');
            setCatagorys(res.data)
            
        }).catch((erro)=>{
           console.log("catagory pages", erro );
           
        })
        }
        getcatagory()
    },[])

    const history = useNavigate()

    const redirectPage = ()=>{
        history('/blog')
    }
     
    
  return (
    <div>
     <button onClick={redirectPage} className='btn'> <samp> All Blog</samp></button>
        {
            Catagorys?.map((item, i)=>(
<button className='btn' key={i}> 
   
<SingelcCatagoryLink  data={item}/>


</button>
               
               
            
            ))
        }
      
    </div>
  )
}

export default Catagory
