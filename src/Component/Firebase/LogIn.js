import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const LogIn = () => {
    const { register, handleSubmit, reset } = useForm();
    const { logInWithGoogle, logInWithEmail, makeUser } = useAuth();
    const { form, input, button } = useTailwind();
    const location = useLocation()
    const navigate = useNavigate();
    const url = location.state?.from.pathname || "/home";
    const onSubmit = user => {
        const { email, password } = user;
        logInWithEmail(email, password)
            .then(result => {
                reset();
                navigate(url, { replace: true });
            })
            .catch(err => console.log(err.message))
    };

    //google
    const googleLogIn = () => {
        logInWithGoogle()
            .then(result => {
                navigate(url, { replace: true });
                const user = result.user;
                const { displayName, email } = user;
                makeUser(displayName, email);
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <div>
            <form className={form} onSubmit={handleSubmit(onSubmit)}>
                <input className={input} type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                <input className={input} type="password" {...register("password", { required: true })} placeholder="Give the password" />
                <div className=" flex justify-center mt-5">
                    <input className={button} type="submit" value="Log In" />
                </div>
                <p className="text-xl text-center mt-5">Or</p>
                <div className="flex justify-center">
                    <img onClick={googleLogIn} className="w-16 border rounded" src="https://i.ibb.co/5xqcLt2/download.png" alt="" />
                </div>
                <p className="text-center mt-3">New to here? <Link to="/sign-up">sign up</Link></p>
            </form>
        </div>
    );
};

export default LogIn;