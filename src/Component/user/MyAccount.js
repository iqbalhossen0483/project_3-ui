import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const MyAccount = () => {
    const { lognOut } = useAuth();
    const { link, button } = useTailwind();
    return (
        <div className="md:grid grid-cols-6">
            <div className="bg-white flex flex-col">
                <NavLink className={link} to='profile'>My-Profile</NavLink>
                <NavLink className={link} to='my-order'>My-Order</NavLink>
                <NavLink className={link} to='my-review'>My-Review</NavLink>
                <NavLink className={link} to='add-review'>Add-Review</NavLink>
                <NavLink className={link} to='payment'>Payment-Method</NavLink>
                <div className="px-2 my-3">
                    <button onClick={lognOut} className={button}>Log-Out</button>
                </div>
            </div>
            <div className="col-span-5">
                <Outlet />
            </div>
        </div>
    );
};

export default MyAccount;