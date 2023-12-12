import React from 'react';
import Navbar from './navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

const Root = () => {
    return (
        <div className='bg-gradient-to-b from-[#e9edc9] to-[#e0ebc9]'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;