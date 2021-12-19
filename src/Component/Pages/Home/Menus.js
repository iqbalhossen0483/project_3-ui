import React from 'react';
import { useNavigate } from 'react-router';

const Menus = () => {
    const navigate = useNavigate();

    const menus = [
        { name: "Road Bike", icon: <i className="fas fa-bicycle"></i> },
        { name: "Mountain Bike", icon: <i className="fas fa-biking"></i> },
        { name: "Touring Bike", icon: <i className="fas fa-biking"></i> },
        { name: "Foldering bike", icon: <i className="fas fa-biking"></i> }
    ];

    return (
        <div className="py-5 px-4 text-xl leading-10 border-r h-full">
            <h2 className="text-2xl border-b-2 pb-1">Popular Categories</h2>
            {
                menus.map(menu => <div
                    onClick={() => { navigate(`/shop/${menu.name.replace(" ", "-")}`) }}
                    className="hover:text-green-500 hover:underline cursor-pointer">
                    <span className='mr-3'>{menu.icon}</span>
                    <span>{menu.name}</span>
                </div>)
            }
        </div>
    );
};

export default Menus;