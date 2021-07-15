import React, { useState } from 'react';
import { FormContainer } from '../components/FormContainer';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Datetime from 'react-datetime';

import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { doggerAPI } from '../redux/api/doggerAPI';
import { Message } from '../components/Message';

export const CreateWalk = ({ match, history }) => {
    const id = match.params.id;

    const [beginning, setBeginning] = useState(null);
    const [end, setEnd] = useState(null);
    const [error, setError] = useState(null);

    const createWalkHandler = (e) => {
        e.preventDefault();

        doggerAPI.post('/walks', {
            beginning, 
            end,
            pet: [
                7
            ],
            walker: id
        })
            .then((response) => {
                history.push(`/walker/${id}/details`)
            })
            .catch((error) => {
                setError(error.response.data.error);
            })
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
                    <Form.Label>Selecciona mascota para paseo</Form.Label>
                    <Form.Control
                        required
                        as='select' 
                        placeholder='Selecciona mascota para paseo' 
                    >
                        <option value=''></option>
                        <option value='Mediano'>Rex</option>
                        <option value='Pequeño'>Asley</option>
                    </Form.Control>
                </Form.Group>
                { error && <Message variant='danger'>{error}</Message> }
                <Button type='submit' className='w-100'>Solicitar paseo</Button>
            </Form>
        </FormContainer>
    );
}
