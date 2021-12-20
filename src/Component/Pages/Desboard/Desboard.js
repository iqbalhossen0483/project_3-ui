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
        <div className="md:grid grid-cols-6">
            <i
                onClick={handleDsMenu}
                className={`${dsMenu && "hidden"} togglebar fas fa-caret-square-right`}>
            </i>
            <div style={{ width: "14.1rem" }}
                className={`${!dsMenu && "hidden"} menubar`}>
                <i
                    onClick={handleDsMenu}
                    className={`${!dsMenu && "hidden"} closebtn fas fa-times`}>
                </i>
                {
                    isAdmin && <>
                        <NavLink className="link" to='add-product'>Add-Product</NavLink>
                        <NavLink className="link" to='add-news'>Add-News</NavLink>
                        <NavLink className="link" to='customize'>Customization</NavLink>
                        <NavLink className="link" to='manage-order'>Manage-Order</NavLink>
                        <NavLink className="link" to='manage-product'>Manage-Product</NavLink>
                        <NavLink className="link" to='make-admin'>Make-Admin</NavLink>
                    </>
                }
            </div>
            <div></div>
            <div className="outlet">
                <Outlet />
                <Footer />
            </div>
        </div>
    );
};

export default Desboard;