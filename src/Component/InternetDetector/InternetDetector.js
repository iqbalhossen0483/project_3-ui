import React from 'react';
import img from "../../images/download.png"

const InternetDetector = () => {
    return (
        <div className='flex justify-center'>
            <div>
                <img src={img} alt="" />
                <p className='text-xl my-3'>No internet</p>
                <p>Try: </p>
                <p className='ml-5'>Checking the network cables, modem, and router</p>
                <p className='ml-5'>Reconnecting to Wi-Fi</p>
                <p className='mt-4'>ERR_INTERNET_DISCONNECTED</p>
            </div>
        </div>
    )
};

export default InternetDetector;