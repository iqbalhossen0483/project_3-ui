import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useTailwind from '../../TailwindCss/useTailwind';

const Profile = () => {
    const { user } = useAuth();
    const [customer, setCustomer] = useState({});
    const { button } = useTailwind();
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => setCustomer(data))
    }, [user.email]);
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center my-7">Welcome! {user.displayName}</h2>
            <div className="bg-white rounded mx-5 py-3 relative">
                <div className="absolute top-2 right-2">
                    <button className={button}>Update your profile</button>
                </div>
                <p className="text-xl text-center">{customer.email}</p>
            </div>
        </div>
    );
};

export default Profile;