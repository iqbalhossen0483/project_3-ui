import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../../Hook/useFirebase';

const Profile = () => {
    const [showEdit, setShowEdit] = useState(false);
    const { user } = useFirebase();

    return (
        <div className="mb-5 md:mb-0">
            <div className='relative'>
                {
                user.email &&
                    <img 
                        onMouseEnter={() => setShowEdit(true)}
                        onMouseOut={()=>setShowEdit(false)}
                        className="profile-img avater" 
                        src={user.photoURL ?
                            user.photoURL :
                            user.imgUrl ?
                                user.imgUrl :
                                "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"
                            }
                        alt="" 
                    />
                
                }
                <i class={`fas fa-edit profile-edit ${showEdit && "show"}`}></i>
            </div>

            {user?.email &&
                <div className="profile-container relative">
                    {/* edit button */}
                    <div className="text-center absolute top-5 right-2 z-0">
                        <Link to="/my-account/update-profile" className="button">
                            <i class="fas fa-edit"></i>
                        </Link>
                    </div>

                    <span className='font-semibold'>Name: </span>
                    <p className='item'>
                        {user?.displayName}
                    </p>

                    <span className='font-semibold'>Email: </span>
                    <p className='item'>
                        {user?.email}
                    </p>

                    <span className='font-semibold'>Phone Number: </span>
                    <p className='item'>
                        {user?.phone}
                    </p>

                    <span className='font-semibold'>District: </span>
                    <p className='item'>
                        {user?.district}
                    </p>

                    <span className='font-semibold'>Police Station: </span>
                    <p className='item'>
                        {user?.policeStation}
                    </p>

                    <span className='font-semibold col-span-3 lg:col-span-1'>Rode No. / Village: </span>
                    <p className='item'>
                        {user?.rodeOrVillage}
                    </p>
                </div>
            }
        </div>
    );
};

export default Profile;