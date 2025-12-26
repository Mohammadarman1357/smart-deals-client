import { Link, useLocation, useNavigate } from 'react-router';
import { use, useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../Context/AuthContext';

const Login = () => {
    const [error, setError] = useState("");
    const { signIn, setUser, signInWithGoogle, forgetPassword } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                e.target.reset();
                navigate(`${location.state ? location.state : '/'}`)
            })
            .catch(error => {
                // console.log(error);
                // alert(error.Message);
                const errorCode = error.code;
                setError(errorCode);
            })

    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();

        signInWithGoogle()
            .then(result => {
                const user = result.user;
                // console.log(user)
                // console.log(user.photoURL)
                setUser(user);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch(error => {
                console.log(error.Message);
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        // console.log(email)

        forgetPassword(email)
            .then(() => {
                alert('Please Check your email')
            })
            .catch(error =>
                console.log(error)
            )
    }

    return (
        <div className='flex justify-center min-h-screen items-center'>
            <title>Login</title>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className='font-semibold text-2xl text-center pt-5'>Login</h2>

                <div className="card-body">

                    <form onSubmit={handleLogin}>
                        <fieldset className="fieldset">
                            {/* email  */}
                            <label className="label">Email</label>
                            <input type="email" ref={emailRef} name='email' className="input" placeholder="Email" required />

                            {/* password */}
                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" required />

                            <div onClick={handleForgetPassword}><a className="link link-hover">Forgot password?</a></div>

                            {error && <p className='text-secondary'>{error}</p>}

                            {/* Email login */}

                            <button type='submit' className="btn btn-neutral mt-4">Login</button>

                            <p className='text-center mt-2'>__________________________Or__________________________</p>
                        </fieldset>
                    </form>

                    {/* Google Login*/}
                    <button onClick={handleGoogleSignIn} className="btn btn-outline hover:text-secondary mt-2">
                        <FcGoogle size={24}></FcGoogle> Login with Google
                    </button>

                    <p className='font-semibold text-center pt-3'>Dont't Have An Account ? <Link to={"/auth/register"} className='text-primary'>Register</Link> </p>

                </div>
            </div>
        </div>
    );
};

export default Login;