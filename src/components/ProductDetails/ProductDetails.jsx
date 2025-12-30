import React, { use, useRef } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';

const ProductDetails = () => {
    const { _id: productId } = useLoaderData();
    console.log(productId)
    const bidModalRef = useRef(null);
    const { user } = use(AuthContext);

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
                if(data.insertedId){
                    bidModalRef.current.close();
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
                                            <input type="text" className="input" name='name' defaultValue={user.displayName} />
                                        </div>
                                        <div>
                                            {/* email */}
                                            <label className="label mb-2 font-medium text-[#001931] text-[14px]">Buyer Email</label>
                                            <input type="email" name='email' className="input" defaultValue={user.email} />
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

        </div>
    );
};

export default ProductDetails;