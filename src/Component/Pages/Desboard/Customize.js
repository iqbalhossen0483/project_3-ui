import SliderCustomize from './customize/sliderCustomize/SliderCustomize';
import AddOffer from './customize/offerCustomize/AddOffer';
import Category from './customize/categoryCutomize/Category';
import React from 'react';

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