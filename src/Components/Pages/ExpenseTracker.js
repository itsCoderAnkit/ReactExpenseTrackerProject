import Button from 'react-bootstrap/Button';
import React from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import styles from './ExpenseTracker.module.css'
import { useSelector } from 'react-redux';
function ExpenseTracker() {

    const currentMode = useSelector((state)=>state.mode.mode)
    console.log("mode now>>>>>>>>.",currentMode)

const history = useHistory()
    const updateProfileHandler = ()=>{
        history.push('/update-profile')
    }

    const expenseTrackerHandler = ()=>{
        history.push('/daily-expense')
    }
    return (
        <Container className={currentMode ===true ? styles.container:styles.containerDark}>
            <h3> Welcome to Expense Tracker</h3>
            <div>
                <p>Your Profile is Incomplete</p>
                <Button onClick={updateProfileHandler}>Complete Here</Button>
            </div>
            <Button onClick={expenseTrackerHandler}>Go To Expense Tracker</Button>
        </Container>
    )
}

export default ExpenseTracker
