import React, {useState, useEffect} from 'react'
import './investors.css'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, Box, useDisclosure, Input, FormControl, FormLabel, VStack, Tooltip, Badge } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useRef } from 'react';
import axios, { all } from 'axios';
import { updateUser } from '../helper/helper.js';
import { useToast } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { wrap } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Investors = ({investor}) => {

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
          fontSize: "3rem",
          marginTop: "-61.1rem",
          marginLeft: "74rem",
          cursor: "pointer",
          color: "gray"
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    const dropdownRef = useRef(null);

    const [isActive, setIsActive] = useState(false);

    const myFunction = () => setIsActive(!isActive);

    const [investorData, setInvestorData] = useState('');

    const [fullName, setFullname] = useState('');

    const [investorFormData, setInvestorFormData] = useState([]);

    useEffect(() => {
      axios.get("https://angelvestors-backend.onrender.com/api/investorFormData")
        .then(response => setInvestorFormData(response.data))
        .catch(error => console.log(error));
    }, []);

    const [investorForm, setInvestorForm] = useState({
      company: '',
      position: '',
      interestedIn: '',
      investmentSize: '',
      previousInvestments: '',
    });

    const handleChange = e => {
      const{name, value} = e.target
      console.log(name, value)
      setInvestorForm({
        ...investorForm,
        [name]:value,
      });
    };

    const token1 = sessionStorage.getItem('token')
    const emailInv = JSON.parse(sessionStorage.getItem('emailInv'))

    
  

    const handleSubmit = () => {
      const payload = {
        ...investorForm,
        email: emailInv,
      };
      axios.put('https://angelvestors-backend.onrender.com/api/updateuser', payload, {headers: { "Authorization" : `Bearer ${token1}` }})
        .then( response => {
          if(response.status === 201){
          console.log(response.data)
          }
          else if(response.status === 500){
          console.log(response)
          }
        })
      }

      // const updateUser = (investorForm, emailInv) => {
      // .then( response => {
      //   if(response.status === 201){
      //         console.log(response.data)
      //         }
      //         else if(response.status === 500){
      //         console.log(response)
      //         }
      // })

      // }

    
    
     useEffect(() => {
    

      const investorName = JSON.parse(sessionStorage.getItem('investorName'));
    
      setInvestorData(investorName);          
      
    }, []);



    const handleBookmarkClick = (investorid) => {
      axios.post('https://angelvestors-backend.onrender.com/api/bookmarks', {
        startupId: JSON.parse(sessionStorage.getItem('startupId')),
        investorId: investorid
      })
        .then(res => {
          console.log(res.data._id);
          
        })
        .catch(err => console.error(err));
    };


    const handleConnect = (investorid) => {

      axios.post('https://angelvestors-backend.onrender.com/api/connect', {
        startupId: JSON.parse(sessionStorage.getItem('startupId')),
        investorId: investorid
      })
        .then(res => {
          console.log(res.data._id);
          
        })
        .catch(err => console.error(err));
      // try {
      //   const startupId = JSON.parse(sessionStorage.getItem('startupId'));
      //   const response = await axios.post('http://localhost:3001/api/connect', { startupId, investorId: investorid });
        
      //   console.log(response.data);
      // } catch (error) {
      //   console.log(error.response.data);
      // }
    }



    // StartUp Code below

    const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();

  const modalOpenClick1 = () => {
    disclosure1.onOpen();
  };

  const modalOpenClick2 = () => {
    disclosure2.onOpen();
  }


  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };



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

  const handleChange30 = e => {
    const{name, value} = e.target
    console.log(name, value)
    setFormData({
      ...formData,
      [name]:value,
    });
  };

  const tokenStartup = JSON.parse(sessionStorage.getItem('tokenS'));

  const handleSubmit30 = () => {
    const payloadS = {
      ...formData,
      email: JSON.parse(sessionStorage.getItem('email')),
    };
    axios.put('https://angelvestors-backend.onrender.com/api/form', payloadS, {headers: { "Authorization" : `Bearer ${tokenStartup}` }})
      .then( response => {
        if(response.status === 201){
        console.log(response.data)
        }
        else if(response.status === 500){
        console.log(response)
        }
      })
      
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
                    <Link to="/bookmark"><BookmarksIcon style={allStyles.main1}/></Link>
                    </li>
                    )} 


                    <li className="nav-item">
                       <Link to='/chat'><ChatIcon style={allStyles.main2}/></Link>
                    </li>
                    
                    <li className="nav-item">
                    
                        <div className="dropdown23">
                        <div className="dropbtn23" >
                        <AccountCircleIcon style={allStyles.main3} onClick={myFunction}/>
                        </div>
                            <div ref={dropdownRef} className={`dropdown-content ${isActive ? 'active' : 'inactive'}`} id='content'>
                                
                                {investorData && (
                                
                                    <a id='userName' href="/"><span className='investor_name'>{investorData}</span><br/>
                                    </a>
                                )}

                              { sessionStorage.getItem("userType") === "startup" && (
                                <a id='userName' href="/"><span className='company'>{JSON.parse(sessionStorage.getItem('name'))}</span><br/>
                                <span className='companyemail'>{JSON.parse(sessionStorage.getItem('email'))}</span></a>
                              )} 


                                <hr/>
                                
                                
                                <a>
                                {sessionStorage.getItem("userType") === "startup" ? (
                                    <span onClick={modalOpenClick2}>My Application</span>
                                  ) : (
                                    <span onClick={modalOpenClick1}>My Profile</span>
                                  )}
                                  

                                  </a>
                                  {/* {modalOpen10 && <MainModal closeModal10={setModalOpen10}/>} */}
                                  
                                <a href="/">Settings</a>
                                <a href="/">Logout</a>
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

          <Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={disclosure1.isOpen}
        onClose={disclosure1.onClose}
        size='6xl'
        
      >
        <ModalOverlay/>
        <ModalContent p='2rem'>
          <ModalHeader fontSize="3rem" mb='4rem'>Create your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={0}>
            <FormControl>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Company:</FormLabel>
              <Input type='text' name='company' placeholder='Enter your company name if any(optional)' fontSize='2.2rem' h='4rem' defaultValue={investorForm.company} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Position:</FormLabel>
              <Input type='text' name='position' placeholder='Enter your Position' fontSize='2.2rem' h='4rem' defaultValue={investorForm.position} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startups you are interested in:</FormLabel>
              <Input type='text' name='interestedIn' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={investorForm.interestedIn} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Investment Size:</FormLabel>
              <Input type='text' name='investmentSize' placeholder='Enter your minimum and maximum investment amounts' fontSize='2.2rem' h='4rem' defaultValue={investorForm.investmentSize} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Previous Investments:</FormLabel>
              <Input type='text' name='previousInvestments' placeholder='Enter your previous investments(optional)' fontSize='2.2rem' h='4rem' defaultValue={investorForm.previousInvestments} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter mb='-4rem' mr='-17.5rem'>
            <Button colorScheme='green' mr={3} fontSize='2rem' p='2rem' onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={disclosure1.onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


    <Text fontSize='6xl' display='flex' justifyContent='center' pt='5rem' background='green.100' pb='5rem'>Meet our Investors!</Text>

    

    <Stack ml={650} spacing='10'>

      {investorFormData.map(investorData => (

<Flex wrap = 'wrap'>

<Box bg='black' backgroundColor={'blackAlpha.100'} w='60%' p={10} mt={10} key={investorData._id} className='chakra-box' borderRadius='lg' alignItems='' flexWrap='wrap'>

<Image
  mt='1rem'
  borderRadius='full'
  boxSize='180px'
  src='https://bit.ly/dan-abramov'
  alt='Dan Abramov'
  display='flex'
  justifyContent='left'
/>



  <Heading className='chakra-heading' size='3xl' display='flex' ml='20rem' mt='-17rem'>{investorData.fullName}</Heading><br/>

  <Text className='chakra-text1' fontSize='2.5rem' ml='20rem' color='green.500' display='flex' >{investorData.position}({investorData.company})</Text>

  <Text ml='20rem'><Badge colorScheme="green" fontSize='1.9rem' >Interested In: {investorData.interestedIn}</Badge></Text>

  <Text ml='20rem'><Badge colorScheme="blue" fontSize='1.9rem' >Investment Size: {investorData.investmentSize}</Badge></Text>

  <Text ml='20rem'><Badge colorScheme="purple" fontSize='1.9rem' >Previous Investments: {investorData.previousInvestments}</Badge></Text>

  
  <Divider borderColor='gray.400' className='divider' mt='4rem' mb='2rem'/>

  <Button colorScheme='green' variant='outline' size='lg' fontSize='2.1rem' pt='2rem' pb='2rem' mb='-2rem' mr='-0rem' mt='-1' onClick={() => handleConnect(investorData._id)}>Connect</Button> 
  
  {/* <BookmarksIcon style={allStyles.main4}/> */}

  { sessionStorage.getItem("userType") === "startup" && (
    <Tooltip hasArrow label='Bookmark' fontSize='1.5rem'>
    <BookmarksIcon style={allStyles.main4} onClick={() => handleBookmarkClick(investorData._id)}/>
    </Tooltip>
  )} 
  
</Box>

</Flex>

))} 

</Stack>




{/* Startup Modal Code below */}

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
              <Input type='text' name='startupName' placeholder='Enter your startup name' fontSize='2.2rem' h='4rem' defaultValue={formData.startupName} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Type:</FormLabel>
              <Input type='text' name='startupType' placeholder='Enter your startup type' fontSize='2.2rem' h='4rem' defaultValue={formData.startupType} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Location:</FormLabel>
              <Input type='text' name='startupLocation' placeholder='Enter startup location' fontSize='2.2rem' h='4rem' defaultValue={formData.startupLocation} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Website:</FormLabel>
              <Input type='text' name='startupWebsite' placeholder='Enter startup website(optional)' fontSize='2.2rem' h='4rem' defaultValue={formData.startupWebsite} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Year:</FormLabel>
              <Input type='text' name='startupYear' placeholder='Enter your startup year' fontSize='2.2rem' h='4rem' defaultValue={formData.startupYear} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Size:</FormLabel>
              <Input type='text' name='startupSize' placeholder='Enter startup size' fontSize='2.2rem' h='4rem' defaultValue={formData.startupSize} onChange={handleChange30} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Description:</FormLabel>
              <Input type='text' name='startupDesc' placeholder='Enter short description about your startup' fontSize='2.2rem' h='4rem' defaultValue={formData.startupDesc} onChange={handleChange30} />
            </FormControl>
          </ModalBody>

          <ModalFooter mb='-4rem' mr='0'>
            <Button colorScheme='green' mr={3} fontSize='2rem' p='2rem' onClick={handleSubmit30}>
              Save
            </Button>
            <Button onClick={disclosure2.onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>



{/* Alerts */}





    </>
  )
}


export default Investors