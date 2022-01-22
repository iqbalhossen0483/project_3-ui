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
            <div className='header-container header-bg'>
                <i onClick={handleMenu} className="fas fa-bars"></i>
                <div className='flex items-center'>
                    {
                        user.email && <div className="text-xl mx-2">
                            <i
                                onMouseEnter={() => { setShowCart(true) }}
                                className="fas fa-shopping-cart">
                            </i>
                            <span className="text-purple-900 font-semibold ml-1">
                                {addedProduct?.length}
                            </span>
                        </div>
                    }
                    {
                        user.email &&
                        <img onClick={toggleShow} 
                        className="w-10 h-10 rounded-full ml-2" 
                            src={user.photoURL ?
                                user.photoURL :
                                user.imgUrl ?
                                    user.imgUrl :
                                    "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"} alt="" 
                        />
                    }
                </div>
            </div>
            <div className={`${!menu && "hidden"} header-menu header-bg`}>
                <div className="menu-wrapper">
                    <NavLink
                        className="link gradient-text"
                        to='/'>
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
                <div className="menu-wrapper flex-wrap">
                    <NavLink 
                        className="link gradient-text" 
                        to='/my-account/profile'>
                        My-Account
                    </NavLink>
                    <div className='hidden md:flex items-center'>
                        {
                            user.email && <div className="text-xl mx-2">
                                <i
                                    onMouseEnter={() => { setShowCart(true) }}
                                    className="fas fa-shopping-cart">
                                </i>
                                <span className="text-purple-900 font-semibold ml-1">
                                    {addedProduct?.length}
                                </span>
                            </div>
                        }
                        {
                            user.email && 
                            <img 
                                onClick={toggleShow} 
                                className="w-10 h-10 rounded-full ml-2" 
                                src={user.photoURL ?
                                    user.photoURL :
                                    user.imgUrl ?
                                    user.imgUrl :
                                    "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"} alt=""
                             />
                        }
                        
                    </div>
                    {!user?.email && <>
                        <NavLink
                            className="link gradient-text"
                            to='/log-in'>
                            Log-In
                        </NavLink>
                        <NavLink
                            className="link gradient-text"
                            to='/sign-up'>
                            Sign-Up
                        </NavLink>
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