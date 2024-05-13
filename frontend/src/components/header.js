import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
// import Stack from 'react-bootstrap/Stack';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import { useState } from 'react';


const HeaderComponent = () => {

    const [count, setcount] = useState(0);
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark'>
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand href="/">Amazon</Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <InputGroup>
                            <DropdownButton id="dropdown-basic-button" title="All">
                                <Dropdown.Item >Electronics</Dropdown.Item>
                                <Dropdown.Item >Books</Dropdown.Item>

                            </DropdownButton>
                            <Form.Control type="text" placeholder="Looking for search...." />
                            <Button variant="warning">

                                <i className="bi bi-search"></i>
                            </Button>
                        </InputGroup>

                    </Nav>
                    <Nav>
                        <LinkContainer to="/admin/order">
                            <Nav.Link>
                                Admin
                                <span className='position-absolute top-1 start-10 translate-middle p-1 bg-danger border border-light rounded-circle'>

                                </span>
                            </Nav.Link>
                        </LinkContainer>


                        <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                            <NavDropdown.Item eventKey="/user/my-order" as={Link} to="/user/my-order">
                                My Orders
                            </NavDropdown.Item>
                            <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                Logout
                            </NavDropdown.Item>


                        </NavDropdown>
                        <LinkContainer to="/login">
                            <Nav.Link>
                                Login
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                            <Nav.Link>
                                Register
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                {<i className="bi bi-cart4" style={{ marginRight: '5px' }}></i>}
                                Cart
                                <Badge pill bg="danger">{count}</Badge>
                            </Nav.Link>

                        </LinkContainer>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}
export default HeaderComponent