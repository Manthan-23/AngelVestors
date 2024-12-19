import React, {useState} from 'react'
import './signupin.css'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignupIn = () => {

  const navigate = useNavigate();

  const [investor, setInvestor] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = e => {
    const{name, value} = e.target
    console.log(name, value)
    setInvestor({
      ...investor,
      [name]:value,
    });
  }

  const registerInv = () => {
    const {fullName, email, password } = investor
    if( fullName && email && password && (password === password) ){
    axios.post("http://localhost:3001/api/signupin", investor)
    .then(res => {
      if(res.status === 201){
        alert("Registered Successfully! Please Login")
        navigate("/loginin");
        sessionStorage.setItem('email', JSON.stringify(email));
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
    
    <body id="signup-in_body">
    <div id="signup-in_f_body">
        {/* <!-- <img id="signup_img_1" src="signup_startup_image.svg"/> --> */}

        <div id="company_name">
            AngelVestors🚀
        </div>
        <br/>
        

        <div id="signup-in_heading">
        A few clicks away from<br/>kickstarting your Startup 
        </div>

        {/* <!-- <img id="signup_img_1" src="signup_startup_image.svg"/> --> */}
        <br/>
        <br/>
        <div id="register">
            <div id="reg_h">Register</div>
            <br/>
            <br/>
            
            <h6 id="r1">Let's get you all set up and begin setting
            up your profile.</h6>
            <br/>
            <br/>
            <br/>
            
            
            <label>Full Name:</label><br/> 
            <input class='inputIn' type="text" size="35" name='fullName' defaultValue={investor.fullName} onChange={handleChange}/><br/>

            <label>Email:</label><br/>
            <input class='inputIn' type="text" size="35" name='email' defaultValue={investor.email} onChange={handleChange}/><br/>

            <label>Password:</label><br/>
            <input class='inputIn' type="text" size="35" name='password' defaultValue={investor.password} onChange={handleChange}/><br/><br/>

            <Link to="/loginin"><h4 className='alsInSta'>Already a user? Login</h4></Link>

            <div class="tacbox">
                <input id="checkbox" type="checkbox" />
                <label id="clabel" for="checkbox"> I agree to these <a href="#"> Terms and Conditions</a>.</label>
              </div>

        <br/>
            
              <button id="button_reg1" onClick={registerInv}>Register</button>

        
        </div>
        

        
    </div>
</body>
    
    </>
  )
}

export default SignupIn