
import { Container,Row,Col} from 'react-bootstrap'
import Axios from 'axios'
import React, { useState } from 'react'
import { domain, postheader} from '../../env'
import { useGlobalState } from '../State/provider'
import './contract.scss'

const EmailSent = () => {
  const [{ profile, pagereload}, dispatch] = useGlobalState()
    const [email,setEmail]=useState('')
    const [Subject, setSubject] = useState('')
    const [body, setBody] = useState('')

     const sendEmail = () =>{
        Axios({
            method: 'post',
            url:`${domain}/api/sendmail/`,
            headers:postheader,
            data:{
                'to': email,
                'subject': Subject,
                'message_body': body + "i need website in this time",
                
            }
        }).then(res=>{
            console.log(res.data);
            alert(res.data.message)
             window.location.href='/'
        })
    }
  return (
    <Container>
        <Row>
            <h2> Contract me </h2>
            <Col>
            <div className="from-item">
            <label> Email</label>
            <input onChange={e => setEmail(e.target.value)} type="text" placeholder='Enter your Email' />
            </div>
            
            <div className="from-item">
            <label> Subject</label>
            <input onChange={e => setSubject(e.target.value)} type="text" placeholder='Enter your Subject' />
            </div>
            
            <div className="from-item">
            <label> Body</label>
            <textarea onChange={e => setBody(e.target.value)} placeholder=' Enter Your Message'> </textarea>
            </div>
            <button className='btn btn-primary' onClick={sendEmail}> Send</button>
            

            
            </Col>
        </Row>
      
    </Container>
  )
}

export default EmailSent
