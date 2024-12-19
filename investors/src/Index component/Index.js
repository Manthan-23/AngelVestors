import React, { useState } from 'react';
// import Modal from 'react-modal';
import Model from '../Modal component/Model';
import earth from './earth.png';
import angel from './ANGEL.svg';
import startup from './startup.svg';
import './index.css'


const Index = () => {

  const [modalOpen, setModalOpen] = useState(false);
  
  // const modalstyles = {
  //   modal: {
  //     display: "none", 
  //     position: "fixed", 
  //     zIndex: "1", 
  //     paddingTop: "100px", 
  //     left: "0",
  //     top: "0",
  //     paddingLeft: "40rem",
  //     paddingRight: "40rem",
  //     width: "300%", 
  //     height: "10", /* Full height */
  //     overflow: "auto", /* Enable scroll if needed */
  //     backgroundColor: "rgb(0,0,0)", /* Fallback color */
  //     backgroundColor: "rgba(0,0,0,0.4)",/* Black w/ opacity */
  //   },
    
    
    
  //   /* Modal Content */
  //   modalContent: {
  //     position: "relative",
  //     backgroundColor: "#fefefe",
  //     margin: "auto",
  //     textAlign: "center",
  //     padding: "0",
  //     border: "1px solid #888",
  //     width: "80%",
  //     boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
  //     webkitAnimationName: "animatetop",
  //     webkitAnimationDuration: "0.4s",
  //     animationName: "animatetop",
  //     animationDuration: "0.4s",
  //   },
    
  //   /* Add Animation */
  //   WebkitKeyframesAnimatetop: {
  //     from: {
  //     top:"-300px",
  //     opacity: "0",}, 

  //     to: {
  //     top:"0", 
  //     opacity:"1"},
  //   },
    
  //   keyframesAnimatetop: {
  //     from: {top:"-300px", opacity:"0",},
  //     to: {top:"0", opacity:"1"},
  //   },
    
  //   close: {
  //     position: "absolute",
  //     cursor: "pointer",
  //     color: "white",
  //     marginLeft: "74rem",
  //     fontSize: "28px",
  //     fontWeight: "bold",
      
  //   },
    
  //   close: {
  //     color: "#181818",
  //     textDecoration: "none",
  //     cursor: "pointer",
  //   },
    
  //   modalHeader: {
  //     padding: "2px 16px",
  //     backgroundColor: "#5cb85c",
  //     color: "white",
      
      
  //   },
    
  //   modalHeader: {
  //     fontSize: "2.5rem",
      
    
  //   },
    
  //   modalBody: {
  //     padding: "2px 16px",
  //     fontSize: "2rem",
  //     marginBottom: "5rem",
  //   },
    
  //   modalFooter: {
  //     padding: "2px 16px",
  //     backgroundColor: "#5cb85c",
  //     color: "white",
  //   },
    
  //   btn1: {
  //       marginRight: "2rem",
  //       padding: "1rem 2rem 1rem 2rem",
  //       marginTop: "2rem",
  //       backgroundColor: "#1cbe73",
  //       border: "none",
  //       fontSize: "2.3rem",
  //       color: "white",
  //       borderRadius: "1rem",
  //   },
    
  //   btn1: {
  //       backgroundColor: "#19ab67",
  //   },
    
  //   btn2: {
  //     marginLeft: "2rem",
  //     padding: "1rem 2rem 1rem 2rem",
  //     marginTop: "2rem",
  //     backgroundColor: "#1cbe73",
  //     border: "none",
  //     fontSize: "2.3rem",
  //     color: "white",
  //     borderRadius: "1rem",
  //   },
    
  //   btn2: {
  //     backgroundColor: "#19ab67",
  //   },
    
    
  //   // @media(max-width: 768px){
  //   //   html{
  //   //       font-size: 45%;
  //   //   }
    
      
  //   // }
  // }

   const styles = {
    main1: {
      backgroundColor: "#f0fdf6",
    },
    main2: {
      backgroundColor: "#1cbe73",
    },
    main3: {
      display: 'flex',
      paddingRight: "10px",
      cursor:"pointer",
      marginTop: '5px',
    },
    main4: {
      marginRight: "10px", 
      cursor:"pointer",
    },
    main5: {
      cursor:"pointer",
      marginRight: '10px'
    },
    main6: {
      width: "60px",
      backgroundColor: "#7c4dff",
      height: "2px",
    },
    main7: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
    },

   };

  //  const hamburger = document.querySelector(".hamburger");
  //  const navMenu = document.querySelector(".nav-menu");
   
  //  hamburger.addEventListener("click", mobileMenu);
   
  //  function mobileMenu() {
  //      hamburger.classList.toggle("active");
  //      navMenu.classList.toggle("active");
  //  }
   
   // modal
   
  //  var modal = document.getElementById("myModal");
   
  //  // Get the button that opens the modal
  //  var btn = document.getElementById("signup_btn");
   
   
   
  //  // Get the <span> element that closes the modal
  //  var span = document.getElementsByClassName("close")[0];
   
  //  // When the user clicks the button, open the modal 
  //  btn.onclick = function() {
  //    modal.style.display = "block";
  //  }
   
  //  // When the user clicks on <span> (x), close the modal
  //  span.onclick = function() {
  //    modal.style.display = "none";
  //  }
   
  //  // When the user clicks anywhere outside of the modal, close it
  //  window.onclick = function(event) {
  //    if (event.target === modal) {
  //      modal.style.display = "none";
  //    }
  //  }
  
    return (

    <>
    <body>

{/* <div id="myModal" className="modal">


<div className="modalContent">
  <div className="modalHeader">
    <span className="close">&times;</span>
    <h2 id="m_heading">SignUp</h2>
  </div>
  <div className="modalBody">
    <br/>
    <p id="m_body">Want to Signup as a Investor or a Start-Up?</p>
    <button className="btn1" id="l_btn1" >Signup as Investor</button><span className="or1">OR</span><button className="btn2" id="l_btn2">Signup as Start-up</button>
    
    <hr className="hr1"/>
    <br/>
    <h2 id="m_heading">Resume your journey</h2>
    <button className="btn1" id="l_btn1">Login as Investor</button><span className="or2">OR</span><button className="btn2" id="l_btn2">Login as Start-up</button>
  
  </div>
  
</div>

</div> */}




<div id="nav">

<header className="header">
<nav className="navbar">
  <a href="/" className="nav-logo">AngelVestors</a>
    <ul className="nav-menu">
        <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
        </li>
        <li className="nav-item">
            <a href="/" className="nav-link">Explore</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" id="signup_btn" onClick={() => {
              setModalOpen(true);
            }}
            >
              Signup
              </a>
            {modalOpen && <Model closeModal={setModalOpen}/>} 
        </li>
       
        
    </ul>
    <div className="hamburger" id='hamburger'>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
    </div>
</nav>
</header>
</div>

<div id="first_body">
<h1 id="first_heading">Find the perfect Investors<br/>
  for your Start-ups<br/>
  <button id="fbody_button">Get Started</button>
</h1>


</div>

<div id="slogan11">
"If you have a small business, let us help grow it."
</div>

<div id="second_body">
<h3 id="second_heading">Investors for every startups</h3>
</div>
<div id="all_cards">
  <div id="cardg1">
<div id="card1">
  <div className="card">
    <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Technology</h5>
      <p className="card-text">The technology industry consists of companies that sell goods and services in electronics, software, artificial intelligence.</p>
      <a href="/" className="btn btn-success">Explore</a>
    </div>
  </div>
  </div>

  {/* <div id="card2">
  <div className="card" >
    <img src="https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Fintech</h5>
      <p className="card-text">Fintech companies have revolutionized financial services. Currently, 80% of financial institutions use fintech solutions.</p>
      <a href="/" className="btn btn-success">Explore</a>
    </div>
  </div>
  </div> */}
{/* </div> */}



  <div id="card3">
  <div className="card" >
    <img src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Healthcare</h5>
      <p className="card-text">Modern medical devices have become a runaway, leads to the growth of several startups in the medical sector.</p>
      <a href="/" className="btn btn-success">Explore</a>
    </div>
  </div>
  </div>

  <div id="card4">
  <div className="card" >
    <img src="https://img.freepik.com/free-vector/abstract-low-polygonal-graduation-cap-planet-earth-globe-model-map-e-learning-concept_127544-1106.jpg?w=1380&t=st=1673760512~exp=1673761112~hmac=4562e6ecaaa704617e265d62c204ca76143ddbf756dbb5bd5d5bc2a1767cc376" className="card-img-top" alt="..."/>
    <div className="card-body">
      <h5 className="card-title">Edtech</h5>
      <p className="card-text">The edtech industry also owes its rapid growth to the epidemic, and it now plays a crucial role in the educational experience.</p>
      <a href="/" className="btn btn-success">Explore</a>
    </div>
  </div>
  </div>

  <div id="card5">
    <div className="card" >
      <img src="https://img.freepik.com/free-vector/abstract-low-polygonal-graduation-cap-planet-earth-globe-model-map-e-learning-concept_127544-1106.jpg?w=1380&t=st=1673760512~exp=1673761112~hmac=4562e6ecaaa704617e265d62c204ca76143ddbf756dbb5bd5d5bc2a1767cc376" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Artificial Intelligence</h5>
        <p className="card-text">Artificial intelligence has become starting an AI company can put you at the forefront of this growing area.</p>
        <a href="/" className="btn btn-success">Explore</a>
      </div>
    </div>
    </div>

    <div id="card6">
    <div className="card" >
      <img src="https://img.freepik.com/free-vector/abstract-low-polygonal-graduation-cap-planet-earth-globe-model-map-e-learning-concept_127544-1106.jpg?w=1380&t=st=1673760512~exp=1673761112~hmac=4562e6ecaaa704617e265d62c204ca76143ddbf756dbb5bd5d5bc2a1767cc376" className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Artificial Intelligence</h5>
        <p className="card-text">Artificial intelligence has become starting an AI company can put you at the forefront of this growing area.</p>
        <a href="/" className="btn btn-success">Explore</a>
      </div>
    </div>
    </div>
  </div>
  </div>

  <h5 id="explore_more"><a href="/" >Explore More</a></h5>

  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  
  
  
  <div id="third_body">

    <div id="third-body-image">
      <img src={earth} alt='' width="80%"/>
    </div>
    <div id="third_body_txt">
    <h4><span id="s1">A whole world of investors</span></h4>
    <span id="s2">at your fingertips</span>
    
    <br/>
    <br/>
    <div className="txt_2">
    <h5>🚀The best for every startup</h5>
   
    <h6>Find investors as per your needs.</h6>
    <br/>
    <br/>
    <h5>Chat and schedule appointments</h5>

    <h6>Get in touch and start your journey</h6><br/>

    <br/>
    <h5 className="support">👨‍💼24/7 Support</h5>

    <h6>Have questions? Contact anytime</h6>
  </div>
  </div>
    
    
  </div>

  

  <div id="fourth_body">
    <img src={angel} width="35%" alt='image1'/>
    <h4 id="fourth_slogan">"When you want to create a startup bigger,<br/>you need a lot of help, That's why we are here."</h4>
     
  </div>


  <div id="fifth_body_index">
    <div className="fifth-two">
    <h3 id="fifth_heading_index">Find the investor needed to<br/>get your startup growing.</h3>
    <button id="fbody_btn_index">Get Started</button>
  </div>
  </div>

  <img id="fifth_img" src={startup} width="30%" alt=""/>

 
  <br/>
  <br/>
  

  <footer
          class="text-center text-lg-start text-black"
          style={styles.main1}
          >
    
    <section
             class="d-flex justify-content-between p-4"
             style={styles.main2}
             >
     
      <div class="me-5 fs-2">
        <span>Get connected with us on social networks:</span>
      </div>
     
      <div style={styles.main3}>
        
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="white" class="bi bi-facebook" viewBox="0 0 16 16" style={styles.main4}>
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
          </svg>
        
        
        
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="white" class="bi bi-instagram" viewBox="0 0 16 16" style={styles.main5}>
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
       
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="white" class="bi bi-twitter" viewBox="0 0 16 16" style={styles.main4}>
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
          </svg>
        
        
      </div>
      
    </section>
   
    <section class="headers">
      <div class="container text-center text-md-start mt-5">
        
        <div class="row mt-3">
         
          <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
           
            <h2 class="text-uppercase fw-bold">AngelVestors</h2>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={styles.main6}
                />
            <p>
              Let us help you to get the right investor to your
              startup.
            </p>
          </div>
         

          
          <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
           
            <h2 class="text-uppercase fw-bold">About</h2>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={styles.main6}
                />
            <p>
              <a href="/" class="text-black">Contact Us</a>
            </p>
            <p>
              <a href="/" class="text-black">Privacy Policy</a>
            </p>
            <p>
              <a href="/" class="text-black">Terms & Conditions</a>
            </p>
            <p>
              {/* <a href="/" class="text-black"></a> */}
            </p>
          </div>
          

          
          <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
           
            <h2 class="text-uppercase fw-bold">Useful links</h2>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={styles.main6}
                />
            <p>
              <a href="/" class="text-black">Your Account</a>
            </p>
            <p>
              <a href="/" class="text-black">Become an Affiliate</a>
            </p>
            <p>
              <a href="/" class="text-black">Shipping Rates</a>
            </p>
            <p>
              <a href="/" class="text-black">Help</a>
            </p>
          </div>
          

          
          <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            
            <h2 class="text-uppercase fw-bold">Contact</h2>
            <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style={styles.main6}
                />
            {/* <!-- <p><i class="fas fa-home mr-3"></i> New York, NY 10012, US</p> --> */}
            <p><i class="fas fa-envelope mr-3"></i> angelvestors@gmail.com</p>
            {/* <!-- <p><i class="fas fa-phone mr-3"></i> + 01 234 567 88</p> */}
            {/* <p><i class="fas fa-print mr-3"></i> + 01 234 567 89</p> --> */}
          </div>
          
        </div>
        
      </div>
    </section>
    
    <br/>
    <br/>
    
    <div
         class="text-center p-3"
         style={styles.main7}
         >
      © 2023 Copyright:
      <a class="text-black" href="/"
         >AngelVestors</a
        >
    </div>
    
  </footer>







  

  

 
</body>

    </>
  )
}

export default Index;