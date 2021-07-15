import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { doggerAPI } from '../redux/api/doggerAPI';
import { login } from '../redux/actions/userActions';

import { FormContainer } from '../components/FormContainer';
import { Message } from '../components/Message';
import { Loader } from '../components/Loader';


export const Register = ({ history, location }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const registerHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        doggerAPI.post('/register', {username, email, password, role})
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(login(username, password));
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response.data.username[0]);
                setLoading(false);
            })
    }

    return (
        <FormContainer>
            <h3 className='text-center mb-4'>Registrate como dueño</h3>
            <Form onSubmit={registerHandler}>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Ingresa nombre de usuario' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        required 
                        type='email' 
                        placeholder='Ingresa email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tipo de usuario</Form.Label>
                    <Form.Control
                        required
                        as='select' 
                        placeholder='Ingresa el tipo de usuario' 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value=''>Selecciona un tipo de usuario</option>
                        <option value='Dueño'>Dueño</option>
                        <option value='Paseador'>Paseador</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        required
                        type='password' 
                        placeholder='Ingresa password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirmar password</Form.Label>
                    <Form.Control 
                        required
                        type='password' 
                        placeholder='Confirmar password' 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                { error && <Message variant='danger'>{error}</Message>}
                { loading && <Loader size={100} margin={30} />}
                <Form.Group className='text-center'>
                    <Button className='mb-3 w-100' variant='primary' type='submit'>
                        Registrarse
                    </Button>
                </Form.Group>
                <div className='text-center'>
                    <Link to='/login'> ¿Tienes ya una cuenta? </Link>
                </div>
            </Form>
        </FormContainer>
    );
}
