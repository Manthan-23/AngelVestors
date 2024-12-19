import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, Box, useDisclosure, Input, FormControl, FormLabel, VStack, Tooltip, Badge, Flex, Toast, useToast } from '@chakra-ui/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import props from "prop-types"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {DeleteIcon} from "@chakra-ui/icons"

const Bookmarks = () => {

  const toast = useToast();

  const navigate = useNavigate();

  const allStyles = {
    main1: {
        fontSize: "3rem",
        marginTop: "0rem",
        cursor: "pointer",
    },
    main2: {
        fontSize: "3rem", 
        marginTop: "0rem", 
        cursor: "pointer",
    },
    main3: {
        fontSize: "3.5rem", 
        marginTop: "0rem", 
        marginRight: "8rem", 
        cursor: "pointer",
    },
    main4: {
      fontSize: "2.8rem",
      marginLeft: "1rem",
      marginTop: "0.3rem",
      cursor: "pointer"
    }
    
    

};

  const [email, setEmail] = useState('');

  const myFunction = () => setIsActive(!isActive);

  const initialRef = React.useRef(null)


  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

  const [userData, setUserData] = useState('');

  const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();
  const disclosure3 = useDisclosure();

  const modalOpenClick1 = () => {
    disclosure1.onOpen();
  };

  const modalOpenClick2 = () => {
    disclosure2.onOpen();
  }

  const handleLogout = () => {
    // Clear the data stored in local storage
    sessionStorage.clear();
    // Navigate to the login page
    navigate('/logins');
  }


  const [bookmarks, setBookmarks] = useState([]);

  const startupId = JSON.parse(sessionStorage.getItem('startupId'));

  useEffect(() => {
    axios.get(`http://localhost:3001/api/getbookmarks?startupId=${startupId}`)
      .then(res => setBookmarks(res.data))
      .catch(err => console.error(err));
  }, [startupId]);




  // Modal code

  const [formData, setFormData] = useState({

    startupName: '',
    startupType: '',
    // emailAgain: '',
    startupLocation: '',
    startupWebsite: '',
    startupYear: '',
    startupSize: '',
    startupDesc: '',

  });

  const handleChange = e => {
    const{name, value} = e.target
    console.log(name, value)
    setFormData({
      ...formData,
      [name]:value,
    });
  };

  const tokenStartup = JSON.parse(sessionStorage.getItem('tokenS'));

  const handleSubmit = () => {
    const payloadS = {
      ...formData,
      email: JSON.parse(sessionStorage.getItem('email')),
    };
    axios.put('http://localhost:3001/api/form', payloadS, {headers: { "Authorization" : `Bearer ${tokenStartup}` }})
      .then( response => {
        if(response.status === 201){
        console.log(response.data)
        }
        else if(response.status === 500){
        console.log(response)
        }
      })
      
  };


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };


  // axios delete bookmark

  const handleBookmarkDelete = (bookmarkid) => {
    try {
      axios.delete(`http://localhost:3001/api/bookmarks/${bookmarkid}`);
      // console.log(response.data.message);
      // handle successful bookmark deletion
    } catch (error) {
      console.error(error);
    }
  };

  


  return (
    <>

<header className="header">
            <nav className="navbar">
              <a href="/" className="nav-logo">AngelVestors</a>
                <ul className="nav-menu">
                    <li className="nav-item">
                        <Link to="/investors"><a id='investor' href="/" className="nav-link">Investors</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/mainpage'><a id='startup' href="/" className="nav-link">Startups</a></Link>
                    </li>

                  { sessionStorage.getItem("userType") === "startup" && (
                    <li className="nav-item">
                    <BookmarksIcon style={allStyles.main1}/>
                    </li>
                   )} 
                    


                    <li className="nav-item">
                        <ChatIcon style={allStyles.main2}/>
                    </li>
                    
                    <li className="nav-item">
                    
                        <div className="dropdown23">
                        <div className="dropbtn23" >
                        <AccountCircleIcon style={allStyles.main3} onClick={myFunction}/>
                        </div>
                            <div ref={dropdownRef} className={`dropdown-content ${isActive ? 'active' : 'inactive'}`} id='content'>

                              
                                
                                {/* {userData && (
                                
                                    <a id='userName' href="/"><span className='company'>{userData}</span><br/>
                                    <span className='companyemail'>{email}</span></a>
                                )} */}


                              { sessionStorage.getItem("userType") === "investor" ? (
                                <a id='userName' href="/"><span className='company'>{JSON.parse(sessionStorage.getItem('investorName'))}</span></a>
                               ) : (

                                
                                
                                  <a id='userName' href="/"><span className='company'>{JSON.parse(sessionStorage.getItem('name'))}</span><br/>
                                  <span className='companyemail'>{JSON.parse(sessionStorage.getItem('email'))}</span></a>
                              
                                
                               )

                               } 

                                <hr/>
                                
                                
                                <a>

                                  {sessionStorage.getItem("userType") === "investor" ? (
                                    <span onClick={modalOpenClick1}>My Profile</span>
                                  ) : (
                                    <span onClick={modalOpenClick2}>My Application</span>
                                  )}
                                  
                                  

                                  </a>
                                  {/* {modalOpen10 && <MainModal closeModal10={setModalOpen10}/>} */}
                                  
                                <a href="/">Settings</a>
                                <a href="/" onClick={handleLogout}>Logout</a>
                              </div>
                            </div> 
                    </li>
                
                </ul>
                <div className="hamburger">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            </nav>
          </header>
    
      <Text display='flex' justifyContent='center' fontSize='4rem' fontWeight='bold' mt='7rem' mb='5rem'>My Bookmarks</Text>
      {/* <ul>
        {bookmarks.map(bookmark => (
          <li key={bookmark._id}>
            <a href={`/investors/${bookmark.investorId._id}`}>
              {bookmark.investorId.fullName}
            </a>
          </li>
        ))}
      </ul> */}

<Stack  spacing='10' >

{bookmarks.map(bookmark => (

<Flex wrap = 'wrap' justifyContent='center'>

<Box bg='black' backgroundColor={'blackAlpha.100'} w='40%' p={10} mt={10} key={bookmark.investorId._id} className='chakra-box' borderRadius='lg'  flexWrap='wrap'>

<Image
mt='1rem'
borderRadius='full'
boxSize='180px'
src='https://bit.ly/dan-abramov'
alt='Dan Abramov'
display='flex'
justifyContent='left'
/>



<Heading className='chakra-heading' size='3xl' display='flex' ml='20rem' mt='-17rem'>{bookmark.investorId.fullName}</Heading><br/>

<Text className='chakra-text1' fontSize='2.5rem' ml='20rem' color='green.500' display='flex' >{bookmark.investorId.position}({bookmark.investorId.company})</Text>

<Text ml='20rem'><Badge colorScheme="green" fontSize='1.9rem' >Interested In: {bookmark.investorId.interestedIn}</Badge></Text>

<Text ml='20rem'><Badge colorScheme="blue" fontSize='1.9rem' >Investment Size: {bookmark.investorId.investmentSize}</Badge></Text>

<Text ml='20rem'><Badge colorScheme="purple" fontSize='1.9rem' >Previous Investments: {bookmark.investorId.previousInvestments}</Badge></Text>


<Divider borderColor='gray.400' className='divider' mt='4rem' mb='2rem'/>

<Button colorScheme='green' variant='outline' size='lg' fontSize='2.1rem' pt='2rem' pb='2rem' mb='-0.5rem' mr='-0rem' mt='-1'>Connect</Button> 

{/* <BookmarksIcon style={allStyles.main4}/> */}

{/* { sessionStorage.getItem("userType") === "startup" && ( */}
<Tooltip hasArrow label='Delete' fontSize='1.5rem'>
<DeleteIcon color='blue.400' style={allStyles.main4} onClick={() =>  handleBookmarkDelete(bookmark._id) }/>
</Tooltip>
{/* )}  */}

</Box>

</Flex>

))} 

</Stack>



{/* Modal */}

<Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={disclosure2.isOpen}
        onClose={disclosure2.onClose}
        size='6xl'
        
      >
        <ModalOverlay/>
        <ModalContent p='5rem'>
          <ModalHeader fontSize="3rem" mb='4rem'>Complete your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={0}>

          <VStack spacing={4}>
      <FormControl>
        <FormLabel fontSize='2.3rem' display='flex' justifyContent='center'>Upload your Startup Logo</FormLabel>
        <Input fontSize='1.8rem' pt='1rem' pb='4.5rem' type="file" accept="image/*" onChange={handleImageChange} />
      </FormControl>

      {selectedImage && (
        <VStack>
          <Image src={selectedImage} alt="Selected Image" maxH="200px" />
          <br/>

          <Button onClick={handleClearImage} colorScheme='green' fontSize='1.8rem' pl='7rem' pr='7rem' pt='2rem' pb='2rem'>Clear Image</Button>
        </VStack>
      )}
      </VStack>
      <br/>
      <br/>

            <FormControl>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Name:</FormLabel>
              <Input type='text' name='startupName' placeholder='Enter your startup name' fontSize='2.2rem' h='4rem' defaultValue={formData.startupName} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Type:</FormLabel>
              <Input type='text' name='startupType' placeholder='Enter your startup type' fontSize='2.2rem' h='4rem' defaultValue={formData.startupType} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Location:</FormLabel>
              <Input type='text' name='startupLocation' placeholder='Enter startup location' fontSize='2.2rem' h='4rem' defaultValue={formData.startupLocation} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Website:</FormLabel>
              <Input type='text' name='startupWebsite' placeholder='Enter startup website(optional)' fontSize='2.2rem' h='4rem' defaultValue={formData.startupWebsite} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Year:</FormLabel>
              <Input type='text' name='startupYear' placeholder='Enter your startup year' fontSize='2.2rem' h='4rem' defaultValue={formData.startupYear} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Size:</FormLabel>
              <Input type='text' name='startupSize' placeholder='Enter startup size' fontSize='2.2rem' h='4rem' defaultValue={formData.startupSize} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Description:</FormLabel>
              <Input type='text' name='startupDesc' placeholder='Enter short description about your startup' fontSize='2.2rem' h='4rem' defaultValue={formData.startupDesc} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter mb='-4rem' mr='0'>
            <Button colorScheme='green' mr={3} fontSize='2rem' p='2rem' onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={disclosure2.onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

  

    </>
  );
};

export default Bookmarks;
