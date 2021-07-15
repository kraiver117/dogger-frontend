import React from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

export const WalkCard = ({walk, walker, userInfo, acceptedWalkHandler, finishWalkHandler, deleteWalkHandler}) => {
    return (
        <Card className='m-1' style={{ width: '320px', justifySelf: 'left'}}>
            <Card.Body>
                <Card.Title>Paseo</Card.Title>
                <Card.Text>
                    <strong>Inicio: </strong>{moment(walk.beginning).format("dddd, MMMM D YYYY, h:mm a")}
                </Card.Text>
                <Card.Text>
                    <strong>Final: </strong>{moment(walk.end).format("dddd, MMMM D YYYY, h:mm a")}
                </Card.Text>
                { userInfo?.user.id === walker.id && userInfo?.user.role !== "Dueño" && acceptedWalkHandler && <Button className='w-50' onClick={() => acceptedWalkHandler(walk.id)}>Aceptar</Button>}
                { userInfo?.user.id === walker.id && userInfo?.user.role !== "Dueño" && deleteWalkHandler && <Button className='w-50' variant='danger' onClick={() => deleteWalkHandler(walk.id)}>Rechazar</Button>}
                { userInfo?.user?.id === walker.id && userInfo?.user.role !== "Dueño" && finishWalkHandler && <Button className='w-100' onClick={() => finishWalkHandler(walk.id)}>Teminar paseo</Button>}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Solicitado el {moment(walk.end).format("dddd, MMMM D, YYYY, h:mm a")}</small>
            </Card.Footer>
        </Card>
    );
}
