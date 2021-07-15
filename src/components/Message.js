import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export const Message = ({ variant, textPosition, children, dismissible}) => {
    const [show, setShow] = useState(true);

    return (
        <Alert show={show} className={`text-${textPosition}`} onClose={() => setShow(false)} variant={variant} dismissible={dismissible}>
            { children }
        </Alert>
    );
}

Message.propTypes = {
    variant: PropTypes.string,
    children : PropTypes.node,
    dismissible: PropTypes.bool
}

Message.defaultProps = {
    textPosition: 'center',
    variant: 'info',
    dismissible: false
}
