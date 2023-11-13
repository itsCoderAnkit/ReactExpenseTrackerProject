import {render,screen} from '@testing-library/react'
import Home from '../Components/Pages/Home'
import { renderWithProviders } from '../utils/UtilsForTests'


describe('Home Page',()=>{
    test('renders "Financier" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<Home/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Financier')
        expect (loginForm).toBeInTheDocument()
    })
    
    test('renders "Home" as a text',()=>{
        //ARRANGE
        // render(<Login/>)
        renderWithProviders(<Home/>)
    
        // ACT
        //....
    
        //ASSERT
    
        const loginForm = screen.getByText('Home')
        expect (loginForm).toBeInTheDocument()
    })
})

