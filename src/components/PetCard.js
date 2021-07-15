import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const PetCard = ({pet, userLogged, userOwnerId, petDeleteHandler}) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={pet.photo ? pet.photo : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80'} alt={pet.name} />
            <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>
                    <strong>Tamaño: </strong> {pet.size}
                </Card.Text>
                <Card.Text>
                    <strong>Información especial: </strong> {pet.extra_info ? pet.extra_info : 'Ninguna'}
                </Card.Text>
                { userLogged?.id === userOwnerId && userLogged?.role !== 'Paseador' && <Button className='w-50' onClick={() => petDeleteHandler(pet.id)}>Update</Button>}
                { userLogged?.id === userOwnerId && userLogged?.role !== 'Paseador' && <Button className='w-50' variant='danger' onClick={() => petDeleteHandler(pet.id)}>Delete</Button>}
            </Card.Body>
        </Card>
    );
}
