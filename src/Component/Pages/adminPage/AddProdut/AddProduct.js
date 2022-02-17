import React from 'react';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'
import useFunc from '../../../Hook/useFunc';

const AddProduct = () => {
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const { userToken } = useFunc();

    const onSubmit = product => {
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("category", product.category);
        formData.append("price", product.price);
        formData.append("stock", product.stock);
        formData.append("vendor", product.vendor);
        formData.append("type", product.type);
        formData.append("description", product.description);
        formData.append("img", product.img[0]);

        const gallery = Array.from(product.gallery);
        gallery.map(img => {
            formData.append("gallery", img);
        });

        if (!product.img.length) {
            return alert.show("Product image is required");
        };
        if (gallery.length > 3) {
            return alert.show("Gallery image should be less than 4");
        };

        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "POST",
            headers: {
                "authorization": userToken()
            },
            body: formData
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
                    <label className='text-xl my-2 block'>
                        Main image: 
                        <input
                        className='text-sm ml-2'
                            {...register("img")}
                            type="file"
                        />
                    </label>
                    <label className='text-xl my-2 block'>
                        Gallery images: 
                        <input
                        className='text-sm ml-2'
                            {...register("gallery")}
                            multiple
                            type="file"
                        />
                    </label>
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