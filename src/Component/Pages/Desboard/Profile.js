import React from 'react';
import useFunc from '../../Hook/useFunc';

const Profile = () => {
    const { customer } = useFunc();
    return (
        <div className="mb-5 md:mb-0">
            <h2 className="text-2xl font-semibold text-center my-7">Welcome! {customer?.displayName}</h2>
            {customer?.email &&
                <div className="bg-white rounded mx-5 py-5 relative z-0">
                    <div className="text-center md:absolute top-2 right-2 z-0">
                        <button className="button">Update your profile</button>
                    </div>
                    <p className="text-xl ml-3 lg:ml-0 lg:text-center">{customer?.email}</p>
                </div>
            }
        </div>
    );
};

export default Profile;