import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';
import UserInfo from './UserInfo';

const Header = () => {
    const { link } = useTailwind();
    const { user, hideUserInfo, setHideUserInfo } = useAuth();
    const style = "md:flex justify-between bg-green-400 py-4 px-8 relative";
    const toggleShow = () => {
        if (hideUserInfo) {
            setHideUserInfo(false)
        }
        else {
            setHideUserInfo(true)
        }
    }
    return (
        <div className={style}>
            <div className="flex items-center">
                <NavLink className={link} to='/home'>Home</NavLink>
                <NavLink className={link} to='/shop'>Shop</NavLink>
                <NavLink className={link} to='/news'>News</NavLink>
            </div>
            <div className="flex items-center">
                <NavLink className={link} to='/my-account'>My-Account</NavLink>
                {
                    user.email && user.photoURL && <img onClick={toggleShow} className="w-12 h-12 rounded-full ml-2" src={user.photoURL} alt="" />
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
        </div>
    );
};

export default Header;