import React,{useState, useRef} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './EmailVerification.module.css'

function EmailVerification() {

    const inputVerifyLink = useRef()
    const [progress,setProgress] = useState('Verify your Email')
    const [form,setForm] = useState(false)

    const sendVerification = async ()=>{
        try{
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',{
                method:'POST',
                body:JSON.stringify({
                    requestType:'VERIFY_EMAIL',
                    idToken:localStorage.getItem('token')
                   // idToken:'123456789'
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })

            if(response.ok){
                console.log(response)
                const data= await response.json()
                console.log( data)
                setProgress('Email Verification Link Sent , Verify your Email')

                setForm(true)
                // verification link sent but now how to verify?

                
            }
            else{
                const data= await response.json()
                console.log("error else")
                const Error_Message = data.error.message
                throw new Error(Error_Message)
            }
        }
        catch(err){
            console.log(err)
            alert(err)
        }
    }
sendVerification()

const submitVerifyLinkHandler = async(e)=>{
    e.preventDefault()
    try{
        const enteredLink = inputVerifyLink.current.value
        console.log(enteredLink)
        
        const verificationResponse = fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',
        {
            method:'POST',
            body:JSON.stringify({
                oobCode:enteredLink
            }),
            headers:{
                'Content-Type':'application/json'
            }


        })
         if(verificationResponse.ok){
            console.log("verificationResponseok")
            console.log("verification response>>>",verificationResponse)
            const data = await verificationResponse.json()
            console.log(data)
        }
        else{
            console.log("verificationResponse else")
            const data = await verificationResponse.json()
            console.log("else data",data)
        }
    }
    catch(err){
        console.log(err)

    }
}

  return (
    
    <Container className={styles.container}>
           <h3>{progress}</h3>
            {form && <Form onSubmit={submitVerifyLinkHandler}>
                <Form.Group className="mb-3" controlId="Link" >
                    <Form.Label>Enter Verification Link you got on your Email </Form.Label>
                    <Form.Control type="text" placeholder="Enter Link" ref={inputVerifyLink} required />
                </Form.Group>
                
                <Button variant="primary" type="submit">Check Verification</Button>
            </Form>}
        </Container>
  )
}

export default EmailVerification
