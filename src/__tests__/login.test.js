import {render,screen} from '@testing-library/react'
import Login from '../Components/Pages/Login'
import { renderWithProviders } from '../utils/UtilsForTests'


describe('LoginPage',()=>{
    test('renders "LOGIN FORM" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<Login/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Login Form')
        expect (loginForm).toBeInTheDocument()
    })
    
    test('renders "LogOut" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<Login/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('LogOut',{exact:false})
        expect (loginForm).not.toBeInTheDocument()
    })
})

