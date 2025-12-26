import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='bg-base-200 min-h-screen bg-[#E9E9E9]'>
            <header className='mx-auto pb-4 '>
                <Navbar></Navbar>
            </header>

            <main className='w-11/12 mx-auto py-5'>
                <Outlet></Outlet>
            </main>

        </div>
    );
};

export default AuthLayout;