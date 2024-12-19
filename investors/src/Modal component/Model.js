import React from 'react';
import { Link } from 'react-router-dom';
import './model.css'


const Model = ({closeModal}) => {

  

  return (

    <>
    

<div className='mod-background20'>
<div className='mod20'>
 <div className="modalContent20">
  <div className="modalHeader20">
    <span className="close20" onClick={() => closeModal(false)}>&times;</span> 
    <h2 id="m_heading20">Signup</h2>
  </div>
  <div className="modalBody20">
    <br/>
    <p id="m_body20">Want to Signup as a Investor or a Start-Up?</p>
    <Link to="/signupin"><button className="btn20" id="l_btn20" >Signup as Investor</button></Link><Link to="/signups"><button className="btn20" id="l_btn20">Signup as Start-up</button></Link>
    
    <hr className="hr1"/>
   
    <h2 id="resume">Resume your journey</h2>
    <Link to="/loginin"><button className="btn20" id="l_btn20">Login as Investor</button></Link><Link to="/logins"><button className="btn20" id="l_btn20">Login as Start-up</button></Link>
  
  </div>
  
 </div>

</div>

</div>
 



</>
  )
}

export default Model;