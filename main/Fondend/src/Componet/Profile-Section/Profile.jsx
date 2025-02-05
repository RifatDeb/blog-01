import { useState } from 'react'
import Axios from 'axios';
import { Container,Row,Col} from 'react-bootstrap'
import './profile.scss'
import { useGlobalState } from '../../Componet/State/provider'
import { domain, getheader } from '../../env';

const Profile = () => {

    const [{ profile}, dispatch] = useGlobalState()
  console.log(profile);

    const [image,setImage] = useState(null)
    // console.log(image, 'fffffff');
    
    const [email,setEmail] = useState(profile?.ProUser.email)
    const [first_name,setFirst_name] = useState(profile?.ProUser.first_name)
    const [last_name,setLast_name] = useState(profile?.ProUser.last_name)
     
   
    const updateprofileimage = async() => {
      const fromdata = new FormData()
      fromdata.append('Images',image)
      await Axios({
        method: "post",
        url:`${domain}/api/updateprofileimage/`,
        headers: getheader,
        data:fromdata
      }).then(res =>{
          console.log(res.data)
         dispatch({
           type:"PAGE_RELOAD",
           pagereload:res.data
        })
         alert(res.data["message"])
      })
     }
  
   const userdataupdate = async() =>{
    await Axios({
      method: "post",
      url:`${domain}/api/userdataupdate/`,
      headers:getheader,
      data:{
        "first_name":first_name,
        "last_name":last_name,
        "email":email
      }
    }).then(res => {
    //  console.log(res.data, "$$ post data");
     dispatch({
      type:"PAGE_RELOAD",
      pagereload: res.data
    })
    
    })
    
   }

  
    
  return (
    <Container>
        <Row> 
            <Col>
            <div>

            <div className='profile-body'>
                <div className="profile">
                <img className='profile-img' src={`${domain}${profile?.Images}`}alt="" />
                </div>
                
                 </div>
            
      <div>
<h3> UserName : {profile?.ProUser?.username}</h3>
<p> Name : {profile?.ProUser?.first_name} {profile?.ProUser?.last_name}</p>

<p> Email : {profile?.ProUser?.email}</p>
         
      </div>
      <h3> profile Update </h3>
      <div> 
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button onClick={updateprofileimage} className='btn btn-primary'>Update</button>
      </div>

   
      <div>
        <label> UserEmail</label>
        <input type="text" onChange={e =>setEmail (e.target.value)} placeholder='Enter your Email' value={email} />
      </div>
      <div>
        <label> FastName</label>
        <input type="text" onChange={e =>setFirst_name (e.target.value)} placeholder='Enter your FastName'value={first_name} />
      </div>
      <div>
        <label> LastName</label>
        <input type="text" onChange={e =>setLast_name (e.target.value)} placeholder='Enter your LastName' value={last_name} />
      </div>
      <button className='btn btn-primary' onClick={userdataupdate}>Update</button>
      </div>
            </Col>
        </Row>
     
      
    </Container>
  )
}

export default Profile
