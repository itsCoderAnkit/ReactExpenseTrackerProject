import {render,screen} from '@testing-library/react'
import Login from './Login'
import { renderWithProviders } from '../utils/utilsForTests'

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