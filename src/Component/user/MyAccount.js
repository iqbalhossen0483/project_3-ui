import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../ShareComponent/Footer/Footer';
import useTailwind from '../TailwindCss/useTailwind';

const MyAccount = () => {
    const [acMenu, setAcMenu] = useState(true);
    const { link } = useTailwind();

    const handleAcMenu = () => {
        if (acMenu) {
            setAcMenu(false)
        } else {
            setAcMenu(true);
        }
    }
    useEffect(() => {
        if (window.innerWidth < 480) {
            setAcMenu(false);
        } else {
            setAcMenu(true)
        }
    }, []);

    return (
        <>
            <i
                onClick={handleAcMenu}
                className={`${acMenu && "hidden"} md:hidden text-2xl text-green-500 fas fa-caret-square-right`}>
            </i>
            <div className="md:grid grid-cols-6">
                <div style={{ width: "14.3rem" }}
                    className={`${!acMenu && "hidden"} flex flex-col bg-green-500 pt-10 fixed h-full z-20`}>

                    <i
                        onClick={handleAcMenu}
                        className={`${!acMenu && "hidden"} text-2xl md:hidden fas fa-times absolute top-3 right-3`}>
                    </i>
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
        </>
    );
};

export default MyAccount;