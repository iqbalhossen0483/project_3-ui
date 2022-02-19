import React, { useState } from 'react'
import { useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import useFunc from '../../../Hook/useFunc';

function SliderCustomize() {
    const { register, handleSubmit, reset } = useForm();
    const [sliders, setSliders] = useState([]);
    const [form, setShowForm] = useState(false);
    const alart = useAlert();
    const { userToken } = useFunc();

    useEffect(() => {
        fetch("http://localhost:5000/sliders")
            .then(res => res.json())
            .then(data => setSliders(data))
    }, []);

    //post
    const onSubmit = slider => { 
        const formData = new FormData();
        formData.append("image", slider.image[0]);
        formData.append("url", slider.url);

        fetch("http://localhost:5000/sliders", {
            method: "POST",
            headers: {
              "authorization": userToken()  
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reset();
                    alart.show("slider image added successfully")
                    setShowForm(false);
                }
            })
    };

    const showForm = (e) => {
        e.stopPropagation();
        setShowForm(true);
    }
    return (
        <div style={{position: "relative"}}
            onClick={() => { setShowForm(false) }}
            className='border rounded-md pb-10 text-center h-96 overflow-auto'>
            <div
                className='bg-green-500 sticky top-0 rounded-t text-gray-200 flex justify-evenly'>
                <p className='text-2xl font-semibold border-b pb-2'>
                Make The Slider
                </p>
                <button
                    onClick={(e) => showForm(e)}
                    className="slider-add-btn">
                    Add+
                </button>
                <form
                    onClick={e => { e.stopPropagation() }}
                    className={`${form ? "block" : "hidden"}`}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='customize-form'>
                        <input
                            className='input border-0 w-full'
                            {...register("image", { required: true })}
                            type="file"
                        />
                        <span className='input-for-link'>
                            <input
                                className='input w-full'
                                {...register("url", { required: true })}
                                placeholder='Url'
                            />
                            <i className="fas mx-3 fa-link link-icon"></i>
                        </span>
                        <button type='submit'>Ok</button>
                    </div>
                </form>
            </div>

            {
                sliders.map(slide => <div
                    key={slide._id}
                    className="border-b pb-2">
                    <img src={slide.imgUrl} alt="" />
                    <p>{slide.url}</p>
                </div>)
            }
        </div>
    );
}

export default SliderCustomize