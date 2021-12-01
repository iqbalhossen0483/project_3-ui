import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useTailwind from '../TailwindCss/useTailwind';

const MyAccount = () => {
    const { link } = useTailwind();
    return (
        <div className="md:grid grid-cols-6 h-screen overflow-hidden">
            <div className="flex flex-col bg-green-500 pt-10">
                <NavLink className={link} to='profile'>My-Profile</NavLink>
                <NavLink className={link} to='my-order'>My-Order</NavLink>
                <NavLink className={link} to='view-cart'>View-Cart</NavLink>
                <NavLink className={link} to='my-review'>View-Review</NavLink>
                <NavLink className={link} to='payment'>Payment-Method</NavLink>
            </div>
            <div className="col-span-5 overflow-auto scrollbar">
                <Outlet />
            </div>
        </div>
    );
};

export default MyAccount;