import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import useTailwind from '../../TailwindCss/useTailwind';

const Desboard = () => {
    const { link } = useTailwind();
    const { isAdmin } = useAuth();
    return (
        <div className="md:grid grid-cols-6 ">
            <div className="flex flex-col bg-green-500 pt-5 pb-96">
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
            <div className="col-span-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Desboard;