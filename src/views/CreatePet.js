import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { FormContainer } from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { addPet } from '../redux/actions/petActions';
import { PET_CREATE_RESET } from '../redux/constants/petConstants';

export const CreatePet = ({ match, history}) => {
    const id = match.params.id;

    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [extra_info, setExtraInfo] = useState('');

    const petAddState = useSelector(state => state.petAdd);
    const { success } = petAddState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: PET_CREATE_RESET });
        if (success) {
            history.push(`/user/${id}/details`);
        }
    }, [success, dispatch, history, id])

    const createPetHandler = (e) => {
        e.preventDefault()
        dispatch(addPet({
            user: id,
            name,
            size,
            photo: null,
            extra_info
        }));
    }

    return (
        <FormContainer>
            <div className='d-flex justify-content-between align-items-center'>
                <Link to={`/user/${id}/details`}>
                    Atrás
                </Link>
                <h3>Agregar nueva mascota</h3>
            </div>
            
            <Form onSubmit={createPetHandler}>
                <Form.Group>
                    <Form.Label>Nombre de Mascota</Form.Label>
                    <Form.Control 
                        required
                        type='text' 
                        placeholder='Ingresa el nombre de la mascota' 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tamaño de Mascota</Form.Label>
                    <Form.Control
                        required
                        as='select' 
                        placeholder='Ingresa el tamaño de la mascota' 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    >
                        <option value='Grande'>Selecciona un tamaño de mascota:</option>
                        <option value='Grande'>Grande</option>
                        <option value='Mediano'>Mediano</option>
                        <option value='Pequeño'>Pequeño</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Información extra de mascota</Form.Label>
                    <Form.Control 
                        as="textarea" rows={4} 
                        value={extra_info}
                        onChange={(e) => setExtraInfo(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className='w-100'>Crear Mascota</Button>
            </Form>
        </FormContainer>
    );
}
