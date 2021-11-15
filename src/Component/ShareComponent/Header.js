import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const Header = () => {
    const { link } = useTailwind();
    const { user, lognOut } = useAuth();
    const style = "flex justify-between bg-green-400 py-4 px-8";
    return (
        <div className={style}>
            <div className="flex items-center">
                <NavLink className={link} to='/home'>Home</NavLink>
                <NavLink className={link} to='/shop'>Shop</NavLink>
                <NavLink className={link} to='/news'>News</NavLink>
            </div>
            <div className="flex items-center">
                <NavLink className={link} to='/desboard'>Desboard</NavLink>
                {
                    user.email && user.photoURL && <img className="w-12 h-12 rounded-full ml-2" src={user.photoURL} alt="" />
                }
                {
                    user.email && !user.photoURL && <i className="fas fa-user text-2xl ml-2"></i>
                }
                {
                    !user?.email ? <>
                        <NavLink className={link} to='/log-in'>Log-In</NavLink>
                        <NavLink className={link} to='/sign-up'>Sign-Up</NavLink>
                    </> :
                        <button onClick={lognOut} className={link}>Log-Out</button>
                }
            </div>
        </div>
    );
};

export default Header;