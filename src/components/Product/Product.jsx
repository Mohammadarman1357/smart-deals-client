import React from 'react';
import { Link } from 'react-router';

const Product = ({ product }) => {
    const { _id, title, price_min, price_max, image } = product;
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="p-4">
                <img
                    src={image}
                    alt={title}
                    className="rounded-xl w-[100%] h-70"
                     />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-medium">{title}</h2>
                <p className='text-xl font-semibold text-primary'>Price: ${price_min}-{price_max}</p>
                <div className="card-actions">
                    <Link to={`/productDetails/${_id}`} className="btn btn-primary w-full font-semibold">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;