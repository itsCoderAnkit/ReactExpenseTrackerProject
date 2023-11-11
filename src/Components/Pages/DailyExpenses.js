import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import styles from './DailyExpenses.module.css'
import { expenseActions } from '../Store/expenseSlice';
import { modeActions } from '../Store/modeSlice';
import { useSelector, useDispatch } from 'react-redux'

let firstLoad = true


function DailyExpenses() {

    const dispatch = useDispatch()
    // const myexpenseslice = useSelector((state) => state.expense)
    // console.log("daily expense expense slice>>>>>>",myexpenseslice)

    const dailyExp = useSelector((state) => state.expense)

    const currentMode = useSelector((state) => state.mode.mode)


    if (currentMode) {
        document.body.style.backgroundColor = "white"
    }
    else if (!currentMode) {
        document.body.style.backgroundColor = "black"
    }


    let email = localStorage.getItem('email')
    const email1 = email.replaceAll('@', '')
    const email2 = email1.replaceAll('.', '')

    let getResponse = {}
    let deleteExpense
    let postResponse
    let editResponse

    const inputExpense = useRef()
    const inputDescription = useRef()
    const inputCategory = useRef()
    // console.log("start")

    let [expense, setExpense] = useState({})
    let [tableExpense, setTableExpense] = useState([])
    let [activate, setActivate] = useState(false)
    let [editData, setEditData] = useState(false)
    let [expenseId, setExpenseId] = useState()

    const deleteExpenseHandler = async (e) => {
        e.preventDefault()
        setExpenseId(e.target.id)
        //var num1 = e.target.id
        console.log("delete key>>>>", e.target.id, expense)

        // deleteExpense = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/${email2}/expenses/${e.target.id}.json`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // console.log(deleteExpense)


        setExpense((prevExpense) => {
            //console.log("now  it runs", num1)

            // const newExpense = {...prevExpense}
            // delete newExpense[expenseId]
            // const {expenseId,...newExpense} = prevExpense;
            // console.log(newExpense)
            delete prevExpense[e.target.id]
            console.log(prevExpense, e.target.id)
            return prevExpense;
        })
        console.log("after set")
    }
    useEffect(() => {

        if (!firstLoad) {
            console.log("expense>>>>", expense)

            let ArrOfKeys = Object.keys(expense)
            //console.log(ArrOfKeys)
            let finalArr = []
            let totalExpenses = 0
            for (let i = 0; i < ArrOfKeys.length; i++) {
                let newArr = []
                let key = ArrOfKeys[i]
                //console.log(i,key,expense[key])
                totalExpenses = totalExpenses + Number.parseInt(expense[key].Amount)
                newArr.push(key)
                newArr.push(expense[key])
                finalArr.push(newArr)
            }

            dispatch(expenseActions.allExpenses({ expenses: finalArr, totalExpenses: totalExpenses }))

            // console.log("final arr>>>>>", finalArr, totalExpenses)

            const updateTableExpense = finalArr.map((item, index) => (<tr key={item[0]}>
                <td>{index + 1}</td>
                <td>{item[1].Amount}</td>
                <td>{item[1].Description}</td>
                <td>{item[1].Category}</td>
                <td>{<Button variant="primary" type="submit" onClick={editExpenseHandler} id={item[0]}>Edit</Button>}</td>
                <td>{<Button variant="primary" type="submit" onClick={deleteExpenseHandler} id={item[0]}>Delete</Button>}</td>

            </tr>))

            setTableExpense(updateTableExpense)
        }
    }, [expense])

    useEffect(() => {
        async function getAllExpenses() {
            try {
                getResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/${email2}/expenses.json`)
                if (getResponse.status === 200) {
                    console.log("get response>>>", getResponse)
                    let previousExpenseData = await getResponse.json()
                    console.log("previousExpenseData>>>", previousExpenseData)

                    setExpense((expense) => { return { ...expense, ...previousExpenseData } })
                    console.log(expense)
                    firstLoad = false
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

    const editExpenseHandler = (e) => {
        e.preventDefault()
        setExpenseId(e.target.id)
        console.log(">id ", e.target.id)
        let id = e.target.id
        async function getEdit() {
            try {
                let getEditResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/${email2}/expenses/${id}.json`)
                console.log(getEditResponse)
                if (getEditResponse.status === 200) {
                    const data = await getEditResponse.json()
                    console.log(data)
                    inputExpense.current.value = data.Amount
                    inputDescription.current.value = data.Description
                    inputCategory.current.value = data.Category
                    setEditData(true)

                }
            }
            catch (err) {
                console.log(err)
            }
        }
        getEdit()
    }



    const submitNewExpenseHandler = async (e) => {
        e.preventDefault()
        try {
            const enteredExpenseAmount = inputExpense.current.value
            const enteredExpenseDescription = inputDescription.current.value
            const enteredExpenseCategory = inputCategory.current.value
            const currentExpense = { Amount: enteredExpenseAmount, Description: enteredExpenseDescription, Category: enteredExpenseCategory }

            if (!editData) {
                console.log("posting new data in firebase")
                postResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/${email2}/expenses.json`,
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
                    console.log("data saved to firebase<<  >>", data.name)
                    console.log("current expense>>>>", currentExpense)
                    let newExpense = {}
                    newExpense[data.name] = currentExpense
                    console.log(newExpense)
                    setExpense((expense) => { return { ...expense, ...newExpense } })
                }
                else {
                    const data = await postResponse.json()
                    console.log(data)
                    const Error_Message = "Unable to save, Retry"
                    throw new Error(Error_Message)
                }
            }
            if (editData) {
                console.log("editing data  and put in firebase", expenseId)
                editResponse = await fetch(`https://reactexpensetracker-eb718-default-rtdb.firebaseio.com/${email2}/expenses/${expenseId}.json`, {
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
                    console.log(data, currentExpense, expenseId)
                    setExpense((prevExpense) => {
                        const { expenseId, ...newExpense } = prevExpense;
                        return newExpense;
                    })
                    let newExpense = {}
                    newExpense[expenseId] = currentExpense
                    console.log(newExpense)
                    setExpense((expense) => { return { ...expense, ...newExpense } })

                }
                else {
                    const data = await editResponse.json()
                    console.log(data)
                    const Error_Message = "Unable to Edit, Retry"
                    throw new Error(Error_Message)
                }
                setEditData(false)
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

    const activateHandler = () => {
        setActivate(true)
    }

    const themeChangerHandler = (e) => {
        console.log(e)
        dispatch(modeActions.changeMode())
        console.log("theme changer")
    }


    const downloadHandler = () => {
        const download = document.getElementById('download')
        console.log(expense)

        let ArrOfKeys = Object.keys(expense)
        //console.log(ArrOfKeys)
        let finalArr = []
        let totalExpenses = 0
        for (let i = 0; i < ArrOfKeys.length; i++) {
            let newArr = []
            let key = ArrOfKeys[i]
            console.log(i, key, expense[key])
            totalExpenses = totalExpenses + Number.parseInt(expense[key].Amount)
            newArr.push(key)
            newArr.push(expense[key])
            finalArr.push(newArr)
        }
        console.log(">>>>", finalArr)
        const data = finalArr.map((item, index) => (`${index + 1} --> Amount - ${item[1].Amount}, Description - ${item[1].Description}, Category - ${item[1].Category} `))
        const result = data.join('\n')
        const blob = new Blob([result])
        download.href = URL.createObjectURL(blob)
    }

    return (
        <>
            <div className={styles.premium}>
                {dailyExp.totalExpense > 10000 ? <Button variant="primary" type="submit" onClick={activateHandler}>{dailyExp.totalExpense > 10000 ? " PREMIUM USER" : "Activate Premium"}</Button> : null}
                {activate && <a id="download" download="expenses.csv" href='/' onClick={downloadHandler}> Download Expenses</a>}
                {activate && <Form.Check type="switch" id="custom-switch" label="Toggle Mode " onClick={themeChangerHandler} />}

            </div>

            <Container className={currentMode === true ? styles.container : styles.containerDark}>
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
            <Container className={currentMode === true ? styles.container : styles.containerDark} >
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
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default DailyExpenses