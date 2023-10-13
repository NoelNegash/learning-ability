import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import {FaSignInAlt } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../slices/usersApiSlice"
import { logout } from "../slices/authSlice"

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector((state) => state.auth)

    const [logoutApiCall] = useLogoutMutation()

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand> A Learning Ability </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? 
                            <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to="/decks">
                                        <NavDropdown.Item>
                                            Definition Lists
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={ logoutHandler }> Logout </NavDropdown.Item>
                                </NavDropdown>
                            </> :
                            <>
                                <LinkContainer to='login'>
                                    <Nav.Link>
                                        <FaSignInAlt /> Log In
                                    </Nav.Link>
                                </LinkContainer>

                                <LinkContainer to='/signup'>
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign Up
                                    </Nav.Link>
                                </LinkContainer>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header