import React from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../../Hook/useFirebase';

const Profile = () => {
    const { user } = useFirebase();

    return (
        <div className="mb-5 md:mb-0 relative">
            <h2 className="text-2xl font-semibold text-center my-7">
                Welcome! {user?.displayName}
            </h2>
            {user?.email &&
                <div className="bg-white rounded mx-5 py-5 relative z-0">
                    <div className="text-center md:absolute top-2 right-2 z-0">
                        <Link to="/my-account/update-profile" className="button">
                            Update your profile
                        </Link>
                    </div>
                    <p className="text-xl ml-3 lg:ml-0 lg:text-center">
                        {user?.email}
                    </p>
                    <p>{user.displayName}</p>
                </div>
            }
        </div>
    );
};

export default Profile;