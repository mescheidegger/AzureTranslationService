// Masthead.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Masthead() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Translate</Nav.Link>
        <Nav.Link as={Link} to="/detect">Detect Language</Nav.Link>
        <Nav.Link as={Link} to="/translatebatch">Translate Batch</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  );
}

export default Masthead;