import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Choices = () => {
    return (
        <Container style={{ marginTop: '120px'}}>
            <Row>
                <Col>
                    <h3 className='text-center'>Dueños</h3>
                    <Image className='w-100' src="https://i.picsum.photos/id/1062/5092/3395.jpg?hmac=o9m7qeU51uOLfXvepXcTrk2ZPiSBJEkiiOp-Qvxja-k" alt=""/>
                    <Link className='btn btn-primary w-100 mt-2' to='owners'>Ver</Link>
                </Col>
                <Col>
                    <h3 className='text-center'>Paseadores</h3>
                    <Image className='w-100' src="https://i.picsum.photos/id/338/2000/1333.jpg?hmac=-sTSfHkgHcFg1Jdut1v8HTVl9S1cyeMQ0OY_8dj30fY" alt="" />
                    <Link className='btn btn-primary w-100 mt-2' to='walkers'>Ver</Link>
                </Col>
            </Row>
        </Container>
    )
}
