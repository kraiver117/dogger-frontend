import React from 'react';
import PropTypes from 'prop-types';
import { css } from "@emotion/react";
import { RingLoader } from 'react-spinners';

export const Loader = ({size, margin}) => {
    const override = css`
        display: block;
        margin: ${margin ? (margin+'px') : '100px'} auto;
    `;

    return (
        <RingLoader size={size ? size : 200} color='black' css={override} />
    );
}

Loader.propTypes = {
    size: PropTypes.number,
    margin: PropTypes.number
}
