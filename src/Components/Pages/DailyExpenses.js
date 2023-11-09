import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import styles from './DailyExpenses.module.css'

let firstLoad = false


function DailyExpenses() {
    let editData = false
    let expenseId 
    const inputExpense = useRef()
    const inputDescription = useRef()
    const inputCategory = useRef()
    console.log("start")
    let getResponse = {}
    let deleteExpense
    let postResponse
    let editResponse
    let [expense, setExpense] = useState({})
    let [tableExpense, setTableExpense] = useState([])


    useEffect(() => {
        if (firstLoad) {
            // console.log("expense>>>>", expense)

            let ArrOfKeys = Object.keys(expense)
            let finalArr = []
            for (let i = 0; i < ArrOfKeys.length; i++) {
                let newArr = []
                let key = ArrOfKeys[i]
                //console.log(i,key,expense[key])
                newArr.push(key)
                newArr.push(expense[key])
                finalArr.push(newArr)
            }
            //console.log(finalArr)
            const updateTableExpense = finalArr.map((item, index) => (<tr key={item[0]}>
                <td>{index + 1}</td>
                <td>{item[1].Amount}</td>
                <td>{item[1].Description}</td>
                <td>{item[1].Category}</td>
                <td>{<Button variant="primary" type="submit" onClick={editExpenseHandler} id={item[0]}>Edit</Button>}</td>
                <td>{<Button variant="primary" type="submit" onClick={deleteExpenseHandler} id={item[0]}>Delete</Button>}</td>

            </tr>))

            //setTableExpense(updateTableExpense)
        }
    }, [getResponse,deleteExpense,editResponse])



    useEffect(() => {
        async function getAllExpenses() {
            try {
                getResponse = await fetch('https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses.json')
                if (getResponse.status === 200) {
                    //console.log("get response>>>", response)
                    let previousExpenseData = await getResponse.json()
                    console.log("previousExpenseData>>>", previousExpenseData)

                    setExpense((expense) => { return { ...expense, ...previousExpenseData } })
                    firstLoad = true
                    console.log("getResponse")
                }

                else {
                    const Error_Message = "Unable to Fetch Data, Try Again Later"
                    throw new Error(Error_Message)
                }
            }
            catch (err) {
                console.log(err)
                alert(err)
            }
        }
        getAllExpenses()
    }, [])


    // const previousExpenses = 
    // previousExpenses()

    const editExpenseHandler = (e) => {
        e.preventDefault()
       expenseId = e.target.id
        console.log("edit key     >>>>", expenseId)
        async function getEdit() {
            try {
                let getEditResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses/${expenseId}.json`)
                console.log(getEditResponse)
                if (getEditResponse.status === 200) {
                    const data = await getEditResponse.json()
                    console.log(data)
                    inputExpense.current.value = data.Amount
                    inputDescription.current.value = data.Description
                    inputCategory.current.value = data.Category
                    editData = true
                    console.log("edit handler", editData)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getEdit()

    }

    const deleteExpenseHandler = async (e) => {
        e.preventDefault()
         expenseId = e.target.id
        console.log("delete key>>>>", e.target.id)

        deleteExpense = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(deleteExpense)

    }

    const submitNewExpenseHandler = async (e) => {
        e.preventDefault()
        try {
            console.log("submit handler",editData)
            const enteredExpenseAmount = inputExpense.current.value
            const enteredExpenseDescription = inputDescription.current.value
            const enteredExpenseCategory = inputCategory.current.value
            const currentExpense = { Amount: enteredExpenseAmount, Description: enteredExpenseDescription, Category: enteredExpenseCategory }
            if (!editData) {
                console.log("posting new data in firebase")
                //console.log(enteredExpenseAmount,enteredExpenseDescription,enteredExpenseCategory)
                 postResponse = await fetch('https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses.json',
                    {
                        method: 'POST',
                        body: JSON.stringify(currentExpense),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                if (postResponse.status === 200) {
                    const data = await postResponse.json()
                    console.log("data saved to firebase >>", data)
                    setExpense({ ...expense, ...currentExpense })
                    setExpense((expense) => { return { ...expense, ...currentExpense } })
                    console.log(expense)
                }
                else {
                    const data = await postResponse.json()
                    console.log(data)
                    const Error_Message = "Unable to save, Retry"
                    throw new Error(Error_Message)
                }

            }
            if (editData) {
                console.log("editing data  and put in firebase")
                 editResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/expenses/${expenseId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(currentExpense),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(editResponse)
                if (editResponse.status === 200) {
                    const data = await editResponse.json()
                    console.log("data saved to firebase during edit >>", data)
                    setExpense({ ...expense, ...currentExpense })
                    setExpense((expense) => { return { ...expense, ...currentExpense } })
                    console.log(expense)
                }
                else {
                    const data = await editResponse.json()
                    console.log(data)
                    const Error_Message = "Unable to Edit, Retry"
                    throw new Error(Error_Message)
                }
            }
            inputExpense.current.value = ""
            inputDescription.current.value = ""
            inputCategory.current.value = "Select Category"

        }

        catch (err) {

            console.log(err)
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
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {tableExpense}
                        {/* {table} */}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default DailyExpenses