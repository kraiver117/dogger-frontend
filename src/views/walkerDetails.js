import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { doggerAPI } from '../redux/api/doggerAPI';
import { WalkCard } from '../components/WalkCard';

export const WalkerDetails = ({ history, match}) => {
    const walkerId = match.params.id;

    const [walker, setWalker] = useState({});
    const [walks, setWalks] = useState([]);
    const [loading, setLoding] = useState(false);


    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            setLoding(true);

            doggerAPI.get(`walks/walker/${walkerId}`)
                .then((response) => {
                    setWalker(response.data.data.walker);
                    setWalks(response.data.data.walks);
                    setLoding(false);
                })
        }
    }, [ userInfo, walkerId, history]);
    
    const acceptedWalkHandler = (walkId) => {
        doggerAPI.put(`walks/${walkId}`, { is_accepted: true })
            .then((response) => {
                alert('Paseo aceptado')
            })
    }

    const finishWalkHandler = (walkId) => {
        doggerAPI.put(`walks/${walkId}`, { is_finished: true })
        .then((response) => {
            alert('Paseo Terminado')
        })
    }

    const deleteWalkHandler = (walkId) => {
        doggerAPI.delete(`walks/${walkId}`)
        .then((response) => {
            alert('Paseo borrado');
        })
    }
    
    return (
        <Container>
            <h3 className='text-center'>Detalles de Paseador</h3>
            { loading ? <Loader /> : (
                walker && (
                        <>
                            <Row>
                                <Col>
                                    <Image width={200} height={200} roundedCircle src={walker?.photo ? walker?.photo : 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}  alt={walker?.username}/>
                                </Col>
                                <Col>
                                    <strong>Nombre de usuario:</strong><span> {walker.username}</span> <br/>
                                    <strong>email:</strong> <span> {walker.email}</span> <br />
                                    <strong>Teléfono:</strong> <span> {walker.phone_number}</span> <br />
                                </Col>
                                <Col>
                                    {userInfo?.user.role === 'Dueño' && <Link to={`/addwalk/walker/${walker.id}`} className='btn btn-primary d-block mb-4'>Solicitar Paseo</Link>}
                                    { userInfo?.user.id === walker.user_id && <Link to={`/`} className='btn btn-primary d-block mb-4'>Editar perfil</Link>}
                                </Col>
                            </Row>
                            <h3 className='text-center'>Solicitudes de paseo</h3>
                            <Row className='justify-content-center'>
                                {walks.filter(walk => !walk.is_accepted && !walk.is_finished).map(walk => (
                                    <WalkCard 
                                        walk={walk} 
                                        userInfo={userInfo} 
                                        walker={walker} 
                                        acceptedWalkHandler={acceptedWalkHandler} 
                                        deleteWalkHandler={deleteWalkHandler} 
                                    />
                                ))}
                            </Row>
                            { walks.filter(walk => !walk.is_accepted && !walk.is_finished).length === 0 && <Message variant='info'>No tienes solicitudes</Message>} <br />
                            <h3 className='text-center'>Paseos activos</h3>
                            <Row className='justify-content-center'>
                                { walks.filter(walk => walk.is_accepted && !walk.is_finished).map(walk => (
                                    <WalkCard 
                                        key={walk.id}
                                        walk={walk} 
                                        userInfo={userInfo} 
                                        walker={walker} 
                                        finishWalkHandler={finishWalkHandler}
                                    />
                                ))}
                            </Row>
                            { walks.filter(walk => walk.is_accepted && !walk.is_finished).length === 0 && <Message variant='info'>No tienes Paseos Activos</Message>} <br />
                            <h3 className='text-center'>Paseos finalizados</h3>
                            <Row className='justify-content-center'>
                                { walks.filter(walk => walk.is_finished === true).map(walk => (
                                        <WalkCard 
                                            key={walk.id}
                                            walk={walk} 
                                            userInfo={userInfo} 
                                            walker={walker} 
                                        />
                                    ))
                                }
                            </Row>
                            { walks.filter(walk => walk.is_finished && walk.is_accepted).length === 0 && <Message variant='info'>No tienes Paseos Finalizados</Message> }
                        </>
                )
            )}
        </Container>
    );
}
