import React from 'react';

const Menus = () => {
    return (
        <div className="py-5 px-4 text-xl leading-10 border-r h-full">
            <h2 className="text-2xl border-b-2 pb-1">Popular Categories</h2>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-bicycle"></i> Road Bike</p>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-biking"></i> Mountain Bike</p>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-biking"></i> Touring Bike</p>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-biking"></i> Folding Bike</p>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-biking"></i> Fixed Gear/ Track Bike</p>
            <p className="hover:text-green-500 hover:underline"> <i className="fas fa-biking"></i> BMX</p>
        </div>
    );
};

export default Menus;