import React from 'react';
import { Navbar, Nav, Image, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { BsPersonFill, BsBoxArrowRight } from 'react-icons/bs';

import { logout } from '../redux/actions/userActions';

import Dogger_logo from '../assets/img/dogger_logo.png'

export const NavbarComponent = () => {
    const dispatch = useDispatch();

    const userLogged = useSelector(state => state.authUser);
    const { userInfo: user } = userLogged;

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Navbar className='px-5' bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <LinkContainer to='/walkers'>
                    <Image src={Dogger_logo} width={130} /> 
                </LinkContainer>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <LinkContainer to='/owners'>
                    <Nav.Link>Dueños</Nav.Link>  
                </LinkContainer>
                <LinkContainer to='/walkers'>
                    <Nav.Link>Paseadores</Nav.Link>  
                </LinkContainer>
            </Nav>
            { 
                user?.user
                    ? <Nav>
                        <NavDropdown title={`Bienvenido ${user.user.username} (${user.user.role})`}>
                            <LinkContainer to={ user.user?.role === 'Dueño' ? `/user/${user.user.id}/details` : `/walker/${user.user.id}/details` }>
                                <NavDropdown.Item>
                                    <BsPersonFill className='mr-3' />
                                    Perfil
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                <BsBoxArrowRight className='mr-3' />
                                Cerrar sesión
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    :<Nav>
                        <LinkContainer to='/login'>
                            <Nav.Link>
                                Login
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/register'>
                            <Nav.Link>
                                Registrarse
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
            }
        </Navbar>
    );
}
