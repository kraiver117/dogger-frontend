import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loader } from '../components/Loader';
import { doggerAPI } from '../redux/api/doggerAPI';

export const ListWalkers = ({ history }) => {
    const dispatch = useDispatch();

    const [walkers, setWalkers] = useState([]);
    const [loading, setLoading] = useState(false);

    const userLogged = useSelector(state => state.authUser);
    const { userInfo } = userLogged;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            setLoading(true);
            doggerAPI.get('/walkers')
                .then((response) => {
                    setWalkers(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                })
        }
    }, [dispatch, userInfo, history])

    return (
        <Container>
            <h2 className='my-5 text-center'>Paseadores</h2>
            <Row>
            { loading ? <Loader /> :
                walkers?.map(user => (
                    <Col className='my-3' md={4} key={user.id}>
                        <Card>
                            <Card.Img width={320} height={330} variant="top" src={user.photo ? user.photo : 'https://www.clipartkey.com/mpngs/m/146-1461473_default-profile-picture-transparent.png'} />
                            <Card.Body>
                                <Card.Title>{!user.last_name && !user.first_name ? user.username : user.firs_tname + user.last_name} ({user.is_walker && 'Paseador'}) </Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Teléfono:</strong> {user.phone_number}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Paseos activos:</strong> {user.current_walks}
                                </Card.Text>
                                <Link to={`/walker/${user.id}/details`} className='btn btn-primary w-100' variant="primary">
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
