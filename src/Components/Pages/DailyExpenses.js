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
    let [tableExpense, setTableExpense] = useState([])
    useEffect(() => {
        //console.log(expense)
        const updateTableExpense = expense.map((item, index) => (<tr key={index}>
            <td>{index + 1}</td>
            <td>{item.Amount}</td>
            <td>{item.Description}</td>
            <td>{item.Category}</td>
        </tr>))
        setTableExpense(updateTableExpense)
    }, [expense])


    useEffect( ()=>{
        async function getAllExpenses(){
       
            try{
                
                const response = await fetch('https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses.json')
    
                if(response.status===200){
                    console.log("get response>>>",response)
                    const data = await response.json()

                   let arrOfKeys=Object.keys(data)
                    for(let x of arrOfKeys){
                        console.log(x,data[x])
                    }
                }
                else{
                    const Error_Message = "Unable to Fetch Data, Try Again Later"
                    throw new Error(Error_Message)
                }
            }
            catch(err){
                console.log(err)
                alert(err)
            }
        }
        getAllExpenses()
    },[])


    // const previousExpenses = 
    // previousExpenses()
    
    const submitNewExpenseHandler = async (e) => {
        e.preventDefault()
        try {
            const enteredExpenseAmount = inputExpense.current.value
            const enteredExpenseDescription = inputDescription.current.value
            const enteredExpenseCategory = inputCategory.current.value

            //console.log(enteredExpenseAmount,enteredExpenseDescription,enteredExpenseCategory)
            const currentExpense = { Amount: enteredExpenseAmount, Description: enteredExpenseDescription, Category: enteredExpenseCategory }

            const response = await fetch('https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses.json',
                {
                    method: 'POST',
                    body: JSON.stringify(currentExpense),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            if (response.status === 200) {
                const data = await response.json()
                console.log(data)
            }
            else {
                const data = await response.json()
                console.log(data)
                const Error_Message = "Unable to save, Retry"
                throw new Error(Error_Message)
            }

            setExpense([...expense, currentExpense])

            inputExpense.current.value = ""
            inputDescription.current.value = ""
            inputCategory.current.value = "Select Category"

        }

        catch (err) {
            alert(err)

        }


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
