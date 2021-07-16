import React from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import moment from 'moment';

export const WalkCard = ({walk, walker, userInfo, acceptedWalkHandler, finishWalkHandler, deleteWalkHandler}) => {
    console.log(walk);

    return (
        <Card className='m-1' style={{ width: '320px'}}>
            <Card.Body>
                <Card.Title>Paseo #{walk.id}</Card.Title>
                <Card.Text>
                    <strong>Inicio: </strong>{moment(walk.beginning).format("dddd, MMMM D YYYY, h:mm a")}
                </Card.Text>
                <Card.Text>
                    <strong>Final: </strong>{moment(walk.end).format("dddd, MMMM D YYYY, h:mm a")}
                </Card.Text>
                <Card.Text>
                    <p className='w-100 text-center font-weight-bold'>Mascotas</p>
                    {
                        walk.pet?.map(pet => (
                            <div className='my-2'>
                                <div className='d-flex'>
                                    <Image width={60} height={60} roundedCircle src={pet.photo ? pet.photo : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80'} />
                                    <p><strong>{pet.name}</strong> (Tamaño: {pet.size})</p>
                                </div>
                            </div>
                        ))
                    }
                </Card.Text>
                { userInfo?.user.id === walker.id && userInfo?.user.role !== "Dueño" && acceptedWalkHandler && <Button className='w-50' onClick={() => acceptedWalkHandler(walk.id)}>Aceptar</Button>}
                { userInfo?.user.id === walker.id && userInfo?.user.role !== "Dueño" && deleteWalkHandler && <Button className='w-50' variant='danger' onClick={() => deleteWalkHandler(walk.id)}>Rechazar</Button>}
                { userInfo?.user?.id === walker.id && userInfo?.user.role !== "Dueño" && finishWalkHandler && <Button className='w-100' onClick={() => finishWalkHandler(walk.id)}>Teminar paseo</Button>}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Solicitado el {moment(walk.end).format("dddd, MMMM D, YYYY, h:mm a")} por @{walk.owner.user.username}</small>
            </Card.Footer>
        </Card>
    );
}
