import React from 'react';
import { useNavigate } from 'react-router';
import notFoundImg from '../assets/App-Error.png';

const AppNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className='text-center inter-font col-span-4 p-10'>

            <span className='flex justify-center'><img src={notFoundImg} alt="" /></span>
            <h1 className='font-semibold text-5xl text-[#001931] mt-4'>OPPS!! APP NOT FOUND</h1>
            <p className='text-xl text-[#627382] mt-2'>The App you are requesting is not found on our system.  please try another apps</p>

            <button onClick={() => navigate(-1)} className='btn border-none mt-4 bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-white font-semibold text-[16px]'>
                Go Back
            </button>
        </div>
    );
};

export default AppNotFound;