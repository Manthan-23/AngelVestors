import './App.css';
import Index from './Index component/Index';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Startup from './Startup component/Startup';
import { Login } from './Startup component/Login';
import SignupIn from './Investor component/SignupIn';
import LoginIn from './Investor component/LoginIn';
import { useState } from 'react';
import Mainpage from './Startup component/Mainpage';
import MainModal from './Startup component/MainModal';
import Investors from './Investor component/Investors';
import axios from 'axios';
import { ChakraProvider } from '@chakra-ui/react'
import Bookmarks from './Bookmarks/Bookmarks';
import Chat from './Chat component/Chat';

function App() {

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:3001';

  const [userData, setUserData] = useState({});

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  

  

  return (
  <>

  <ChakraProvider>
    
    <Router>
    {/* <Mainpage/> */}
    {/* <MainModal/> */}
      <Routes>
        
      
        <Route path="/" element={<Index/>}/>
        <Route path="signups" element={<Startup/>}/>
        <Route path="logins" element={<Login setUser={setUser}/>}/>
        <Route path="signupin" element={<SignupIn/>}/>
        <Route path="loginin" element={<LoginIn/>}/>
        <Route path="mainpage" element={<Mainpage user={user}/>}/>
        <Route path="investors" element={<Investors/>}/>
        <Route path="/bookmark" element={<Bookmarks/>}/>
        <Route path="/chat" element={<Chat/>}/>

      </Routes>
    </Router>

</ChakraProvider>

    
  </>
  );
}

export default App;
