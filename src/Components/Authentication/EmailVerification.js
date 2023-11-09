import React,{useState, useRef, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './EmailVerification.module.css'
import { useHistory } from 'react-router-dom';

function EmailVerification() {
    const history=useHistory()

    const inputVerifyLink = useRef()
    const [progress,setProgress] = useState('Sending Verification link to your Email... wait')


    useEffect(()=>{
        const sendVerification = async ()=>{
            try{
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',{
                    method:'POST',
                    body:JSON.stringify({
                        requestType:'VERIFY_EMAIL',
                        idToken:localStorage.getItem('token')
                       
                    }),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
    
                if(response.status===200){
                    console.log(response)
                    const data= await response.json()
                    console.log( data)
                    setProgress('Email Verification Link Sent , Verify your Email ')
    
                    //setForm(true)
                    // verification link sent but now how to verify?
    
                    
                }
                else{
                    const data= await response.json()
                    console.log("error else", data)
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
    },[])
    

const deleteAccount = async ()=>{
    try{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',{
        method:'POST',
        body:localStorage.getItem('token'),
        headers:{
            'Content-Type':'application/json'
        }
    })
    if(response.status === 200){
        setProgress('SIGN UP AGAIN')
    }
    else{
        throw new Error('REVERIFY YOUR ID')
    }
    }
    catch(err){
        console.log(err)
        alert(err)
    }

}

const submitVerifyLinkHandler = async(e)=>{
    e.preventDefault()
    try{
        const enteredLink = inputVerifyLink.current.value
        console.log(enteredLink)
        
        const verificationResponse = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAC5PAcrAq1M_kFCh5AoCnelVB4xQmHqE8',
        {
            method:'POST',
            body:JSON.stringify({
                oobCode:enteredLink
            }),
            headers:{
                'Content-Type':'application/json'
            }


        })
         if(verificationResponse.status=200){
            const response =verificationResponse
            console.log("verificationResponseok")
            console.log("verification response>>>",response)
            const data = await verificationResponse.json()
            console.log(data)
            history.push('/login')
        }
        else{
            console.log("verificationResponse else" , verificationResponse)
            const data = await verificationResponse.json()
            console.log("else data",data)
            deleteAccount()
        }
    }
    catch(err){
        console.log(err)

    }
}

  return (
  <>
   
    <Container className={styles.container}>
     <h1 >EMAIL VERIFICATION</h1>
           <h3>{progress}</h3>
            <Form onSubmit={submitVerifyLinkHandler}>
                <Form.Group className="mb-3" controlId="Link" >
                    <Form.Label>Enter Verification Link you got on your Email </Form.Label>
                    <Form.Control type="text" placeholder="Enter Link" ref={inputVerifyLink} required />
                </Form.Group>
                
                <Button variant="primary" type="submit">Check Verification</Button>
            </Form>
        </Container>
        </>
  )
}

export default EmailVerification
