import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-base-300'>
            
            <Navbar></Navbar>
            <Outlet></Outlet>
            
            {/* <Footer></Footer> */}
        </div>
    );
};

export default RootLayout;