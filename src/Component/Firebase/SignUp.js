import React from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useTailwind from '../TailwindCss/useTailwind';
import useAuth from '../Hook/useAuth';
const SignUp = () => {
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
                userName(name);
                reset();
                navigate(url, { replace: true });
                makeUser(name, email);
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
                <input className={input} {...register("name", { required: true })} placeholder="Enter your name" />
                <input className={input} type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                <input className={input} type="password" {...register("password", { required: true })} placeholder="Give a password" />
                <div className=" flex justify-center mt-5">
                    <input className={button} type="submit" value="Log In" />
                </div>
                <p className="text-xl text-center mt-5">Or</p>
                <div className="flex justify-center">
                    <img onClick={googleLogIn} className="w-16 border rounded" src="https://i.ibb.co/5xqcLt2/download.png" alt="" />
                </div>
                <p className="text-center mt-3">New to here? <Link to="/log-in">log in</Link></p>
            </form>
        </div>
    );
};

export default SignUp;