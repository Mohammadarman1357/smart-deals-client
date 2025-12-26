import React from 'react';
import bgImg from '../assets/bg-hero-left.png';
import { FaSearch } from 'react-icons/fa';

const Banner = () => {
    return (
        <div>

            <div className='relative bg-gradient-to-tr from-[#ffe6fd] to-[#e0f8f5] flex-1 text-center p-5 md:px-[80px] md:py-[70px]'>

                <div className='absolute top-0 left-0  md:w-full w-1/2 h-1/2 md:h-full bg-no-repeat bg-cover' style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "250px 400px" }}></div>
                <div className='absolute top-0 right-0  md:w-full w-1/2 h-1/2 md:h-full bg-no-repeat bg-cover' style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "250px 400px", transform: "scaleX(-1)" }}></div>

                <div className='p-2 md:p-10'>
                    <h1 className='text-7xl font-bold'>Deal your <span className='text-primary'>Products </span>
                        <br /> in a <span className='text-primary'>Smart</span> way !</h1>

                    <h6 className='text-xl text-[#627382] mt-2'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</h6>

                    <div className="join mt-5">
                        <div>
                            <label className="input validator border-none join-item rounded-l-full shadow-md w-50 md:w-100">
                                <input type="text" placeholder="Search For Products, Categoriees..." required />
                            </label>
                        </div>
                        <button className="btn btn-primary join-item rounded-r-full shadow-md"><FaSearch></FaSearch> </button>
                    </div>

                    <div className='mt-5 space-x-4 '>
                        <button className='btn btn-primary'>Watch All Products</button>
                        <button className='btn border-primary text-[#632EE3] mt-4 md:mt-0'>Post an Product</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;