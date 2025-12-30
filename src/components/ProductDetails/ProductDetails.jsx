import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([]);
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data);
                setBids(data);
            })
    }, [productId])

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

    return (
        <div>
            {/* product info */}
            <div>
                <div>

                </div>
                <div>
                    <button
                        onClick={handleBidModalOpen}
                        className="btn btn-primary">
                        I want to buy this product
                    </button>

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

                                            <form method='dialog'>
                                                <button className="btn btn-outline border-[#632ee3] text-[#632ee3]">Close</button>
                                            </form>

                                            <button className="btn btn-primary" type='submit'>Submit Bid</button>
                                        </div>
                                    </div>

                                </fieldset>
                            </form>


                        </div>
                    </dialog>
                </div>
            </div>
            {/* bids for this product*/}
            <div>
                <h3 className="text-4xl font-bold"> Bids For This Products:
                    <span className='text-primary'> {bids.length}</span>
                </h3>

                <div className="overflow-x-auto">
                    <table className="table p-5">
                        {/* head */}
                        <thead className='bg-base-200'>
                            <tr>
                                <th>SL No.</th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white'>
                            {/* row 1 */}
                            {
                                bids.map((bid, index) =>
                                    <tr>
                                        <th>
                                            {index + 1}
                                        </th>
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
                                                    <div className="text-sm opacity-50">United States</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {bid.buyer_email}
                                        </td>
                                        <td>{bid.bid_price}</td>
                                        <th>
                                            <button className="btn btn-ghost btn-xs">details</button>
                                        </th>
                                    </tr>)
                            }
                            {/* row 2 */}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

