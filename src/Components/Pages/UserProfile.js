import React, { useEffect,useState} from 'react'
import styles from './UserProfile.module.css'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UserProfile() {

    const [name,setName] = useState('')
    const [photoURL,setPhotoURL] = useState('')

    const getInputName = (event)=>{    
            setName(event.target.value)
    }

    const getInputPhotoURL =(event)=>{
            setPhotoURL(event.target.value)
        }

    useEffect(()=>{
        async function getDetails() {
        
            console.log("get user data")
            const token = localStorage.getItem('token')
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',
            {
                method:'POST',
                body:JSON.stringify({
                    idToken:token
                }),
                headers:{
                    'Content-Type':'application/json'
                }
    
            })
    
            if(response.ok){
                console.log(response)
                const data = await response.json()
                console.log(data.users[0])
                const previousName=data.users[0].displayName
                setName(previousName)
                const previousURL=data.users[0].photoUrl
                setPhotoURL(previousURL)
            }
        }
        getDetails()
    },[])
    
    
    const submitProfileHandler = async (e)=>{
        e.preventDefault()
        try{
            
            const enteredFullName = name
            const enteredPhotoURL = photoURL

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
        <Form.Control type="text" placeholder="Enter Full Name" value={name} onChange={getInputName}  required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="photoURL" >
        <Form.Label>Profile Photo URL</Form.Label>
        <Form.Control type="text" placeholder="Enter Profile Photo URL" value={photoURL} onChange={getInputPhotoURL} required />
      </Form.Group>

      
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
    </Container>
  )
}

export default UserProfile
