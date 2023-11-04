import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './SignUp.module.css'

function SignUp() {

    const inputEmail = useRef()
    const inputPassword = useRef()
    const inputConfirmPassword = useRef()

    const submitSignUpHandler = async (e)=>{
        try{
            e.preventDefault()
        const enteredEmail = inputEmail.current.value;
        const enteredPassword = inputPassword.current.value;
        const enteredConfirmPassword = inputConfirmPassword.current.value

        if((enteredEmail!=="" && enteredPassword!=="" && enteredConfirmPassword!=="") && (enteredPassword===enteredConfirmPassword)){
            console.log("all filled")
           let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8",{
            method:"POST",
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
            })
           
            if(response.ok){
                //console.log("signup fetch response",response)
            }
            else{
                let data = await response.json()
            
            const Error_Message = `Authentication Failed -- ${data.error.message}`
            throw new Error(Error_Message)
            }

            let data = await response.json()
            console.log("response ok json data>>", data)
            
        }
        else{
            
            const Error_Message = "Please Fill All Your Credentials Carefully"
            throw new Error(Error_Message)
        }
        }
        catch (err){
            
            alert(err)
        }
        
    }

    
  return (
    <Container className={styles.container}>
      <h1>SignUp</h1>
      <Form onSubmit={submitSignUpHandler}>
      <Form.Group className="mb-3" controlId="Email" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" ref={inputEmail} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={inputPassword} required/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="confirmPassword" >
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={inputConfirmPassword} required/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </Container>
  )
}

export default SignUp