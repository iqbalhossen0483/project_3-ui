import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';
import CartProduct from './CartProduct';
import UserInfo from './UserInfo';

const Header = () => {
    const [menu, setMenu] = useState(true);
    const { link } = useTailwind();
    const { user, hideUserInfo, setHideUserInfo, addedProduct, showCart, setShowCart } = useAuth();
    const style = `${!menu && "hidden"} md:flex justify-between bg-green-400 py-3 px-8 relative sticky top-14 md:top-0 z-10`;
    const toggleShow = () => {
        if (hideUserInfo) {
            setHideUserInfo(false)
        }
        else {
            setHideUserInfo(true)
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
            <div className='md:hidden sticky top-0 z-10 flex items-center justify-between py-2 px-6 text-2xl bg-green-500'>
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
            <div className={style}>
                <div className="flex flex-col md:flex-row items-center">
                    <NavLink className={link} to='/home'>Home</NavLink>
                    <NavLink className={link} to='/shop'>Shop</NavLink>
                    <NavLink className={link} to='/news'>News</NavLink>
                </div>
                <div className="flex flex-col md:flex-row items-center flex-wrap">
                    <NavLink className={link} to='/my-account/profile'>My-Account</NavLink>
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
                        <NavLink className={link} to='/log-in'>Log-In</NavLink>
                        <NavLink className={link} to='/sign-up'>Sign-Up</NavLink>
                    </>}
                </div>
                {/* user info  */}
                {hideUserInfo && <UserInfo />}
                {showCart && addedProduct.length > 0 && <CartProduct />}
            </div>
        </>
    );
};

export default Header;