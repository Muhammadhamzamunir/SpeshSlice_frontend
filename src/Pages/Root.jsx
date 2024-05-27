import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Header/Navbar/navbar';
import Footer from '../Components/Footer';

function Root() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root
