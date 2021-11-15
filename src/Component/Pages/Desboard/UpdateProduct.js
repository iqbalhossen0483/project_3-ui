import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useTailwind from '../../TailwindCss/useTailwind';

const UpdateProduct = ({ hideForm, product, setProduct }) => {
    const { id } = useParams();
    const { button, formHeader, form, input } = useTailwind();
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);

    const onSubmit = newProduct => {
        newProduct.id = product._id;
        newProduct.img = newProduct.img || product.img;
        newProduct.name = newProduct.name || product.name;
        newProduct.price = newProduct.price || product.price;
        newProduct.stock = newProduct.stock || product.stock;
        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("This Product was updated");
                    reset();
                    hideForm(false);
                }
            })
    }
    return (
        <div onClick={() => hideForm(false)} className="absolute top-0 left-0 w-full h-full background">
            <div className="h-screen w-full flex justify-center items-center ">
                <form onClick={e => e.stopPropagation()} className={form} onSubmit={handleSubmit(onSubmit)}>
                    <h3 className={formHeader}>Update Product</h3>
                    <input className={input} {...register("img")} placeholder="Enter a img url" />
                    <input className={input} {...register("name")} placeholder="Enter the name" />
                    <input type="number" className={input} {...register("price")} placeholder="Enter price" />
                    <input type="number" className={input} {...register("stock")} placeholder="Enter stock" />
                    <input className={button} type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;