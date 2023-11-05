import React, { useContext, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css'
import { useHistory } from 'react-router-dom';
import AuthContext from '../Store/AuthContext';
import { Link } from 'react-router-dom';

function Login() {

    const authCtx = useContext(AuthContext)

    const history= useHistory()
    const inputLoginEmail = useRef()
    const inputLoginPassword = useRef()

    const submitLoginHandler = async (e) => {
        e.preventDefault()
        try{
            const enteredLoginEmail = inputLoginEmail.current.value
            const enteredLoginPassword = inputLoginPassword.current.value
            //console.log(enteredLoginEmail,enteredLoginPassword)
            if(enteredLoginEmail!=="" && enteredLoginPassword!==""){

            
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',
            {
                method:'POST',
                body:JSON.stringify({
                    email:enteredLoginEmail,
                    password:enteredLoginPassword,
                    returnSecureToken:true
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
                if(response.ok){
                    console.log("Login response",response)
                    const data = await response.json()
                    console.log("Login Data",data)
                    localStorage.setItem('email',data.email)
                    localStorage.setItem('token',data.idToken)
                    authCtx.isLoggedIn=true
                    authCtx.login(data.idToken,data.email)

                    history.replace('/expense-tracker')

                }
                else{
                    const Error_Message = "Invalid Credentials"
                    throw new Error(Error_Message)
                }
                   
        }
        else{
            const Error_Message = "Please Fill All Fields"
            throw new Error(Error_Message)
        }
    }
        catch(err){
            console.log(err)
            alert(err)
        }
    }

    return (
        <Container className={styles.container}>
            <h1>Login Form</h1>
            <Form onSubmit={submitLoginHandler}>
                <Form.Group className="mb-3" controlId="Email" >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={inputLoginEmail} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={inputLoginPassword} required />
                </Form.Group>
                <Link to="/forgot-password">Forgot Password</Link>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default Login
