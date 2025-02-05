import React from 'react'

import { useNavigate } from 'react-router-dom'

const SingelcCatagoryLink = ({data}) => {
    const history = useNavigate()
    const ShowCatagory =()=>{
        history(`category/${data?.id}`)
    }
  return (

    <div>

        <samp onClick={ShowCatagory}> {data?.title}</samp>
      
    </div>
  )
}

export default SingelcCatagoryLink
