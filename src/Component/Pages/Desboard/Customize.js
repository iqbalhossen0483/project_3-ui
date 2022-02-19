import React from 'react';
import AddOffer from './customize/AddOffer';
import Category from './customize/Category';
import SliderCustomize from './customize/SliderCustomize';

const Customize = () => {
    
    return (
        <div
            className='bg-white m-5 p-5 rounded-md md:grid grid-cols-3 gap-5 h-full'>
            <Category />
            <SliderCustomize />
            <AddOffer />
        </div>
    );
};

export default Customize;