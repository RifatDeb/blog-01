import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { domain, getheader} from '../../env'
import { Container,Row,Col} from 'react-bootstrap'
import './blog.scss'
// import { useGlobalState } from '../State/provider'
//  import Form from 'react-bootstrap/Form';




const SingelBlog = () => {
   const { id } = useParams()
   const  [blog, setBlog] = useState(null)
   const [comment, setcomment] = useState (null)
   console.log(comment);
  //  const [{ profile}, dispatch] = useGlobalState()
   
    useEffect(()=>{
    const getsingelBlog = async() =>{
        await Axios ({
            method: "get",
            url: `${domain}/api/singelblog/${id}/`
        }).then(res=>{
            console.log(res.data[0] , "$$$$$$$$$$$SingelBlog ")
            setBlog(res.data[0])
        })
       
    }
    getsingelBlog()
   },[])

   useEffect(()=>{
       const blogView = async() =>{
         await Axios ({
           method: 'post',
           url :`${domain}/api/Addblogview/`,
          
           data:{
             'id':id
           }
         }).then(res =>{
           console.log(res.data,"addviews");
           
         })
       }
       blogView()
     },[])

     const AddComment =async () =>{
      Axios({
       method:'post',
         url :`${domain}/api/commentview/`,
         headers:getheader,
         data:{
           'blogid':id,
           'titel':comment
         }

     }).then(res=>{
      console.log(res.data);
      
     })
    }
  return (
    <Container>
        <Row> 
            <Col>
            <h2>Blog Details</h2>
      <div>
         <img className='image' src={blog?.image} alt="" />
         <p> Catagory</p>
         {
            blog?.catagory?.map((item, i)=>(
               <div key={i}><Link to='/'> {item?.title} </Link> </div>
            ))

         }


         {/* <!---------------> */}
         <div className='blog-view'>
         <p> Blog Viewrs</p>
         <p className='blog-conunt'>( {blog?.view} )</p>
         </div>
      <h2> {blog?.titel}</h2>
      <p>{blog?.discription}</p>
      
      </div>

      <Row>
        <Col md={6} sm={12} lg={6}> 
        <h2> Comment hear</h2>


 <form>
<div>
    <input type="text"  onChange={e => setcomment(e.target.value)} placeholder='Enter Your Comment'  />
    <button  onClick={AddComment} className='Submite-btn'> Submite</button>
</div>
   


</form> 

      
        </Col>
        <Col md={6} sm={12} lg={6}> 
        <div>
        {
            blog?.review && <div> 
                {
                    blog?.review?.map((com,i)=>(
                        <div>
                            <div className='user-section'>
                            <div className="profile-avater" key={i}> <img className='profile-image' src={com?.Profile?.Images} alt="" /></div>
                            <p> {com?.Profile?.ProUser?.username}</p>
                            </div>
                           
                           <p className='comment-text'> {com?.titel}</p>
                         
                             </div>
                        
                    ))
                }
            </div>
        }
    </div>
 
        </Col>
      </Row>
      <div> 
     

   
   
      </div>

            </Col>
        </Row>
      

    </Container>
  )
}

export default SingelBlog
