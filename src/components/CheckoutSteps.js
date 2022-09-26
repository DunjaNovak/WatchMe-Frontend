import React from 'react'
import { Nav } from 'react-bootstrap'
//import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
         // <LinkContainer to>
            <Nav.Link href='/login'>Prijava</Nav.Link>
         // </LinkContainer>
        ) : (
          <Nav.Link disabled>Prijava</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
        //  <LinkContainer to=''>
            <Nav.Link href='/shipping'>Podaci za dostavu</Nav.Link>
       //   </LinkContainer>
        ) : (
          <Nav.Link disabled>Podaci za dostavu</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
        //  <LinkContainer to=''>
            <Nav.Link href='/payment'>Placanje</Nav.Link>
         // </LinkContainer>
        ) : (
          <Nav.Link disabled>Placanje</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
         // <LinkContainer to=''>
            <Nav.Link href='/placeorder'>Pregled porudzbine</Nav.Link>
         // </LinkContainer>
        ) : (
          <Nav.Link disabled>Pregled porudzbine</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps