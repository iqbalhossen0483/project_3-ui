import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useFirebase from '../Hook/useFirebase';
import useFunc from '../Hook/useFunc';
import CartProduct from './CartProduct';
import UserInfo from './UserInfo';

const Header = () => {
    const [menu, setMenu] = useState(true);
    const { user, hideUserInfo, setHideUserInfo, showCart, setShowCart } = useFirebase();
    const { addedProduct } = useFunc();

    const toggleShow = () => {
        if (hideUserInfo) {
            setHideUserInfo(false);
        }
        else {
            setHideUserInfo(true);
        }
    };
    const handleMenu = () => {
        if (menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }
    useEffect(() => {
        if (window.innerWidth < 480) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }, [])
    return (
        <>
            <div className='md:hidden sticky top-0 z-10 flex items-center justify-between py-2 px-6 text-2xl header-bg'>
                <i onClick={handleMenu} className="fas fa-bars"></i>
                <div className='flex items-center'>
                    {
                        user.email && <div className="text-xl mx-2">
                            <i
                                onMouseEnter={() => { setShowCart(true) }}
                                className="fas fa-shopping-cart">
                            </i>
                            <span
                                className="text-purple-900 font-semibold ml-1">{addedProduct?.length}
                            </span>
                        </div>
                    }
                    {
                        user.email && user.photoURL && <img onClick={toggleShow} className="w-10 h-10 rounded-full ml-2" src={user.photoURL} alt="" />
                    }
                    {
                        user.email && !user.photoURL && <i onClick={toggleShow} className="fas fa-user text-2xl ml-2"></i>
                    }
                </div>
            </div>
            <div className={`${!menu && "hidden"} header-menu header-bg`}>
                <div className="flex flex-col md:flex-row items-center font-semibold">
                    <NavLink
                        className="link gradient-text"
                        to='/home'>
                        Home
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='/shop'>
                        Shop
                    </NavLink>
                    <NavLink
                        className="link gradient-text"
                        to='/news'>
                        News
                    </NavLink>
                </div>
                <div className="flex flex-col md:flex-row items-center flex-wrap font-semibold">
                    <NavLink className="link gradient-text" to='/my-account/profile'>My-Account</NavLink>
                    <div className='hidden md:flex items-center'>
                        {
                            user.email && <div className="text-xl mx-2">
                                <i
                                    onMouseEnter={() => { setShowCart(true) }}
                                    className="fas fa-shopping-cart">
                                </i>
                                <span
                                    className="text-purple-900 font-semibold ml-1">{addedProduct?.length}
                                </span>
                            </div>
                        }
                        {
                            user.email && user.photoURL && <img onClick={toggleShow} className="w-10 h-10 rounded-full ml-2" src={user.photoURL} alt="" />
                        }
                        {
                            user.email && !user.photoURL && <i onClick={toggleShow} className="fas fa-user text-2xl ml-2"></i>
                        }
                    </div>
                    {!user?.email && <>
                        <NavLink className="link gradient-text" to='/log-in'>Log-In</NavLink>
                        <NavLink className="link gradient-text" to='/sign-up'>Sign-Up</NavLink>
                    </>}
                </div>
                {/* user info  */}
                {hideUserInfo && <UserInfo />}
                {showCart && addedProduct?.length > 0 && <CartProduct />}
            </div>
        </>
    );
};

export default Header;