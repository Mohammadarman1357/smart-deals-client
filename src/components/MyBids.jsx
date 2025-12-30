import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setBids(data);
                })
        }
    }, [user.email]);

    return (
        <div>
            <h3 className='text-4xl font-bold text-center mt-5'>My Bids : <span className='text-primary'>{bids.length}</span></h3>

            <div className="overflow-x-auto">
                <table className="table p-5">
                    {/* head */}
                    <thead className='bg-[#E9E9E9]'>
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
    );
};

export default MyBids;