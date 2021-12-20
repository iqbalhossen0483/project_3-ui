import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../ShareComponent/Footer/Footer';

const MyAccount = () => {
    const [acMenu, setAcMenu] = useState(true);

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
                className={`${acMenu && "hidden"} togglebar fas fa-caret-square-right`}>
            </i>
            <div className="md:grid grid-cols-6">
                <div style={{ width: "14.3rem" }}
                    className={`${!acMenu && "hidden"} menubar`}>

                    <i
                        onClick={handleAcMenu}
                        className={`${!acMenu && "hidden"} closebtn fas fa-times`}>
                    </i>
                    <NavLink className="link" to='profile'>My-Profile</NavLink>
                    <NavLink className="link" to='my-order'>My-Order</NavLink>
                    <NavLink className="link" to='view-cart'>View-Cart</NavLink>
                    <NavLink className="link" to='my-review'>View-Review</NavLink>
                    <NavLink className="link" to='payment'>Payment-Method</NavLink>
                </div>
                <p></p>
                <div className="outlet">
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default MyAccount;