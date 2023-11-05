import React,{useState} from 'react'


function EmailVerification() {

    const [progress,setProgress] = useState('Email Verifying')

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
                // verification link sent but now how to verify?
            }
            else{
                const data= await response.json()
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

  return (
    <h1>{progress}</h1>
  )
}

export default EmailVerification
