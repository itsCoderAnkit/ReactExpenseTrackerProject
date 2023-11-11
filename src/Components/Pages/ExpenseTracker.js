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
        <>
        <Container className={currentMode ===true ? styles.container:styles.containerDark}>
            <h3> Welcome to Expense Tracker</h3>
            <div>
                <p>Your Profile is Incomplete</p>
                <Button onClick={updateProfileHandler}>Complete Here</Button>
            </div>
            <Button onClick={expenseTrackerHandler}>Manage Expenses </Button>
            
        </Container>
        <Container className={styles.para}>
        <p>Welcome to Financier, your ultimate companion in financial management! In the fast-paced world we live in, keeping tabs on your expenses is more crucial than ever. That's where Financier steps in, revolutionizing the way you track and manage your finances.

Say goodbye to the hassle of juggling receipts and manually entering transactions. Financier is designed with simplicity and efficiency in mind, offering you a seamless experience to effortlessly monitor your spending, set budgets, and achieve your financial goals.

With intuitive features and a user-friendly interface, our app empowers you to take control of your money with ease. Whether you're a seasoned budgeting pro or just starting on your financial journey, Financier is here to simplify the process and provide you with valuable insights into your spending habits.

Track your expenses on the go, categorize transactions effortlessly, and visualize your financial health through insightful reports and charts. Make informed decisions, save more, and reach your financial milestones with confidence.

Join countless others who have embraced financial freedom through Financier. Start your journey towards a more secure and prosperous future today!

</p>
        </Container>
        </>
        
    )
}

export default ExpenseTracker
