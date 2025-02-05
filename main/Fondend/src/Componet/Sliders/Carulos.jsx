import React from 'react'
import './slider.scss'

const Car = ({data}) => {
  return (
    <div>
        <img className='image-size' src={data?.Images} alt="" />
        {/* <h1>{data?.Title}</h1> */}
    </div>
  )
}

export default Car
