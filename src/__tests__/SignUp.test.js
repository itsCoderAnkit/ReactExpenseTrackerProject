import {render,screen} from '@testing-library/react'
import SignUp from '../Components/Pages/SignUp'
import { renderWithProviders } from '../utils/UtilsForTests'

describe('SignUp Page',()=>{
    test('renders "SignUp" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<SignUp/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('SignUp')
        expect (loginForm).toBeInTheDocument()
    })
    
    test('renders "LogOut" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<SignUp/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Logout',{exact:false})
        expect (loginForm).not.toBeInTheDocument()
    })
})