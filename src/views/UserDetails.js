import React, { useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { PetCard } from '../components/PetCard';
import { deletePet } from '../redux/actions/petActions';

import { userDetails } from '../redux/actions/userActions';
import { PET_DELETE_RESET } from '../redux/constants/petConstants';

export const UserDetails = ({ history, match}) => {
    const dispatch = useDispatch();

    const userId = match.params.id;

    const userDetailsState = useSelector(state => state.userDetails);
    const { loading, userDetails: userDetailsInfo } = userDetailsState;

    const petDeleteState = useSelector(state => state.petDelete);
    const { success: successDeleted } = petDeleteState;

    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;
    
    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (successDeleted) {
                dispatch({type: PET_DELETE_RESET });
            }

            dispatch(userDetails(userId));
        }
    }, [dispatch, userInfo, userId, history, successDeleted]);

    const petDeleteHandler = (petId) => {
        dispatch(deletePet(petId));
        alert('La mascota fue borrada con exito de tu perfil');
    }
    
    return (
        <Container>
            <h3 className='text-center'>Detalles de usuario</h3>
            { loading ? <Loader /> : (
                userDetailsInfo && (
                        <>
                            <Row>
                                <Col>
                                    <Image width={200} height={200} roundedCircle src={userDetailsInfo.owner?.photo ? userDetailsInfo.owner?.photo : 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'}  alt={userDetailsInfo.owner?.username}/>
                                </Col>
                                <Col>
                                    <strong>Nombre de usuario:</strong><span> {userDetailsInfo.owner.username}</span> <br/>
                                    <strong>email:</strong> <span> {userDetailsInfo.owner.email}</span> <br />
                                    <strong>Teléfono:</strong> <span> {userDetailsInfo.owner.phone_number}</span> <br />
                                </Col>
                                <Col>
                                    { userInfo?.user.id === userDetailsInfo?.owner.id && userInfo?.user.role !== 'Paseador' && <Link to={`/`} className='btn btn-primary d-block mb-4'>Editar perfil</Link>}
                                    { userInfo?.user.id === userDetailsInfo?.owner.id && userInfo?.user.role !== 'Paseador' && <Link to={`/addpet/user/${userDetailsInfo.owner.id}`} className='btn btn-primary d-block mb-4'>Agregar mascota</Link>}
                                    { userInfo?.user.id === userDetailsInfo?.owner.id && userInfo?.user.role !== 'Paseador' && <Link to={`/${userDetailsInfo.owner.id}`} className='btn btn-primary d-block mb-4'>Ver paseos</Link>}
                                </Col>
                            </Row>
                            <h3 className='text-center'>Mascotas</h3>
                            <Row>
                                { userDetailsInfo?.pets.length > 0 
                                    && userDetailsInfo.pets.map(pet => (
                                        <Col md={4}>
                                            <PetCard pet={pet} userLogged={userInfo?.user} userOwnerId={userDetailsInfo?.owner.id} petDeleteHandler={petDeleteHandler} />
                                        </Col>
                                    ))
                                    
                                }
                            </Row>
                            { userDetailsInfo.pets?.length === 0 && <Message variant='info'>No tienes mascotas registradas</Message>}
                        </>
                )
            )}
        </Container>
    );
}
