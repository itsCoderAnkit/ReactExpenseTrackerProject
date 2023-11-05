import React,{useRef,useState} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './ForgotPassword.module.css'
import {useHistory} from 'react-router-dom'

function ForgotPassword() {

    const history = useHistory()
    const inputLoginEmail = useRef()
    const [message,setMessage] = useState('')

    const submitForgotPasswordHandler = async (e)=>{
        e.preventDefault()
        
        setMessage('Sending Reset Password Link .....')

        try{
            const enteredForgotPasswordEmail = inputLoginEmail.current.value
            console.log(enteredForgotPasswordEmail)
            if(enteredForgotPasswordEmail!==""){
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',{
                    method:'POST',
                    body:JSON.stringify({
                        requestType:'PASSWORD_RESET',
                        email:enteredForgotPasswordEmail
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(response.ok){
                    setMessage('Reset Password Link Sent, Redirecting to Login Page... ')
                    console.log(">>>",response)
                    const data = await response.json()
                    console.log(">>>",data)
                    setTimeout(()=>{

                        history.replace('/login')
                    },5000)
                    
                    
                }
                else{
                    const data = await response.json()
                    console.log(data)
                }
            }
        }
        catch(err){

        }
       
    }

  return (
    <Container className={styles.container}>
            <h4>FORGOT PASSWORD? ENTER YOUR EMAIL ID...</h4>
            { <h6>{message}</h6>}
            
            <Form onSubmit={submitForgotPasswordHandler}>
                <Form.Group className="mb-3" controlId="Email" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={inputLoginEmail} required />
                </Form.Group>
                
                <Button variant="primary" type="submit">Send Reset Link</Button>
            </Form>
        </Container>
  )
}

export default ForgotPassword
