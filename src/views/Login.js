import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FormContainer } from '../components/FormContainer';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';

import { USER_LOGIN_RESET } from '../redux/constants/userConstants';
import { login } from '../redux/actions/userActions';

export const Login = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogged = useSelector(state => state.authUser);
    const { loading, error, userInfo } = userLogged;

    useEffect(() => {
        dispatch({ type: USER_LOGIN_RESET });
        if (userInfo) {
            history.push('/walkers');
        }
    }, [history, userInfo, dispatch])

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    }

    return (
        <FormContainer>
            <h3 className='text-center mb-4'>Iniciar sesión</h3>
            <Form onSubmit={loginHandler}>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Ingresa tu nombre de usuario' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type='password' 
                        placeholder='Ingresa tu password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                { error && <Message variant='danger'>{error}</Message>}
                { loading && <Loader size={100} margin={30} />}
                <Form.Group className='text-center'>
                    <Button className='mb-3 w-100' variant='primary' type='submit'>
                        Iniciar sesión
                    </Button>
                </Form.Group>
                <div className='text-center'>
                    ¿No tienes cuenta? 
                    <Link to='/register'> Registrate</Link>
                </div>
                <div className='text-center'>
                    <Link to='/forgotpassword'>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
            </Form>
        </FormContainer>
    );
}
