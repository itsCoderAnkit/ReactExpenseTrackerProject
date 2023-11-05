import Button from 'react-bootstrap/Button';
import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './ExpenseTracker.module.css'

function ExpenseTracker() {
const history = useHistory()
    const updateProfileHandler = ()=>{
        history.push('/update-profile')
    }

    const verifyEmailHandler = ()=>{
        history.push('/verify-email')
    }
    return (
        <Container className={styles.container}>
            <h3> Welcome to Expense Tracker</h3>
            <div>
                <p>Your Profile is Incomplete</p>
                <Button onClick={updateProfileHandler}>Complete Here</Button>
            </div>
            <Button onClick={verifyEmailHandler}>Verify Email</Button>
        </Container>
    )
}

export default ExpenseTracker
