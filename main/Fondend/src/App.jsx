import React, { useEffect } from 'react'
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import  Axios  from 'axios';
import Home from './Pages/Home';
import About from './Pages/About';
import Contract from './Pages/Contract';
import Blog from './Pages/Blog';
import './app.css'
import SingelCatagory from './Componet/Catagory/SingelCatagory';
import SingelBlog from './Componet/All_Blog/SingelBlog';
import Navigation from './Componet/Navigations/Nabver';
import ScerchResult from './Componet/ScerchFunsion/ScerchResult';
import Footer from './Componet/Footer/Footer';
import { domain,getheader,token } from './env';
import { useGlobalState } from './Componet/State/provider';
import ProfilePage from './Pages/ProfilePage';
import LoginPage from './Pages/LoginPage';
import RegistarPage from './Pages/RegistarPage';

const App = () => {
  const [{ profile, pagereload}, dispatch] = useGlobalState()
  console.log(profile, "$$$$urser profile");

  
  
   console.log(token)
  useEffect(()=>{
    if(token !== null ) {
      const getdata = async() =>{
        await Axios({
          method:"get",
          url:`${domain}/api/profile/`,
          headers:getheader,
        }).then(res =>{
            console.log(res.data['data'], "$user hear")
          dispatch({
            type:"ADD_PROFILE",
            profile:res.data["data"],
          })
        })
       
      }
      getdata()
     }
    
  
  },[pagereload])

  return (
    <>
 
   
    <BrowserRouter>
    <Navigation />
    <Routes>

    < Route path='/' element={ < Home /> } />
      < Route path='/about' element={ < About /> } />
      < Route path='/contract' element={ < Contract /> } />
      < Route path='/blog' element={ < Blog /> } />
      <Route path="/category/:id" element={ <SingelCatagory />} />
      <Route  path="/singelblog/:id" element={ <SingelBlog />} />
      <Route path="/scerchresualt/:q" element={ <ScerchResult />} />


     
      {
      profile !==null ?(
        <>
         
         <Route path="/ProfilePage" element={<ProfilePage />} />
        
      </>
      ):
      (  
        <>
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegistarPage" element={<RegistarPage />} />
        </>
      )
     
    }
     

    </Routes>
    <Footer />
    </BrowserRouter>
    </>
   
  )
}

export default App
