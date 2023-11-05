import React, { useRef } from 'react'
import styles from './UserProfile.module.css'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserProfile() {

    const inputFullName = useRef()
    const inputPhotoURL= useRef()

    
    
    const submitProfileHandler = async (e)=>{
        e.preventDefault()
        try{
            const enteredFullName=inputFullName.current.value
            const enteredPhotoURL= inputPhotoURL.current.value
            const idToken = localStorage.getItem('token')
            console.log("update profile", enteredFullName,enteredPhotoURL)
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',{
                method:'POST',
                body:JSON.stringify({
                    idToken:idToken,
                    displayName:enteredFullName,
                    photoUrl:enteredPhotoURL,
                    returnSecureToken:true
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })

            if(response.ok){
                console.log("update profile response",response)
                const data = await response.json()
                console.log("update profile data",data)

            }
            else{
                console.log("profile not updated")
            }
        }
        catch(err){
            console.log(err)
        }
       
    }

  return (
    <Container className={styles.container}>
      <h1>SignUp</h1>
      <Form onSubmit={submitProfileHandler}>
      <Form.Group className="mb-3" controlId="name" >
        <Form.Label>Enter Full Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Full Name" ref={inputFullName}  required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="photoURL" >
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control type="text" placeholder="Enter Profile Photo URL" ref={inputPhotoURL} required />
      </Form.Group>

      
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
    </Container>
  )
}

export default UserProfile
