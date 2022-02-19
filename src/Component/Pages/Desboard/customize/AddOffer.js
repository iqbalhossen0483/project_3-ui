import React, { useState } from 'react'

function AddOffer() {
    const [form, setShowForm] = useState(false);

    return (
        <div onClick={() => { setShowForm(false) }} className='border rounded-md px-5 pt-3 pb-10 text-center relative'>
            <p className='text-2xl font-semibold border-b pb-2'>
                Make The Offers
            </p>
            
        </div>
    );
}

export default AddOffer