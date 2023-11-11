import {render,screen} from '@testing-library/react'
import Login from './Login'

test('renders "LOGIN FORM" as a text',()=>{
    //ARRANGE
    render(<Login/>)

    // ACT
    //....

    //ASSERT

    const loginForm = screen.getByText('Login Form')
    expect (loginForm).toBeInTheDocument()
})