import React from 'react'
import './blog.scss'
import { Link, useNavigate } from 'react-router-dom'




const BlogComponet = ({data}) => {

  const history = useNavigate()

  const SingelBlog = ()=>{
 history(`/singelblog/${data?.id}`)

  }
  return (
    <>
  
            <div  onClick={SingelBlog} > 
                <div className="image_section">
                    <img className='blog-image' src={data?.image} alt="" />
                </div>
                <div className="descrition">
                 
                    {/* <p>{data?.date}</p> */}
                    <h3>{data?.titel}</h3> 
                    <p>{(data?.discription).substring(0,140)} <Link>...Rede More</Link></p>
                    
                </div>
            </div>
    </>
  )

}

export default BlogComponet
