import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import styles from './DailyExpenses.module.css'

function DailyExpenses() {

    const inputExpense = useRef()
    const inputDescription = useRef()
    const inputCategory = useRef()

    let [expense, setExpense] = useState([])
    let [tableExpense,setTableExpense] = useState([])
    useEffect(() => {
        console.log(expense)
        const updateTableExpense = expense.map((item,index) => (<tr key={index}>
            <td>{index+1}</td>
            <td>{item.Amount}</td>
            <td>{item.Description}</td>
            <td>{item.Category}</td>
        </tr>))
        setTableExpense(updateTableExpense)
    }, [expense])

    //let allExpenses = []

    const submitNewExpenseHandler = (e) => {
        e.preventDefault()
        const enteredExpenseAmount = inputExpense.current.value
        const enteredExpenseDescription = inputDescription.current.value
        const enteredExpenseCategory = inputCategory.current.value

        //console.log(enteredExpenseAmount,enteredExpenseDescription,enteredExpenseCategory)
        const currentExpense = { Amount: enteredExpenseAmount, Description: enteredExpenseDescription, Category: enteredExpenseCategory }
        setExpense([...expense, currentExpense])

        inputExpense.current.value=""
        inputDescription.current.value=""
        inputCategory.current.value="Select Category"
        
    }
    return (
        <>
            <Container className={styles.container}>
                <h1>Add New Expense</h1>
                <Form onSubmit={submitNewExpenseHandler}>
                    <Form.Group className="mb-3" controlId="Expense" >
                        <Form.Label>Expense</Form.Label>
                        <Form.Control type="number" placeholder="Expense" ref={inputExpense} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Description" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" ref={inputDescription} required />
                    </Form.Group>
                    <Form.Label>Choose Category</Form.Label>
                    <Form.Select aria-label="Default select example" ref={inputCategory}>

                        <option>Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </Form.Select>

                    <Button variant="primary" type="submit">Add Expense</Button>
                </Form>
            </Container>
            <Container className={styles.container} >
                <h3>MY Expenses List</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S.NO.</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableExpense}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default DailyExpenses
