import React, { useRef, useState, useEffect, useContext } from 'react'
import './mainpage.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MainModal from './MainModal';
import axios from 'axios';
import props from "prop-types"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, Box, SimpleGrid, Input, Flex, FormControl, FormLabel, useDisclosure, VStack, cookieStorageManager } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
} from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
// import { Badge } from '@mui/material';



const Mainpage = () => {


  const [selectedStartup, setSelectedStartup] = useState(null);

  const [data, setData] = useState([]);

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

    axios.put('http://localhost:3001/api/form', payloadS, {headers: { "Authorization" : ` Bearer ${tokenStartup}` }})
      .then( response => {
        if(response.status === 201){
        console.log(response.data)
        }
        else if(response.status === 500){
        console.log(response)
        }
      })
      
  };

  useEffect(() => {
    console.log(tokenStartup)
    // Make a GET request to fetch the saved form data from the backend
    axios.get('http://localhost:3001/api/form/startup', {headers : {"Authorization" : ` Bearer ${tokenStartup}`}})
      .then((response) => {
        const savedFormData = response.data;
        setFormData(savedFormData);
        console.log("Saved data:", savedFormData);
        console.log(tokenStartup)
      })
      .catch((error) => {
        console.error('Error fetching form data:', error);
      });
  }, []);

  // const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

  
  // const { isOpen1, onOpen1, onClose1 } = useDisclosure()

  const disclosure1 = useDisclosure();
  const disclosure2 = useDisclosure();
  const disclosure3 = useDisclosure();

  const modalOpenClick1 = () => {
    disclosure1.onOpen();
  };

  const modalOpenClick2 = () => {
    disclosure2.onOpen();
  }

  const viewDetailsClick = (startupId) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/data/${startup._id}`);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setData(data);
  //     } else {
  //       console.error('Failed to fetch startup details');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching startup details', error);
  //   }
  setSelectedStartup(startupId);
  // setSelectedStartup(data.map(item => item._id));

    disclosure3.onOpen();
  }


console.log(data.map(item => item._id));


    const navigate = useNavigate();
    
    const [userData, setUserData] = useState('');

    const [email, setEmail] = useState('');


    const [name, setName] = useState('');

    
console.log(data);
    

    // const viewDetailsClick = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:3001/api/data/${startupid}`);
    //     if (response.ok) {
    //       const data = await response.json();
    //       setData(data);
    //     } else {
    //       console.error('Failed to fetch startup details');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching startup details', error);
    //   }
  
    //   disclosure3.onOpen();
    // }
  


useEffect(() => {
    

    const userEmail = JSON.parse(sessionStorage.getItem('email'));
    const userName = JSON.parse(sessionStorage.getItem('name'));
  
    setUserData(userName);
    setEmail(userEmail);
        
  }, []);


  useEffect(() => {
    axios.get("http://localhost:3001/api/data")
      .then(response => setData(response.data))
      .catch(error => console.log(error));
     
  }, []);
    
 

  const [modalOpen10, setModalOpen10] = useState(false);
  
    const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);

 
  const handleLogout = () => {
    // Clear the data stored in local storage
    cookieStorageManager.clear();
    // Navigate to the login page
    navigate('/logins');
  }


  

  const myFunction = () => setIsActive(!isActive);
  
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
            backgroundColor: "white",
        },
        main5: {
            color: "#19ab67", 
            fontSize: "3rem",
            marginLeft: "15.3rem",
        },
        main6: {
            color: "#101010", 
            fontWeight: "bold",
            
        },
        main7: {
            color: "#8A8A8A",
        }
        

    };

    const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  const handleClearImage = () => {
    setSelectedImage(null);
  };

  const { isOpen2, onToggle } = useDisclosure();

  // Investor Modal Code Below

  const [investorForm, setInvestorForm] = useState({
    company: '',
    position: '',
    interestedIn: '',
  });

  const handleChange20 = e => {
    const{name, value} = e.target
    console.log(name, value)
    setInvestorForm({
      ...investorForm,
      [name]:value,
    });
  };

  const token1 = sessionStorage.getItem('token')
  const emailInv = JSON.parse(sessionStorage.getItem('emailInv'))

  


  const handleSubmit20 = () => {
    const payload = {
      ...investorForm,
      email: emailInv,
    };
    axios.put('http://localhost:3001/api/updateuser', payload, {headers: { "Authorization" : `Bearer ${token1}` }})
      .then( response => {
        if(response.status === 201){
        console.log(response.data)
        }
        else if(response.status === 500){
        console.log(response)
        }
      })
    }

  
  
    return (
    <>
    
    <body>
    
        
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
                    <Link to='/bookmark'><BookmarksIcon style={allStyles.main1}/></Link>
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

                              
                                
                                {/* {userData && (
                                
                                    <a id='userName' href="/"><span className='company'>{userData}</span><br/>
                                    <span className='companyemail'>{email}</span></a>
                                )} */}


                              { sessionStorage.getItem("userType") === "investor" ? (
                                <a id='userName' href="/"><span className='company'>{JSON.parse(sessionStorage.getItem('investorName'))}</span></a>
                               ) : (

                                
                                
                                  <a id='userName' href="/"><span className='company'>{userData}</span><br/>
                                  <span className='companyemail'>{email}</span></a>
                              
                                
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


          <SimpleGrid templateColumns='repeat(auto-fill, minmax(250px, 1fr))' pt='10rem' pl='20rem' >

          <Card size='lg' w='140%' h='105%'>
    <CardHeader>
      <Heading size='md' fontSize='3rem' display='flex' justifyContent='center' alignItems='center'><FilterAltIcon fontSize='large'/>Filter</Heading>
    </CardHeader>
    <CardBody pb='5rem'>
    <Stack spacing='5'>
    <Text mb='0px' fontSize='2.3rem'>Category:</Text>
      <Input placeholder='Category' size='lg' fontSize='2rem' h='4rem'/>

      <Text mb='0px' fontSize='2.3rem'>Location:</Text>
      <Input placeholder='Location' size='lg' fontSize='2rem' h='4rem'/>
  
    </Stack>
    </CardBody>
    <CardFooter>
      <Button position='absolute' colorScheme='green' fontSize='2rem' p='2rem' mt='-4rem' ml='20rem'>Apply</Button>
    </CardFooter>
  </Card>

        </SimpleGrid>


      {/* <div className="cardContainer10">
        <div className="card10" style={allStyles.main4}>
          <FilterAltIcon style={allStyles.main5}/>
          <h2 className="filters10">Filters</h2>
          <br/>
        <label>Category:</label>
        
        <input className="fintech10" type="text" placeholder="e.g. Fintech"/>
            <br/>
            <br/>
        <label>Location:</label>
        
        <input className="fintech10" type="text" placeholder="e.g. Mumbai"/>
        </div>
        </div> */}


        <div>
        {/* {data.map(userData => (
          <table className="tables">
              <tbody>
                  

                <tr key={userData._id}>
                <td id="td1" className="tdata" style={allStyles.main6}>{userData.startupName}</td><tr/>
                <td id="td2" className="tdata">{userData.companyType}</td><tr/>
                <td id="td3" className="tdata" style={allStyles.main7}><LocationOnIcon fontSize='large'/>{userData.companyLocation}</td>
                <td id="td4" className="tdata">{userData.companyDesc}</td>
                <img className="startup_img" src="images.png" alt="image"/>
                <hr className="hr3"/>
                <button className="button-10">View Details</button>
                </tr>

                  
                   
              </tbody>
          </table>

        ))} */}
      </div> 






      <Stack ml={680} spacing='10'>

      {data.map((startup) => (

<Box bg='black' backgroundColor={'blackAlpha.50'} w='70%' p={10}  mt={-393} key={startup._id} className='chakra-box' borderRadius='lg'>

  <Heading className='chakra-heading' size='3xl'>{startup.startupName}</Heading>

  <Text mt='5' className='chakra-text1' fontSize='2.5rem' color={'green.400'}>{startup.startupType}</Text>

  <Text className='chakra-text2' fontSize='2.3rem' color={'blackAlpha.500'}><LocationOnIcon fontSize='large'/>{startup.startupLocation}</Text>

  <Text mt='10' className='chakra-text3' fontSize='2.3rem'>{startup.startupDesc}</Text>

  <hr className='chakra-hr'/>

  <Button colorScheme='green' variant='outline' size='lg' fontSize='2.1rem' pt='2rem' pb='2rem' mb='-1rem' mr='-0rem' onClick={() => viewDetailsClick(startup._id)}>View Details</Button>
  
  
</Box>



))}



</Stack>




<Modal isOpen={disclosure3.isOpen} onClose={disclosure3.onClose} size='6xl'>
        <ModalOverlay/>
        <ModalContent>
          
          <ModalCloseButton color='black' size='xl' display='flex' position='absolute' mr='1rem' mt='1.5rem' />
          <ModalBody fontSize='2.5rem' color='black'>
      {data
      .filter((startup) => startup._id === selectedStartup)
      .map((startup) => (

        <Stack key={startup._id}>

        <Heading mb='1.5rem' mt='2rem' ml='2rem' fontSize='3.5rem'>{startup.startupName}</Heading>

        <hr/>

        <Text pl='2rem' pt='2rem' fontSize='2.3rem' pb='1.5rem'><Badge fontSize='2rem'>Who we are?</Badge><br/>{startup.startupDesc}</Text>

        <Text pl='2rem' pb='1.5rem' fontSize='2.3rem'><Badge fontSize='2rem'>Website</Badge><br/>{startup.startupWebsite}</Text>

        <Text pl='2rem' pb='1.5rem' fontSize='2.3rem'><Badge fontSize='2rem'>We started at</Badge><br/>{startup.startupYear}</Text>

        <Text pl='2rem' fontSize='2.3rem'><Badge fontSize='2rem'>Startup strength</Badge><br/>{startup.startupSize}</Text>

        </Stack>

       ))}            
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' onClick={disclosure3.onClose}>
              Close
            </Button> */}
            
          </ModalFooter>
        </ModalContent>
      </Modal>
  





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

          <ModalFooter mb='-4rem'>
            <Button colorScheme='green' fontSize='2rem' p='2rem' mr='2rem' onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={disclosure2.onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>





      {/* Investor Modal */}

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
              <Input type='text' name='company' placeholder='Enter your company name if any(optional)' fontSize='2.2rem' h='4rem' defaultValue={investorForm.company} onChange={handleChange20} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Position:</FormLabel>
              <Input type='text' name='position' placeholder='Enter your Position' fontSize='2.2rem' h='4rem' defaultValue={investorForm.position} onChange={handleChange20} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startups you are interested in:</FormLabel>
              <Input type='text' name='interestedIn' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={investorForm.interestedIn} onChange={handleChange20} />
            </FormControl>
          </ModalBody>

          <ModalFooter mb='-4rem' mr='-17.5rem'>
            <Button colorScheme='green' mr={3} fontSize='2rem' p='2rem' onClick={handleSubmit20}>
              Save
            </Button>
            <Button onClick={disclosure1.onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>





      

      </body>
    
    </>
    
  )
      }

export default Mainpage