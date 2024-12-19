import React, { useState } from 'react'
import './mainmodel.css'
import axios from 'axios';
import { selectClasses } from '@mui/material';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button, Divider, Box, useDisclosure, Input, FormControl, FormLabel } from '@chakra-ui/react';
import { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const MainModal = () => {

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


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3001/api/form', formData)
      .then( response => {
        if(response.status === 201){
        console.log(response.data)
        }
        else if(response.status === 500){
        console.log(response)
        }
      })
      
  };

  const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    const dropdownRef = useRef(null);

  return (
    <>

<Modal
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size='6xl'
        
      >
        <ModalOverlay/>
        <ModalContent p='2rem'>
          <ModalHeader fontSize="3rem" mb='4rem'>Complete your profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={0}>
            <FormControl>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Name:</FormLabel>
              <Input type='text' name='startupName' placeholder='Enter your startup name' fontSize='2.2rem' h='4rem' defaultValue={formData.startupName} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Type:</FormLabel>
              <Input type='text' name='startupType' placeholder='Enter your Position' fontSize='2.2rem' h='4rem' defaultValue={formData.startupType} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Location:</FormLabel>
              <Input type='text' name='startupLocation' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={formData.startupLocation} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Website:</FormLabel>
              <Input type='text' name='startupWebsite' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={formData.startupWebsite} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Year:</FormLabel>
              <Input type='text' name='startupYear' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={formData.startupYear} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Size:</FormLabel>
              <Input type='text' name='startupSize' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={formData.startupSize} onChange={handleChange} />
            </FormControl>

            <FormControl mt={10}>
              <FormLabel fontSize='2.3rem' ml='-1.3rem'>Startup Description:</FormLabel>
              <Input type='text' name='startupDesc' placeholder='e.g. Fintech, Edtech' fontSize='2.2rem' h='4rem' defaultValue={formData.startupDesc} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter mb='-4rem' mr='-17.5rem'>
            <Button colorScheme='green' mr={3} fontSize='2rem' p='2rem' onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose} fontSize='2rem' p='2rem' color='black'>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    {/* <div id="id01" class="modal-main">
  
        <form class="modal-content animate">
          <div class="imgcontainer">
            <span onClick={() => closeModal10(false)} class="close" title="Close">&times;</span>
            <main class="main_full">
              <div class="container">
                <div class="panel">
                  <div class="button_outer">
                    <div class="btn_upload">
                      <input type="file" id="upload_file" name=""/>
                      Upload Company Logo
                    </div>
                    <div class="processing_bar"></div>
                    <div class="success_box"></div>
                  </div>
                </div>
                <div class="error_msg"></div>
                <div class="uploaded_file_view" id="uploaded_view">
                  <span class="file_remove">X</span>
                </div>
              </div>
            </main>
          </div>

          <div class="details">Enter your Startup details to make it public!</div>
          <br/>
          <br/> */}
          
          {/* <div class="container">
          <div className='form_container'>
            <label id="l1" for="uname"><b>Startup Name:</b></label>
            <input id='input_st'  placeholder="Enter Startup name" name="startupName" defaultValue={formData.startupName} onChange={handleChange} required />
            
            <label id="l2" for="psw"><b>Company Type:</b></label>
            <input id='input_st'   placeholder="e.g. Fintech" name="companyType" defaultValue={formData.companyType} onChange={handleChange} required/>

            <label id="l2" for="psw"><b>Email:</b></label>
            <input id='input_st'   placeholder="Email" name="emailAgain" value={sessionStorage.getItem('email').replace("d" ,"")} onChange={handleChange} required/>

            <label id="l3" for="psw"><b>Company Location:</b></label>
            <input  id='input_st' class="st"  placeholder="Enter the Location" name="companyLocation" defaultValue={formData.companyLocation} onChange={handleChange} required/>

            <label id="l5" for="psw"><b>Company Website:</b></label>
            <input id='input_st' class="st"  placeholder="Enter the Website URL" name="companyWebsite" defaultValue={formData.companyWebsite} onChange={handleChange} required/>

            <label id="l6" for="psw"><b>Company Year:</b></label>
            <input id='input_st' class="st"  placeholder="Enter how many years your company is Active" name="companyYear" defaultValue={formData.companyYear} onChange={handleChange} required/>

            <label id="l7" for="psw"><b>Company Size:</b></label>
            <input id='input_st' class="st" placeholder="Enter the number of employees in your Company" name="companySize" defaultValue={formData.companySize} onChange={handleChange} required/>

            <label id="l4" for="psw"><b>Company Description:</b></label>
            <textarea class="st"  placeholder="e.g. What your Company do?" cols="100" rows="10" name="companyDesc" defaultValue={formData.companyDesc} onChange={handleChange} required></textarea>
              
            
            
            <button type="submit" onClick={handleSubmit} >Create</button>
            </div> */}
        {/* </div>
        
        </form>
      </div> */}

    </>
  )
}

export default MainModal