import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import Footer from '../Footer';
import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';
// import useAxios from '../../hooks/useAxios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CreateAProduct = () => {
    // const { user } = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate();

    const handleCreateProduct = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value;
        const price_min = e.target.min_price.value;
        const price_max = e.target.max_price.value;
        const condition = e.target.condition.value;
        const usage = e.target.usage.value;
        const image = e.target.productImageURL.value;
        const seller_name = e.target.sellername.value;
        const email = e.target.email.value;
        const seller_contact = e.target.contact.value;
        const seller_image = e.target.sellerImageURL.value;
        const location = e.target.location.value;
        const description = e.target.description.value;

        console.log(title, category, price_min, price_max, condition, usage, image, seller_name, email, seller_contact, seller_image, location, description);

        const newProduct = { title, category, price_min, price_max, condition, usage, image, seller_name, email, seller_contact, seller_image, location, description };

        axiosSecure.post('/products', newProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your product has been created.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });

        // axiosInstance.post('/products', newProduct)
        // .then(data => {
        //     console.log(data.data);
        //     if (data.data.insertedId) {
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             title: "Your product has been created.",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //     }
        // });

        e.target.reset();

    }


    //     axios.post('http://localhost:3000/products', newProduct)
    //         .then(data => {
    //             console.log(data.data)
    //             if (data.data.insertedId) {
    //                 Swal.fire({
    //                     position: "center",
    //                     icon: "success",
    //                     title: "Your product has been created.",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })

    return (
        <div>
            <button
                onClick={() => navigate(-1)}
                className='flex items-center font-medium mx-auto mt-5' >
                <IoArrowBack size={18}></IoArrowBack> Back to Products
            </button>
            <h3 className='text-4xl font-bold text-center mt-5'>Create  <span className='text-primary'>A Product</span></h3>

            <div className='bg-white m-5 md:my-10 md:mx-50 p-5 md:p-10 rounded-xl shadow-md'>
                <form onSubmit={handleCreateProduct}>
                    <fieldset className="fieldset">

                        {/* row 1 */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1 flex flex-col'>
                                {/* title */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Title</label>
                                <input type="text" className="input w-full" name='title' placeholder='e.g. Yamaha Fz Guitar for Sale' />
                            </div>
                            <div className='flex-1 flex flex-col '>
                                {/* category */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Category</label>
                                <input type="text" name='category' className="input w-full" placeholder='Category' />
                            </div>
                        </div>
                        {/* row 2 */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className="flex-1 flex flex-col">
                                {/* Min Price You want to Sale ($) */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Min Price You want to Sale</label>
                                <input type="text" className="input w-full" name='min_price' placeholder='e.g. 26' />
                            </div>
                            <div className="flex-1 flex flex-col">
                                {/* Max Price You want to Sale ($) */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Max Price You want to Sale</label>
                                <input type="text" className="input w-full" name='max_price' placeholder='Optional (default = Min Price)' />
                            </div>
                        </div>
                        {/* row 3 */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className="flex-1 flex flex-col">
                                {/* Product Condition */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Product Condition</label>
                                <input type="text" className="input w-full" name='condition' placeholder='e.g. Used' />
                            </div>
                            <div className="flex-1 flex flex-col">
                                {/* Product Usage time */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Product Usage time</label>
                                <input type="text" className="input w-full" name='usage' placeholder='e.g. 1 year 3 month' />
                            </div>
                        </div>
                        {/* row 4 */}
                        {/* Your Product Image URL */}
                        <label className="label mb-2 font-medium text-[#001931] text-[14px]">Your Product Image URL</label>
                        <input type="text" className="input w-full" name='productImageURL' placeholder="https://..." />
                        {/* row 5 */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className="flex-1 flex flex-col">
                                {/* Seller Name */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Seller Name</label>
                                <input type="text" className="input w-full" name='sellername' placeholder='Seller Name' />
                            </div>
                            <div className="flex-1 flex flex-col">
                                {/* Seller Email */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Seller Email</label>
                                <input type="email" className="input w-full" name='email' placeholder='example@gmail.com' />
                            </div>
                        </div>
                        {/* row 6 */}
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className="flex-1 flex flex-col">
                                {/* Seller Contact */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Seller Contact</label>
                                <input type="text" className="input w-full" name='contact' placeholder='e.g. +1-555-1234' />
                            </div>
                            <div className="flex-1 flex flex-col">
                                {/* Seller Image URL */}
                                <label className="label mb-2 font-medium text-[#001931] text-[14px]">Seller Image URL</label>
                                <input type="text" className="input w-full" name='sellerImageURL' placeholder='https://...' />
                            </div>
                        </div>
                        {/* row 7*/}
                        <label className="label mb-2 font-medium text-[#001931] text-[14px]">Location</label>
                        <input type="text" className="input w-full" name='location' placeholder="City, Country" />

                        {/* row 8 */}
                        <label className="label mb- font-medium text-[#001931] text-[14px]">Simple Description about your Product</label>
                        <input type="text" className="input w-full" name='description' placeholder="Simple Description about your Product" />

                        <button className="btn btn-primary mt-4" type='submit'>Create A Product</button>

                    </fieldset>
                </form>
            </div>

            <footer>
                <Footer></Footer>
            </footer>

        </div >
    );
};

export default CreateAProduct;
