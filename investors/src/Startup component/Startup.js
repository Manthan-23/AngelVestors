import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './startup.css';

const Startup = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name:'',
    companyName:'',
    email:'',
    password:'',
    
  });

  const handleChange = e => {
    const{name, value} = e.target
    console.log(name, value)
    setUser({
      ...user,
      [name]:value,
    });
  }

  const register = () => {
    const { name, companyName, email, password } = user
    if( name && companyName && email && password && (password === password) ){
    axios.post("https://angelvestors-backend.onrender.com/api/signups", user)
    .then(res => {
      if(res.status === 201){
        alert("User registered Successfully. Please Login!")
        navigate("/logins")
      }else if(res.status === 500){
        alert("Registration Failed");
        navigate("/");
      }
    })
      
    }else {
        alert("Invalid Input")
    };
    }
    


  return (
    <>
    
    <body id="signup_bodySta">
    {console.log("User", user)}
    <div id="signup_f_bodySta">
        {/* <!-- <img id="signup_img_1" src="signup_startup_image.svg"/> --> */}

        <div id="company_nameSta">
            AngelVestors🚀
        </div>
        <br/>
        

        <div id="signup_headingSta">
        A few clicks away from<br/>kickstarting your Startup 
        </div>

        {/* <img id="signup_img_1Sta" src="signup_startup_image.svg"/> */}

        <div id="registerSta">
            <div id="reg_hSta">Register</div>
            <br/>
            <br/>
            
            <h6 id="r1Sta">Let's get you all set up and begin setting
            up your profile.</h6>
            <br/>
            <br/>
            <br/>
            
         
            
            <label class="Stalabel">Full Name:</label><br/> 
            <input class="inputSta" type="text" size="35" name='name' defaultValue={user.name} onChange={handleChange}/><br/>

            <label class="Stalabel">Company Name:</label><br/>
            <input class="inputSta" type="text" size="35" name='companyName' defaultValue={user.companyName} onChange={handleChange}/><br/>

            <label class="Stalabel">Email:</label><br/>
            <input class="inputSta" type="text" size="35" name='email' defaultValue={user.email} onChange={handleChange}/><br/>

            <label class="Stalabel">Password:</label><br/>
            <input class="inputSta" type="text" size="35" name='password' defaultValue={user.password} onChange={handleChange}/><br/><br/>

            

            <Link to="/logins"><h4 className='alsLoSta'>Already a user? Login</h4></Link>

            <div class="tacboxSta">
                <input id="checkboxSta" type="checkbox" />
                <label id="clabelSta" for="checkbox"> I agree to these <a href="#"> Terms and Conditions</a>.</label>
            </div>

        
            <button id="button_regSta" onClick={register}>Register</button>
            

        
        </div>


    </div>
    

    
   
    </body>
    
    </>
  )
}

export default Startup