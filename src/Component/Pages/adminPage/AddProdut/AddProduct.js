import React from 'react';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'
import useFunc from '../../../Hook/useFunc';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const { userToken } = useFunc();

    const onSubmit = product => {
        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": userToken()
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert.show("A product was successfully added");
                    reset();
                }
            })
    }
    return (
        <div className="mx-3 md:mx-0">
            <form className="container lg:w-11/12 lg:grid grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="header col-span-2">Add a product</h3>
                <div>
                    <input
                        className="input w-full"
                        {...register("img", { required: true })} placeholder="Enter a img url"
                    />
                    <input
                        className="input w-full"
                        {...register("name", { required: true })} placeholder="Enter the name"
                    />
                    <input
                        className="input w-full"
                        {...register("category", { required: true })} placeholder="Enter the category"
                    />
                    <input
                        className="input w-full"
                        {...register("price", { required: true })} placeholder="Enter the price"
                    />
                    <input
                        className="input w-full"
                        {...register("stock", { required: true })} placeholder="Enter the stock"
                    />
                    <input
                        className="input w-full"
                        {...register("vendor", { required: true })} placeholder="Enter the vendor name"
                    />
                    <input
                        className="input w-full"
                        {...register("type", { required: true })} placeholder="Enter the type of cycle"
                    />
                </div>
                <textarea
                    className="input"
                    rows={10}
                    {...register("description", { required: true })} placeholder="Enter short description"
                />
                <div className='col-span-2 flex justify-center'>
                    <input className="button w-52" type="submit" />
                </div>
            </form>
        </div>
    );
};

export default AddProduct;