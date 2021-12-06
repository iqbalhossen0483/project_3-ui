import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';
import CartProduct from './CartProduct';
import UserInfo from './UserInfo';

const Header = () => {
    const { link } = useTailwind();
    const { user, hideUserInfo, setHideUserInfo, addedProduct, showCart, setShowCart } = useAuth();
    const style = "md:flex justify-between bg-green-400 py-3 px-8 relative sticky top-0 z-10";
    const toggleShow = () => {
        if (hideUserInfo) {
            setHideUserInfo(false)
        }
        else {
            setHideUserInfo(true)
        }
    };
    return (
        <div className={style}>
            <div className="flex items-center">
                <NavLink className={link} to='/home'>Home</NavLink>
                <NavLink className={link} to='/shop'>Shop</NavLink>
                <NavLink className={link} to='/news'>News</NavLink>
            </div>
            <div className="flex items-center flex-wrap">
                <NavLink className={link} to='/my-account/profile'>My-Account</NavLink>
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
                {!user?.email && <>
                    <NavLink className={link} to='/log-in'>Log-In</NavLink>
                    <NavLink className={link} to='/sign-up'>Sign-Up</NavLink>
                </>}
            </div>
            {/* user info  */}
            {hideUserInfo && <UserInfo />}
            {showCart && addedProduct.length > 0 && <CartProduct />}
        </div>
    );
};

export default Header;