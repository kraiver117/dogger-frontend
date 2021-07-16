import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';
import moment from 'moment';

import "react-datetime/css/react-datetime.css";

import { Message } from '../components/Message';
import { doggerAPI } from '../redux/api/doggerAPI';
import { createWalk } from '../redux/actions/walkActions';
import { WALK_CREATE_RESET } from '../redux/constants/walkConstants';

export const CreateWalk = ({ match, history }) => {
    const id = match.params.id;
    const dispatch = useDispatch();

    const [errorPetLength, setErrorPetLength] = useState('');

    const createWalkState = useSelector(state => state.createWalk);
    const { success: successCreateWalk, error: errorCreateWalk } = createWalkState

    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;

    const [beginning, setBeginning] = useState(null);
    const [end, setEnd] = useState(null);
    const [pets, setPets] = useState([]);
    const [selectedPetsForWalk, setSelectedPetsForWalk] = useState([]);

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        } else {
            if (successCreateWalk) {
                dispatch({ type: WALK_CREATE_RESET });
                history.push(`/walker/${id}/details`);
            }

            doggerAPI.get(`/pets/owner/${userInfo.user.id}`)
                .then((response) => {
                    setPets(response.data.data.pets)
                })
        }
    }, [dispatch, history, userInfo, successCreateWalk, id]);

    const createWalkHandler = (e) => {
        e.preventDefault();
        setErrorPetLength('');

        if (selectedPetsForWalk.length > 3){
            setErrorPetLength('Solo puedes solicitar un paseo con 3 mascotas a la vez');
        } else {
            dispatch(createWalk({
                beginning,
                end,
                pet: selectedPetsForWalk,
                walker: id,
                owner: userInfo.user.id
            }))
        }
    }

    const handleSelectPet = (selectedPets) => {
        const arrayPets = [];

        for (let i = 0; i < selectedPets.length; i++) {
            arrayPets.push(Number(selectedPets[i].value));
        }

        setSelectedPetsForWalk(arrayPets);
    }

    const yesterday = moment().subtract(1, "day");
    const validDate = (current) => {
        return current.isAfter(yesterday);
    }

    return (
        <FormContainer>
            <div className='d-flex align-items-center'>
                <Link style={{flex:0.2}} to={`/walker/${id}/details`}>
                    Atrás
                </Link>
                <h3 style={{flex:0.6, textAlign:'center'}}>Solicitar Paseo</h3>
                <div style={{flex:0.2}}></div>
            </div>

            <Form onSubmit={createWalkHandler}>
                <Form.Group>
                    <Form.Label>Comienzo</Form.Label>
                    <Datetime 
                        isValidDate={validDate} 
                        value={beginning} 
                        onChange={(value) => setBeginning(value._d)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fin</Form.Label>
                    <Datetime 
                        isValidDate={validDate} 
                        value={end} 
                        onChange={(value) => setEnd(value._d)}
                    />
                </Form.Group>
                <Form.Group>
                    {
                        pets.length === 0 
                            ? <>
                                <Link className='btn btn-primary mr-3' to={`/user/${userInfo.user.id}/details`} >
                                    Registrar mascota
                                </Link> 
                                <small>No tienes mascotas registradas para paseos</small>
                            </>
                            :(<><Form.Label>Selecciona mascota para paseo</Form.Label>
                                    <Form.Control
                                        multiple
                                        required
                                        as='select' 
                                        placeholder='Selecciona mascota para paseo' 
                                        value={selectedPetsForWalk}
                                        onChange={(e) => handleSelectPet(e.target.selectedOptions)}
                                    >
                                    {
                                        pets.map((pet) => (
                                            <option value={pet.id}>{pet.name}</option>
                                        ))
                                    }
                                </Form.Control>
                            </>)
                    }
                </Form.Group>
                { errorCreateWalk && <Message variant='danger'>{errorCreateWalk}</Message> }
                { errorPetLength && <Message variant='danger'>{errorPetLength}</Message> }
                <Button type='submit' className='w-100' disabled={pets.length === 0}>Solicitar paseo</Button>
            </Form>
        </FormContainer>
    );
}
