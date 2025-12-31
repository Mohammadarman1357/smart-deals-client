import React from 'react';
import Footer from './Footer';
import { useLoaderData } from 'react-router';
import Product from './Product/Product';

const AllProducts = () => {
    const products = useLoaderData();
    console.log(products);
    return (
        <div>
            <h3 className='text-4xl font-bold text-center mt-5'>All <span className='text-primary'>Product</span></h3>

            <div className='grid p-4 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product =>
                        <Product
                            key={product._id}
                            product={product}>
                        </Product>
                    )
                }
            </div>

            <footer className='mt-6'>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default AllProducts;