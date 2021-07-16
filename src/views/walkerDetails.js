import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { WalkCard } from '../components/WalkCard';
import { deleteWalk, getWalksByWalker, updateWalk } from '../redux/actions/walkActions';
import { WALK_DELETE_RESET, WALK_UPDATE_RESET } from '../redux/constants/walkConstants';

export const WalkerDetails = ({ history, match}) => {
    const walkerId = match.params.id;

    const dispatch = useDispatch();

    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;

    const updateWalkState = useSelector(state => state.updateWalk);
    const { success: updateWalkSuccess } = updateWalkState;

    const deleteWalkState = useSelector(state => state.deleteWalk);
    const { success: deleteWalkSuccess } = deleteWalkState;

    const getWalksByWalkerState = useSelector(state => state.getWalksByWalker);
    const { walker, walks, loading } = getWalksByWalkerState;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {

            if (updateWalkSuccess) {
                dispatch({ type: WALK_UPDATE_RESET });
            }

            if (deleteWalkSuccess) {
                dispatch({ type: WALK_DELETE_RESET });
            }

            dispatch(getWalksByWalker(walkerId));

        }
    }, [history, dispatch, userInfo, walkerId, updateWalkSuccess, deleteWalkSuccess]);
    
    const acceptedWalkHandler = (walkId) => {
        dispatch(updateWalk(walkId, { is_accepted: true }));
    }

    const finishWalkHandler = (walkId) => {
        dispatch(updateWalk(walkId, { is_finished: true }));
    }

    const deleteWalkHandler = (walkId) => {
        dispatch(deleteWalk(walkId));
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
                                    <strong>Teléfono:</strong> <span> {walker.phone_number ? walker.phone_number : 'N/A'}</span> <br />
                                </Col>
                                <Col>
                                    {userInfo?.user.role === 'Dueño' && <Link to={`/addwalk/walker/${walker.id}`} className='btn btn-primary d-block mb-4'>Solicitar Paseo</Link>}
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
