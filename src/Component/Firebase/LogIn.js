import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import Footer from '../ShareComponent/Footer/Footer';
import useTailwind from '../TailwindCss/useTailwind';

const LogIn = () => {
    const [error, setError] = useState("");
    const [disable, setdisable] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const { logInWithGoogle, logInWithEmail, makeUser } = useAuth();
    const { singleDiv, input } = useTailwind();
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.state?.from.pathname || "/home";
    const onSubmit = user => {
        const { email, password } = user;
        logInWithEmail(email, password)
            .then(result => {
                setError("");
                reset();
                navigate(url, { replace: true });
            })
            .catch(err => setError(err.message))
    };

    //google
    const googleLogIn = () => {
        setdisable(false)
        logInWithGoogle()
            .then(result => {
                setError("");
                navigate(url, { replace: true });
                const user = result.user;
                const { displayName, email } = user;
                makeUser(displayName, email);
                setdisable(true);
            })
            .catch(err => {
                setError(err.message);
                setdisable(true);
            })
    }
    return (
        <>
            <div className="m-3 md:m-3">
                <form className={singleDiv + " my-20"} onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-2xl text-center mb-3 font-semibold">Please Log In</h3>
                    <p className="text-xl">
                        Your email: <input className={input} type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                    </p>
                    <p className="text-xl">
                        Password: <input className={input + " ml-2"} type="password" {...register("password", { required: true })} placeholder="Enter the password" />
                    </p>
                    <p className="text-red-400">{error}</p>
                    <div className=" flex justify-center mt-5">
                        <input className="button" type="submit" value="Log In" />
                    </div>
                    <p className="text-xl text-center mt-5">Or</p>
                    <div className="flex justify-center">
                        <button disabled={!disable} onClick={googleLogIn}>
                            <img className="w-16 border rounded" src="https://i.ibb.co/BTPQhFg/download.png" alt="" />
                        </button>
                    </div>
                    <p className="text-center mt-3">New to here? <Link to="/sign-up">sign up</Link></p>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default LogIn;