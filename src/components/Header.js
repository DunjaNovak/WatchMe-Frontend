import React from 'react'
import { useDispatch, useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import { Navbar,Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin )
  const {userInfo} =userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header >
    <Navbar bg="success" variant='dark' expand="lg" collapseOnSelect>
        <Container>
         
           <Navbar.Brand  href='/'>Hedera</Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href='/cart' ><i className='fas fa-shopping-cart'></i> Korpa</Nav.Link>
         {userInfo ? (
            <NavDropdown title={userInfo.name} id='username'>
             
                  <NavDropdown.Item href='/profile'>Profil</NavDropdown.Item>
              
              <NavDropdown.Item onClick={logoutHandler}>
                Odjava

              </NavDropdown.Item>
            </NavDropdown>

         ) : (
         <Nav.Link href='/login'><i className='fas fa-user'></i> Prijavi se</Nav.Link>
           ) }
            
            {userInfo && userInfo.isAdmin && (
                        
                        <NavDropdown title='Pregled' id='adminmenu'>
             
                        <NavDropdown.Item href='/admin/userlist'>Korisnici</NavDropdown.Item>
                        <NavDropdown.Item href='/admin/productlist'>Proizvodi</NavDropdown.Item>
                        <NavDropdown.Item href='/admin/orderlist'>Porudzbine</NavDropdown.Item>
                    
                  </NavDropdown>
                        )}
            
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>

    </header>
  )
}

export default Header
