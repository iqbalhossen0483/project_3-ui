import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const UserInfo = () => {
    const { user, isAdmin, lognOut, setHideUserInfo } = useAuth();
    return (
        <div className="absolute top-full right-4 shadow-md pt-5 px-3 text-center z-20 bg-white">
            <div>
                <p className="text-xl font-semibold">{user?.displayName?.toUpperCase()}</p>
                <p>{user.email}</p>
                {isAdmin && <p className="font-semibold">Adminstator</p>}
            </div>
            <hr className="mt-3" />
            <div className="mt-4 mb-2 text-white flex justify-evenly">
                {
                    isAdmin && <NavLink
                        onClick={() => { setHideUserInfo(false) }}
                        className="button" to='/desboard/add-product'>
                        Desboard
                    </NavLink>
                }
                {
                    !isAdmin && <NavLink
                        onClick={() => { setHideUserInfo(false) }}
                        className="button" to="/my-account/my-order">
                        Your-Profile
                    </NavLink>
                }
                <button onClick={lognOut} className="button">
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    );
};

export default UserInfo;