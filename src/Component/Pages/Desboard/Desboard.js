import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Footer from '../../ShareComponent/Footer/Footer';
import useTailwind from '../../TailwindCss/useTailwind';

const Desboard = () => {
    const { link } = useTailwind();
    const { isAdmin } = useAuth();
    return (
        <div className="md:grid grid-cols-6">
            <div style={{ width: "14.1rem" }}
                className="flex flex-col bg-green-500 pt-5 h-full fixed">
                {
                    isAdmin && <>
                        <NavLink className={link} to='add-product'>Add-Product</NavLink>
                        <NavLink className={link} to='add-news'>Add-News</NavLink>
                        <NavLink className={link} to='manage-order'>Manage-Order</NavLink>
                        <NavLink className={link} to='manage-product'>Manage-Product</NavLink>
                        <NavLink className={link} to='make-admin'>Make-Admin</NavLink>
                    </>
                }
            </div>
            <p></p>
            <div className="col-span-5 h-screen flex flex-col justify-between">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Desboard;