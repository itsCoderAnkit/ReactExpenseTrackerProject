import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import styles from './Header.module.css'
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';


function Header() {
  return (
    <header>
        <Navbar className={styles.navbar}
        bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className={styles.brand} href="#home">Track Your Finances</Navbar.Brand>
          <Nav className={styles.centerlinks}>
            <NavLink activeClassName={styles.active} to="/home">Home</NavLink>
            <NavLink activeClassName={styles.active} to="/features">Features</NavLink>
            <NavLink activeClassName={styles.active} to="/signup">Sign Up</NavLink>
          </Nav>
        </Container>
      </Navbar>
      </header>

  )
}

export default Header