import React, { Fragment, useRef } from 'react'
import './chat.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Avatar, AvatarBadge, AvatarGroup,
  Stack,
  Tooltip,
  cookieStorageManager,
  color,
  VStack,
  StackDivider,
  FormControl,
  Center,
  
} from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {ChatIcon} from "@chakra-ui/icons"
import {ArrowBackIcon} from "@chakra-ui/icons"
import {AttachmentIcon} from "@chakra-ui/icons"
import {ArrowForwardIcon} from "@chakra-ui/icons"
import { Link, json } from 'react-router-dom';

import socketIOClient from 'socket.io-client';
import Message from './Message';
import {DeleteIcon} from "@chakra-ui/icons"
import { unionBy, uniqBy, uniq } from 'lodash';




const Chat = () => {


  const allStyles = {
    main1: {
      position:"relative",
      fontSize: "2.8rem",
      marginLeft: "0rem",
      cursor: "pointer"
    }
  }

  const [isHovered, setIsHovered] = useState(false);

  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});

  const [selectedUserId, setSelectedUserId] = useState(null);

  const [selectedStartupId, setSelectedStartupId] = useState(null);

  const [newMessageText, setNewMessageText] = useState('');

  const [messages, setMessages] = useState([]);

  

  const divUnderMesages = useRef();

  useEffect(() => {
    const ws = new WebSocket('wss://https://angelvestors-backend.onrender.com');
    setWs(ws);
    ws.addEventListener('message', handleMessage)
    
  }, []);

  function showOnlinePeople(peopleArray){
    const people = {};
    peopleArray.forEach(({userId, name, investorId, fullName}) => {
      if (userId) {
        people[userId] = { name };
      }
  
      if (investorId) {
        people[investorId] = { fullName };
      }
    });
    console.log(people);
    setOnlinePeople(people);
    
  }

  function handleMessage(ev){
    const messageData = JSON.parse(ev.data);
    console.log('Incoming messageData:', messageData);

    console.log({ev, messageData});
    console.log({messageData});
    // console.log(messageData);
    // console.log({ev});
    if('online' in messageData){
      showOnlinePeople(messageData.online);
      
    } else if('text' in messageData) {
      
      // if(messageData.sender === selectedStartupId){
        // setMessages(prev => ([...prev, messageData]));
      // }
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, messageData];
        return updatedMessages;
      });
      
      
    }
    
  }
  console.log(messages);

  function sendMessage(ev, file = null){
    if(ev) ev.preventDefault();

    const newMessage = {
      text: newMessageText,
      sender: JSON.parse(sessionStorage.getItem('startupId')),
      recipient: selectedUserId,
    };

    ws.send(JSON.stringify({
      
        recipient: selectedUserId,
        text: newMessageText,
        file,
    }));
    setNewMessageText('');

    // setMessages(prev => ([...prev, {
    //   text: newMessageText,
    //   sender: JSON.parse(sessionStorage.getItem('startupId')),
    //   recipient: selectedUserId,
    // }]));
    
    console.log('Previous messages:', messages);
    setMessages(prevMessages => [...prevMessages, newMessage]);
    // setMessages(prevMessages => [
    //   [...prevMessages, newMessage]
    // ]);
    console.log('Updated messages:', messages);


    if(file) {
      axios.get('/messages/' + selectedUserId).then(res => {
        setMessages(res.data);
      });
    } 
    
  }

  const messagesWithoutDupes = uniqBy(messages, '_id');
  console.log(messagesWithoutDupes);


  useEffect(()=> {
    const div = divUnderMesages.current;
    if(div){
      div.scrollIntoView({behavior:'smooth', block:'end'})
    }
  }, [messagesWithoutDupes]);


  useEffect(() => {
    if(selectedUserId) {
      axios.get('https://angelvestors-backend.onrender.com/messages/'+selectedUserId).then(res => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  

  useEffect(() => {
    if(selectedStartupId) {
      axios.get('https://angelvestors-backend.onrender.com/messagesTwo/'+selectedStartupId).then(res => {
        setMessages(res.data);
      });
    }
  }, [selectedStartupId]);




  function sendMessageInv(ev, file = null){
    if(ev) ev.preventDefault();
    ws.send(JSON.stringify({
      
        recipient: selectedStartupId,
        text: newMessageText,
        file,
      
    }));
    setNewMessageText('');

    setMessages(prev => ([...prev, {text: newMessageText,
    sender: JSON.parse(sessionStorage.getItem('investorId')),
    recipient: selectedStartupId,
  }]));
  if(file) {
    axios.get('/messagesTwo/' + selectedStartupId).then(res => {
      setMessages(res.data);
    });
  }

  }

  function sendFile(ev){
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      })
    }
  }

  

  // const messagesWithoutDupes = uniqBy(messages, '_id');
  // console.log(messagesWithoutDupes);

  
  

  const [chats, setChats] = useState([]);

  const startupId = JSON.parse(sessionStorage.getItem('startupId'));

  useEffect(() => {
    axios.get(`https://angelvestors-backend.onrender.com/api/getchats?startupId=${startupId}`)
      .then(res => setChats(res.data))
      .catch(err => console.error(err));
  }, [startupId]);


  // axios delete chat

  const handleChatDelete = (chatid) => {
    try {
      axios.delete(`https://angelvestors-backend.onrender.com/api/connect/${chatid}`);
      // console.log(response.data.message);
      // handle successful bookmark deletion
    } catch (error) {
      console.error(error);
    }
  };


  //investor

  const [invchats, setInvChats] = useState([]);

  const investorId = JSON.parse(sessionStorage.getItem('investorId'));

  useEffect(() => {
    axios.get(`https://angelvestors-backend.onrender.com/api/getInvestorChats?investorId=${investorId}`)
      .then(res => setInvChats(res.data))
      .catch(err => console.error(err));
  }, [investorId]);

  
  // function selectContact(userId, investorId){
  //   setSelectedUserId(userId)
  // }

  
 

  return (
    <>

    

    
    <Box display='flex' flexDirection='column' bg='gray.50' boxShadow='2xl' color='white' maxW="25%" minH="100vh">
    <Text fontSize='3rem' p='2rem' fontWeight='bold' color='green.500'><ChatIcon/> Chat Room</Text>

    <Divider mt='-1rem'/>

    <Text color='black' p='2rem' fontSize='2.8rem' fontWeight='bold' > Messages </Text>

    

    { sessionStorage.getItem("userType") === "startup" && (

    
<Stack >

    {chats.map((chat) => {
      const investorId = chat.participants[0].investorId._id;
      const isUserOnline = onlinePeople.hasOwnProperty(investorId);
      console.log(investorId);
    
      return (
        <Stack key={chat._id}>
          <Box
            onClick={() => {
                    console.log('investorId:', investorId);
                    console.log('selectedInvestorId:', selectedUserId);
                  setSelectedUserId(investorId); }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            
            p='0.5rem'
            
            
            bgColor={investorId === selectedUserId ? 'green.200' : 'gray.100'}
            
            display='flex'
            alignItems='center'
            cursor='pointer'
          >
            <Stack direction='row' spacing={4}>
            <Avatar name={chat.participants[0].investorId.fullName[0]} size='lg'>
            {isUserOnline ? (
              <AvatarBadge boxSize='1.25em' bg='green.200' />
            ) : (
              <AvatarBadge boxSize='1.25em' bg='gray.200' />
            )}
          </Avatar>

            </Stack>
    
            <Text color='black' fontSize='2rem' ml='1rem' mt='1rem'>
              {chat.participants[0].investorId.fullName}
            </Text>
    
            {isHovered && (
              <Tooltip hasArrow label='Delete' fontSize='1.5rem'>
                <DeleteIcon
                  ml='-20rem'
                  color='gray.500'
                  
                  onClick={() => handleChatDelete(chat._id)}
                />
              </Tooltip>
            )}
          </Box>
        </Stack>
      );
    })}

</Stack>
    
    )}
  

{ sessionStorage.getItem("userType") === "investor" && (

<Stack>

{invchats.map(inchat => {
  const userId = inchat.participants[0].startupId;
  const isUserOnline = onlinePeople.hasOwnProperty(userId);

  return (
    <Stack key={inchat._id}>
      <Box
        onClick={() => {
            console.log('startupId:', userId);
            console.log('selectedStartupId:', selectedStartupId);
              setSelectedStartupId(userId); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        
        
        bgColor={userId === selectedStartupId ? 'green.200' : 'gray.100'}
        
        display='flex'
        alignItems='center'
        cursor='pointer'
      >
        <Stack direction='row' spacing={4}>
        <Avatar name={(inchat.name.split(' and ')[0])} size='lg'>
        {isUserOnline ? (
          <AvatarBadge boxSize='1.25em' bg='green.200' />
        ) : (
          <AvatarBadge boxSize='1.25em' bg='gray.200' />
        )}
      </Avatar>

        </Stack>

        <Text color='black' fontSize='2rem' ml='1rem' mt='1rem'>
        {inchat.name.split(' and ')[0]}
        {/* {inchat.participants[0].startupId} */}
        </Text>

        {console.log()}

        {isHovered && (
          <Tooltip hasArrow label='Delete' fontSize='1.5rem'>
            <DeleteIcon
              color='gray.500'
              fontSize='2.8rem'
              display='flex'
              justifyContent='right'
              onClick={() => handleChatDelete(inchat._id)}
            />
          </Tooltip>
        )}
      </Box>
    </Stack>
  );
})}

</Stack>



)}
    
  


    <Divider mt='48rem'/>

    <Link to='/investors'><Text color='green.500' fontSize='2.3rem' p='2rem' cursor='pointer' fontWeight='bold' mt='2rem'><ArrowBackIcon mr='1rem'/>Return to Home</Text></Link>


    
    
   

    </Box>

    
      <Stack display='flex' alignItems='center' flexDirection='row' justifyContent='center' mt='-9rem' ml='43rem'>
      <Input value={newMessageText} onChange={ev => setNewMessageText(ev.target.value)} type='text' focusBorderColor='green.400' placeholder='Type your message' maxW={{ base: "90%", sm: "100%", md: "75%" }} fontSize='2.3rem' h='6rem' ></Input>

      <label>
        <Input type='file' hidden onChange={sendFile}/>
      <AttachmentIcon display='flex'  bg='green.200'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer' position='relative' />
      </label>

      { sessionStorage.getItem("userType") === "startup" && (
      <ArrowForwardIcon onClick={sendMessage} display='flex' position='relative' type='submit' bg='green.400'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer' left='1rem'/>

      )}

      { sessionStorage.getItem("userType") === "investor" && (
   <ArrowForwardIcon onClick={sendMessageInv} display='flex' position='relative' type='submit' bg='green.400'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer' left='1rem'/>
      )}
      

      </Stack>
      

      
     

    { sessionStorage.getItem("userType") === "startup" && (
    <Stack>
    {!selectedUserId && (
      <Center mt='-50rem'>
    <Text fontSize='2.4rem'  color='gray.300'>👈 Select a person from the sidebar</Text>
    </Center>
    )}

     {!!selectedUserId && (


<Stack position='relative' h='full'>

<Stack mt='-91rem' mb='7rem' maxWidth='150rem' ml='60rem' overflowY='scroll' position='absolute' top='0' bottom='0' right='0' left='0'>
      
      {messagesWithoutDupes
      .filter(message => message._id)
      .map((message) => (

        <Stack display='flex' alignItems={(message.sender === JSON.parse(sessionStorage.getItem('startupId')) ? 'flex-end' : 'flex-start')}>

          <Text textAlign='left' display='inline-block' p='4' m='2' borderRadius='md' bgColor={message.sender === JSON.parse(sessionStorage.getItem('startupId')) ? 'green.400' : 'blackAlpha.400'}  fontSize='2.4rem'  color='white' key={message._id}>
         {message.text}
         {message.file && (
          <Text>
            
            <AttachmentIcon mr='1rem'/>
            <a target='_blank' href={"https://angelvestors-backend.onrender.com/uploads/" + message.file}>{message.file}</a>
          </Text>
         )}
         </Text> 


        </Stack>
        
         
      ))}

      <Stack ref={divUnderMesages}></Stack>

      </Stack>

      
        
      </Stack>

      
       
    )}
</Stack>

    
    

    
    )}


  { sessionStorage.getItem("userType") === "investor" && (
    <Stack>
    {!selectedStartupId && (
    <Text position='absolute' textAlign='center' mt='-50rem' fontSize='2.4rem' ml='100rem' color='gray.300'>👈 Select a person from the sidebar</Text>
    )}

  {!!selectedStartupId && (
    <Stack position='relative' h='full'>
      <Stack mt='-91rem' mb='7rem' maxWidth='150rem' ml='60rem' overflowY='scroll' position='absolute' top='0' bottom='0' right='0' left='0'>
      {messagesWithoutDupes
      .filter(message => message._id)
      .map(message => (

        <Stack display='flex' alignItems={(message.sender === JSON.parse(sessionStorage.getItem('investorId')) ? 'flex-end' : 'flex-start')}>

        <Text textAlign='left' display='inline-block' p='4' m='2' borderRadius='md' bgColor={message.sender === JSON.parse(sessionStorage.getItem('investorId')) ? 'green.400' : 'blackAlpha.400'} fontSize='2.4rem' color='white'>
          {message.text}
          {message.file && (
          <div>
            <AttachmentIcon mr='1rem'/>
            <a target='_blank' href={"https://angelvestors-backend.onrender.com/uploads/" + message.file}>{message.file}</a>
          </div>
         )}
          </Text>

        </Stack>
      ))}
      <Stack ref={divUnderMesages}></Stack>
      </Stack>
      </Stack>
    )}
    </Stack>
    )}
   
    {/* <Box display='flex' bgColor='red' ali>
    
      <Input value={newMessageText} onChange={ev => setNewMessageText(ev.target.value)} type='text' focusBorderColor='green.400' placeholder='Type your message' size='sm' fontSize='2.3rem' h='6rem' w='60%' ml='56rem'/> 
  
      <AttachmentIcon bg='green.200'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer'/>

      { sessionStorage.getItem("userType") === "startup" && (
      <ArrowForwardIcon onClick={sendMessage} type='submit' bg='green.400'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer' />
      )}

      { sessionStorage.getItem("userType") === "investor" && (
   <ArrowForwardIcon onClick={sendMessageInv} type='submit' bg='green.400'  fontSize='5.5rem' p='1rem' borderRadius='1rem' cursor='pointer' />
      )}
   </Box> */}
   
   
    
   
   

    
        

    </>
  )
}

export default Chat