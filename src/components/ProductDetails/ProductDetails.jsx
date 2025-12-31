import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { IoArrowBack } from 'react-icons/io5';
import Footer from '../Footer';

const ProductDetails = () => {
    const product = useLoaderData();
    const { _id: productId } = product;
    const [bids, setBids] = useState([]);
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data);
                setBids(data);
            })
    }, [productId, user])

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal();
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;

        console.log(productId, name, email, bid);
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,
            bid_price: bid,
            status: 'pending'
        }

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModalRef.current.close();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your bid has been placed.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // add the new bid to the state
                    newBid._id = data.insertedId;
                    const newBids = [...bids, newBid];
                    newBids.sort((a, b) => b.bid_price - a.bid_price);
                    setBids(newBids);
                }
            })

    }

    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:3000/bids?email=${user.email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //                 setBids(data);
    //             })
    //     }
    // }, [user.email]);

    const handleDeleteBid = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:3000/bids/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            // remaining bids
                            const remainingBids = bids.filter(bid => bid._id !== _id);
                            setBids(remainingBids);

                        }
                    })
            }
        });
    }

    return (
        <div>
            {/* product info */}
            <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-10'>
                <div className='rounded-2xl col-span-1'>
                    {/*left side */}
                    <div className='mb-7'>
                        <img src={product.image} className='w-full rounded-[8px]' alt="product image" />
                    </div>
                    <div className='rounded-[8px] p-6 space-y-6 bg-white'>
                        <h3 className='font-medium text-2xl'>Product Description</h3>

                        <div className='flex justify-between font-semibold'>
                            <span><span className='text-primary'>Condition :</span>  {product.condition}</span>
                            <span><span className='text-primary'>Usage Time :</span>  {product.usage}</span>
                        </div>
                        <hr className='border-[#001931]' />
                        <p className='text-[#969A9D] font-medium'>
                            {product.description}
                        </p>
                    </div>
                </div>
                <div className='col-span-2 space-y-6'>
                    {/*right side */}
                    <button
                        onClick={() => navigate(-1)}
                        className='flex items-center font-medium' >
                        <IoArrowBack size={18}></IoArrowBack> Back to Products
                    </button>
                    <h1 className='font-bold text-4xl'>{product.title}</h1>
                    <div className="badge badge-soft bg-base-300 badge-primary rounded-full">{product.category}</div>
                    <div className='bg-white rounded-[8px] p-5'>
                        <h1 className='text-[#4CAF50] font-bold text-2xl'>{product.price_min} - {product.price_max}</h1>
                        <p>Price starts from</p>
                    </div>
                    <div className='bg-white rounded-[8px] p-5'>
                        <h1 className='font-bold text-2xl mb-2'>Product Details</h1>
                        <h4><span className='font-semibold mr-2'>Product ID:</span> {product._id}</h4>
                        <h4><span className='font-semibold mr-2'>Posted:</span> {product.created_at}</h4>
                    </div>
                    <div className='bg-white rounded-[8px] p-5'>
                        <h1 className='font-bold text-2xl mb-2'>Seller Information</h1>
                        <div className='flex items-center gap-4 mb-2'>
                            <img src={product.seller_image} className='rounded-full w-[60px] h-[60px]' alt="seller" />
                            <span className='flex flex-col'>
                                <h3 className='font-semibold'>{product.seller_name}</h3>
                                <p className='text-[#001931]'>{product.email}</p>
                            </span>
                        </div>
                        <h4><span className='font-semibold mr-2'>Location:</span> {product.location}</h4>
                        <h4><span className='font-semibold mr-2'>Contact:</span> {product.seller_contact}</h4>
                        <h4><span className='font-semibold mr-2'>Status:</span>
                            <span className='badge badge-warning rounded-full mr-2'>{product.status}</span>
                        </h4>
                    </div>

                    <button
                        onClick={handleBidModalOpen}
                        className="btn btn-primary w-full">
                        I want to buy this product
                    </button>

                </div>

                {/* modal */}
                <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-2xl mb-3">Give Seller Your Offered Price!</h3>

                        <form onSubmit={handleBidSubmit}>
                            <fieldset className="fieldset">

                                <div className='flex gap-4'>
                                    <div>
                                        {/* name */}
                                        <label className="label mb-2 font-medium text-[#001931] text-[14px]">Buyer Name</label>
                                        <input type="text" className="input" name='name' defaultValue={user?.displayName} />
                                    </div>
                                    <div>
                                        {/* email */}
                                        <label className="label mb-2 font-medium text-[#001931] text-[14px]">Buyer Email</label>
                                        <input type="email" name='email' className="input" defaultValue={user?.email} />
                                    </div>
                                </div>

                                {/*bid amount */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Your Bid</label>
                                <input type="text" className="input w-full" name='bid' placeholder="Your Bid" />

                                <div className="modal-action">
                                    {/* if there is a button in form, it will close the modal */}
                                    <div className='flex gap-4'>

                                        <button
                                            className="btn btn-outline border-[#632ee3] text-[#632ee3]"
                                            type='button'
                                            onClick={() => bidModalRef.current.close()}>
                                            Close
                                        </button>

                                        <button className="btn btn-primary" type='submit'>Submit Bid</button>
                                    </div>
                                </div>

                            </fieldset>
                        </form>


                    </div>
                </dialog>

            </div>
            {/* bids for this product*/}
            <div className='p-5'>
                <h3 className="text-4xl font-bold ml-6" > Bids For This Products :
                    <span className='text-primary'> {bids.length}</span>
                </h3>

                <div className="overflow-x-auto">
                    <table className="table p-5">
                        {/* head */}
                        <thead className='bg-[#E9E9E9]'>
                            <tr>
                                <th>SL No.</th>
                                <th>Product</th>
                                <th>Seller</th>
                                <th>Bid Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {
                                bids.map((bid, index) =>
                                    <tr key={bid._id}>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className='flex items-center gap-4 mb-2'>
                                                <img src={product.image} className='rounded-[8px] w-[60px] h-[50px]' alt="seller" />
                                                <span className='flex flex-col'>
                                                    <h3 className='font-semibold'>{product.title}</h3>
                                                    <p className='text-[#001931]'>{product.price_min}</p>
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={user?.photoURL}
                                                            alt="User Image" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{bid.buyer_name}</div>
                                                    <div className="text-sm opacity-50">{product.location}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{bid.bid_price}</td>
                                        <td>
                                            {bid.status === 'pending' ?
                                                <div className="badge badge-warning rounded-full">{bid.status}
                                                </div> :
                                                <div className="badge badge-success rounded-full">{bid.status}</div>
                                            }
                                        </td>
                                        <th>
                                            <button
                                                onClick={() => handleDeleteBid(bid._id)}
                                                className="btn btn-outline border-red-500 text-red-500 btn-xs">Remove Bid</button>
                                        </th>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

            </div>

            <footer className='mt-6'>
                <Footer></Footer>
            </footer>

        </div>
    );
};

export default ProductDetails;

