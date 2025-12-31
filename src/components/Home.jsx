import React, { Suspense } from 'react';
import Banner from './Banner';
import Loading from '../pages/Loading';
import LatestProducts from './LatestProducts/LatestProducts';
import Footer from './Footer';

const latestProductsPromise = fetch('http://localhost:3000/latest-products').then(res => res.json());

const Home = () => {
    
    return (
        <div>
            <title>Home</title>
            <Banner></Banner>

            <Suspense fallback={<Loading></Loading>}>
                <LatestProducts latestProductsPromise={latestProductsPromise}></LatestProducts>
            </Suspense>

            <footer className='mt-6'>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default Home;