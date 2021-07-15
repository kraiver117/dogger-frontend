import React, { useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../components/Loader';

import { usersList } from '../redux/actions/userActions';

export const ListUsers = ({ history }) => {
    const dispatch = useDispatch();

    const usersListState = useSelector(state => state.usersList);
    const { loading, users } = usersListState;

    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            dispatch(usersList());
        }
    }, [dispatch, userInfo, history])

    return (
        <Container>
            <h2 className='my-5 text-center'>Dueños</h2>
            <Row>
            { loading ? <Loader /> :
                users?.map(user => (
                    <Col className='my-3' md={4} key={user.id}>
                        <Card>
                            <Card.Img width={320} height={330} variant="top" src={user.photo ? user.photo : 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'} />
                            <Card.Body>
                                <Card.Title>{!user.last_name && !user.first_name ? user.username : user.firs_tname + user.last_name} ({user.is_owner && 'Dueño'}) </Card.Title>
                                <Card.Text>
                                    Email: {user.email}
                                </Card.Text>
                                <Card.Text>
                                    Teléfono: {user.phone_number}
                                </Card.Text>
                                <Link to={`/user/${user.id}/details`} className='btn btn-primary w-100' variant="primary">
                                    Ver detalles
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
            </Row>
        </Container>
    );
}
