import React from 'react';
import { useNavigate } from 'react-router';

const Menus = () => {
    const navigate = useNavigate();
    return (
        <div className="py-5 px-4 text-xl leading-10 border-r h-full">
            <h2 className="text-2xl border-b-2 pb-1">Popular Categories</h2>
            <p onClick={() => { navigate(`/shop/Road-Bike`) }} className="hover:text-green-500 hover:underline">
                <i className="fas fa-bicycle"></i> Road Bike
            </p>
            <p onClick={() => { navigate(`/shop/Mountain-Bike`) }} className="hover:text-green-500 hover:underline">
                <i className="fas fa-biking"></i> Mountain Bike
            </p>
            <p onClick={() => { navigate(`/shop/Touring-Bike`) }} className="hover:text-green-500 hover:underline">
                <i className="fas fa-biking"></i> Touring Bike
            </p>
            <p onClick={() => { navigate(`/shop/Foldering-bike`) }} className="hover:text-green-500 hover:underline">
                <i className="fas fa-biking"></i> Folding Bike
            </p>
        </div>
    );
};

export default Menus;