import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import '../styles/components/formContainer.scss';

export const FormContainer = ({ children }) => {
    return (
        <Container className='form'>
            <Row className='justify-content-md-center align-items-md-center'>
                <Col xs={12} md={6}>
                    { children }
                </Col>
            </Row>
        </Container>
    );
}
