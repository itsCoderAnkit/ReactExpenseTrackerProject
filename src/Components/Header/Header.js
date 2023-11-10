import React,{useState} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
  let token = localStorage.getItem('token')
  let email = localStorage.getItem('email')
  const login = useSelector((state)=>state.auth)
    console.log("header auth slice",login)

  
  
  return (
    <header>
        <Navbar className={styles.navbar}>
        <Container>
          <Navbar.Brand className={styles.brand} href="/home">Track Your Finances</Navbar.Brand>
          <Nav className={styles.centerlinks}>
            <NavLink activeClassName={styles.active} to="/home">Home</NavLink>
            {
              !login.isLoggedIn && <NavLink activeClassName={styles.active} to="/login">Login</NavLink>
            }
            {
            !login.isLoggedIn && <NavLink activeClassName={styles.active} to="/signup">Sign Up</NavLink>
            }
            
            {!!login.tokenId && <NavLink activeClassName={styles.active} to="/logout">LogOut</NavLink>}
            
          </Nav>
         
        </Container>
        <Container>
        <div>
            {login.isLoggedIn && <h6>{login.emailId}</h6>}
          </div>
        </Container>
      </Navbar>
      </header>

  )
}

export default Header
