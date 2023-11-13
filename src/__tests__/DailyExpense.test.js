import {render,screen} from '@testing-library/react'
import ExpenseTracker from '../Components/Pages/ExpenseTracker'
import { renderWithProviders } from '../utils/UtilsForTests'


describe("DailyExpense Component", ()=>{
    test('renders "Add new Expenses',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<ExpenseTracker/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Add new Expenses',{exact:false})
        expect (loginForm).toBeInTheDocument()
    })
    
    test('renders "Category" ',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<ExpenseTracker/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Category',{exact:false})
        expect (loginForm).toBeInTheDocument()
    })

})
