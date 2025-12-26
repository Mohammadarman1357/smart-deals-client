import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
    const { createUser, setUser, updateUser, signInWithGoogle } = use(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photourl.value;
        const email = form.email.value;
        const password = form.password.value;


        const length6Pattern = /^.{6,}$/;
        const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;

        if (!length6Pattern.test(password)) {
            // console.log('password did not match');
            setError('Password must be 6 character or longer');
            return;
        }
        else if (!casePattern.test(password)) {
            setError('Password must have at least one uppercase and one lower case character')
            return;
        }

        setError('');

        // console.log(name, photo);

        createUser(email, password)
            .then((result) => {
                const user = result.user;

                // update user profile
                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });
                        navigate('/');
                    })
                    .catch(error => {
                        console.log(error);
                        setUser(user);
                    });
            })
            .catch(error => {
                const errorCode = error.code;
                console.log(errorCode);
                alert(errorCode);
            });


    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();

        signInWithGoogle()
            .then(result => {
                const user = result.user;

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    image: result.user.photoURL
                }

                //create database in the database
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('data after user save', data)
                    })

                // console.log(user)
                // console.log(user.photoURL)
                setUser(user);
                navigate(`${location.state ? location.state : '/'}`);

            })
            .catch(error => {
                console.log(error.Message);
            })
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <title>Register</title>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className='font-semibold text-2xl text-center pt-5'>Register your account</h2>

                <div className="card-body">
                    <form onSubmit={handleRegister}>
                        <fieldset className="fieldset">

                            {/* name  */}
                            <label className="label">Name</label>
                            <input type="text" name='name' className="input" placeholder="Name" required />


                            {/* photo url  */}
                            <label className="label">Photo URL</label>
                            <input type="text" name='photourl' className="input" placeholder="Photo URL" required />

                            {/* email  */}
                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" required />

                            {/* password  */}
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required />

                            {
                                error && <p className='text-secondary'>{error}</p>
                            }
                            <button type='submit' className="btn btn-primary mt-4">Register</button>

                            <p className='text-center mt-2 hidden md:flex justify-center'><span className='text-base-300 '>__________________________</span> OR <span className='text-base-300'>__________________________</span></p>



                        </fieldset>
                    </form>

                    {/* Google Sign up*/}
                    <button onClick={handleGoogleSignIn} className="btn btn-outline hover:text-secondary mt-2">
                        <FcGoogle size={24}></FcGoogle> Sign Up With Google
                    </button>

                    <p className='font-semibold text-center pt-5'>Already Have An Account ? <Link to={"/auth/login"} className='text-[#632ee3]'>Login</Link> </p>

                </div>
            </div>
        </div>
    );
};

export default Register;