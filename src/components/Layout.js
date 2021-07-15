import React from 'react';
import { NavbarComponent as Navbar } from '../components/Navbar';

export const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            { children }
        </>
    )
}
