import React, {useContext, useState} from 'react'
import './login.css'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useFormik} from "formik"
import { verifyPassword } from '../helper/helper'
import Toaster from "react-hot-toast"
import Mainpage from './Mainpage'
import { cookieStorageManager } from '@chakra-ui/react'




export const Login = (props) => {

  

  // const { setEmail } = useContext(UserContext);
  const [userType, setUserType] = useState(null);



  const navigate = useNavigate();


  const [name, setName] = useState('');

  

    const [user, setUser] = useState({
        email:'',
        password:'',
        
      });

      // const [email, setEmail] = useState('');

      


    
      

      const login = async (event) => {
       event.preventDefault();
      
        console.log(user);

      

        const {email, password} = user;
        
        const loginData = {
          email : email,
          password : password,
        };

        const options = {
          secure: false,
          cookieOptions: {
            name: 'token'
          }
        };

        axios.post("http://localhost:3001/api/logins", loginData)
        .then(res => {
          
          
          if(res.status === 200){
            
            alert("Login Succesful")
            console.log(res.data);
            console.log(res.data.userId);
            
            navigate(`/mainpage`);
            sessionStorage.setItem('email', JSON.stringify(email));
            sessionStorage.setItem('name', JSON.stringify(res.data.companyName));
            sessionStorage.setItem('tokenS', JSON.stringify(res.data.token));            


            sessionStorage.setItem('startupId', JSON.stringify(res.data.userId));

            sessionStorage.setItem('userType', 'startup');
            setUserType("startup");          
            
          }else if(res.status === 404){
            alert("User not registered")
            
          }else if(res.status === 400){
            alert("Password didn't match!")
            
          }else if(res.status === 500){
            alert("Login Failed")
            navigate("/");
          }
          // console.log(user, "userRegister");
          
          
        })
      }

      

      const handleChange = e => {
        const{name, value} = e.target
        console.log(name, value)
        setUser({
          ...user,
          [name]:value,
        });
        // getUserData(value);
        
      };

      // const getUserData = async () => {
      //   try{
      //   axios.get(`http://localhost:3001/api/user/${user.email}`)
      //     .then((response) => {
      //       setUserData(response.data);
      //       console.log(response.data);
      //     })
      //    } catch(error) {
      //       console.log(error);
            
            
      //     };
      // }




      

  return (
    <>
    
    <body id="login_bodyLoSta">

    {/* <Toaster position='top-center' reverseOrder={false}></Toaster> */}

    
    <div id="login_f_bodyLoSta">
        {/* <!-- <img id="signup_img_1" src="signup_startup_image.svg"/> --> */}

        <div id="company_nameLoSta">
            AngelVestors🚀
        </div>
        <br/>
        

        <div id="login_headingLoSta">
        A few clicks away from<br/>kickstarting your Startup 
        </div>

        {/* <!-- <img id="login_img_1" src="signup_startup_image.svg"/> --> */}

        <br/>
        <br/>
        <br/>
        <div id="loginSta">
            <div id="login_hLoSta">Login</div>
            <br/>
            <br/>
            
            <h6 id="r1LoSta">Start exploring again where you left!</h6>
            <br/>
            <br/>
            <br/>
            <br/>
            
            
            <form class="StaLoForm" onSubmit={login}>
            <label class="labelLoSta">Email:</label><br/>
            <input class="inputLoSta" id='email' type="text" size="35" name='email' defaultValue={user.email} onChange={handleChange} required/><br/>

<br/>
            <label class="labelLoSta">Password:</label><br/>
            <input class="inputLoSta" id='password' type="text" size="35" name='password' defaultValue={user.password} onChange={handleChange} required/><br/><br/>

            
            <Link to="/signups"><h4 className='alsLoSta'>Not registered yet? Register</h4></Link>

        
            <button type='submit' id="button_loginLoSta">Login</button>
            </form>
           
         
        
        </div>



    </div>

</body>

    </>
);
  }
