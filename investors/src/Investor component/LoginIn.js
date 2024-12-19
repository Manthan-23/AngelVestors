import React, {useState} from 'react'
import './loginin.css'
import { Navigate, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { setIn } from 'formik';

const LoginIn = () => {

  const navigate = useNavigate();

  const [userType, setUserType] = useState(null);

  const [investor, setInvestor] = useState({
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
    // getUserData(value);
    
  };


  const loginin = async (event) => {
    event.preventDefault();
   
     console.log(investor);

   

     const {email, password} = investor;
     
     const loginData2 = {
       email : email,
       password : password,
     };

     axios.post("http://localhost:3001/api/loginin", loginData2)
     .then(res => {
       
       
       if(res.status === 200){
         
         alert("Login Succesful")
         console.log(res.data);
         console.log(res.data.token1);
         sessionStorage.setItem('token', JSON.stringify(res.data.token1));
         sessionStorage.setItem('emailInv', JSON.stringify(res.data.email));
         sessionStorage.setItem('investorId', JSON.stringify(res.data.investorId));
         
         navigate(`/investors`);
         sessionStorage.setItem('investorName', JSON.stringify(res.data.fullName));
        //  sessionStorage.setItem('emailInv', JSON.stringify(email));
        //  sessionStorage.setItem('name', JSON.stringify(res.data.companyName));


        sessionStorage.setItem('userType', 'investor');
        setUserType("investor");


       
        
         
         
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


  return (
    <>
    
    <body id="login_bodyInSta">
    <div id="login_f_bodyInSta">
        {/* <!-- <img id="signup_img_1" src="signup_startup_image.svg"/> --> */}

        <div id="company_nameInSta">
            AngelVestors🚀
        </div>
        <br/>
        

        <div id="login_headingInSta">
        A few clicks away from<br/>kickstarting your Startup 
        </div>

        {/* <!-- <img id="login_img_1" src="signup_startup_image.svg"/> --> */}

        <br/>
        <br/>
        <br/>
        <div id="loginInSta">
            <div id="login_hInSta">Login</div>
            <br/>
            <br/>
            
            <h6 id="r1InSta">Welcome back! Let's start investing again!</h6>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <form class="InLoForm" onSubmit={loginin}>
            <label class="labelInSta">Email:</label><br/>
            <input class="inputInSta" type="text" size="35" name='email' defaultValue={investor.email} onChange={handleChange} required/><br/>
<br/>
            <label class="labelInsta">Password:</label><br/>
            <input class="inputInSta" type="text" size="35" name='password' defaultValue={investor.password} onChange={handleChange} required/><br/><br/>

            <Link to="/signupin"><h4 className='alsInSta'>Not registered yet? Register</h4></Link>

        
            <button id="button_loginInSta">Login</button>
            </form>
            

        
        </div>



    </div>

   
</body>

    </>
  )
}

export default LoginIn