import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../ShareComponent/Footer/Footer';
import useTailwind from '../TailwindCss/useTailwind';

const MyAccount = () => {
    const { link } = useTailwind();
    return (
        <div className="md:grid grid-cols-6">
            <div style={{ width: "14.3rem" }}
                className="flex flex-col bg-green-500 pt-10 fixed h-full">
                <NavLink className={link} to='profile'>My-Profile</NavLink>
                <NavLink className={link} to='my-order'>My-Order</NavLink>
                <NavLink className={link} to='view-cart'>View-Cart</NavLink>
                <NavLink className={link} to='my-review'>View-Review</NavLink>
                <NavLink className={link} to='payment'>Payment-Method</NavLink>
            </div>
            <p></p>
            <div className="col-span-5 h-screen flex flex-col justify-between">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default MyAccount;