import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useFirebase from '../../Hook/useFirebase';
import Footer from '../../ShareComponent/Footer/Footer';

const Desboard = () => {
    const [dsMenu, setDsMenu] = useState(true);
    const { isAdmin } = useFirebase();

    const handleDsMenu = () => {
        if (dsMenu) {
            setDsMenu(false);
        } else {
            setDsMenu(true);
        }
    }
    useEffect(() => {
        if (window.innerWidth < 480) {
            setDsMenu(false);
        } else {
            setDsMenu(true);
        }
    }, []);

    return (
        <div className="md:grid grid-cols-6 gap-2">
            <i
                onClick={handleDsMenu}
                className={`${dsMenu && "hidden"} togglebar fas fa-caret-square-right`}>
            </i>
            <div
                className={`${!dsMenu && "close"} menubar`}>
                <i
                    onClick={handleDsMenu}
                    className={`${!dsMenu && "hidden"} closebtn fas fa-times`}>
                </i>
                
                <div
                    className='flex flex-col pt-10 px-5'>
                    <NavLink
                        className="link gradient-text"
                        to='add-product'>
                        Add-Product
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='add-news'>
                        Add-News
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='customize'>
                        Customization
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='manage-order'>
                        Manage-Order
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='manage-product'>
                        Manage-Product
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='make-admin'>
                        Make-Admin
                    </NavLink>
                </div>
            </div>
            <div className="outlet">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Desboard;