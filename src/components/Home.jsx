import React, { Suspense } from 'react';
import Banner from './Banner';
import Loading from '../pages/Loading';
import LatestProducts from './LatestProducts/LatestProducts';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());

const Home = () => {
    return (
        <div className='max-w-7xl mx-auto bg-base-300'>
            <title>Home</title>
            <Banner></Banner>

            <Suspense fallback={<Loading></Loading>}>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>

        </div>
    );
};

export default Home;