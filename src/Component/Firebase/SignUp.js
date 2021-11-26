import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useTailwind from '../TailwindCss/useTailwind';
import useAuth from '../Hook/useAuth';
const SignUp = () => {
    const [error, setError] = useState("");
    const [disable, setdisable] = useState(true);
    const { register, handleSubmit, reset } = useForm();
    const { logInWithGoogle, singUPWithEmail, userName, makeUser } = useAuth();
    const { form, input, button } = useTailwind();
    const location = useLocation();
    const navigate = useNavigate();
    const url = location.state?.from.pathname || "/home";
    const onSubmit = user => {
        const { name, email, password } = user;
        singUPWithEmail(email, password)
            .then(result => {
                setError("");
                userName(name);
                reset();
                navigate(url, { replace: true });
                makeUser(name, email);
            })
            .catch(err => setError(err.message))
    };

    //google 
    const googleLogIn = () => {
        setdisable(false);
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
                setError(err.message)
                setdisable(true);
            })
    }
    return (
        <div className="m-3 md:m-3">
            <form className={form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-2xl text-center mb-3 font-semibold">Please Sing Up</h3>
                <input className={input} {...register("name", { required: true })} placeholder="Enter your name" />
                <input className={input} type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                <input className={input} type="password" {...register("password", { required: true })} placeholder="Give a password" />
                <p className="text-red-400">{error}</p>
                <div className=" flex justify-center mt-5">
                    <input className={button} type="submit" value="Sign Up" />
                </div>
                <p className="text-xl text-center mt-5">Or</p>
                <div className="flex justify-center">
                    <button disabled={!disable} onClick={googleLogIn}>
                        <img className="w-16 border rounded" src="https://i.ibb.co/BTPQhFg/download.png" alt="" />
                    </button>
                </div>
                <p className="text-center mt-3">Already have a account? <Link to="/log-in">log in</Link></p>
            </form>
        </div>
    );
};

export default SignUp;