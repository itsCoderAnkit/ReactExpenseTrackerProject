import {render,screen} from '@testing-library/react'
import ExpenseTracker from '../Components/Pages/ExpenseTracker'
import { renderWithProviders } from '../utils/UtilsForTests'


describe('ExpenseTracker Component',()=>{
    test('renders "Your Profile Is Incomplete" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<ExpenseTracker/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Your Profile Is Incomplete',{exact:false})
        expect (loginForm).toBeInTheDocument()
    })
    
    test('renders "Manage Expenses" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<ExpenseTracker/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Manage Expenses',{exact:false})
        expect (loginForm).toBeInTheDocument()
    })
})

