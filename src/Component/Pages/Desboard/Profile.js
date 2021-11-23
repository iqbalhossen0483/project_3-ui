import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useTailwind from '../../TailwindCss/useTailwind';

const Profile = () => {
    const { user } = useAuth();
    const [customer, setCustomer] = useState({});
    const { button } = useTailwind();
    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setCustomer(data))
    }, [user.email]);
    return (
        <div className="mb-5 md:mb-0">
            <h2 className="text-2xl font-semibold text-center my-7">Welcome! {user.displayName}</h2>
            <div className="bg-white rounded mx-5 py-3 relative z-0">
                <div className="text-center md:absolute top-2 right-2 z-0">
                    <button className={button}>Update your profile</button>
                </div>
                <p className="text-xl text-center">{customer.email}</p>
            </div>
        </div>
    );
};

export default Profile;