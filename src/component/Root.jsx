import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

const Root = () => {
    return (
        <div >
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;