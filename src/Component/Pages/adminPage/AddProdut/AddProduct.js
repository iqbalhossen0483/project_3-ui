import React from 'react';
import { useForm } from "react-hook-form";
import useTailwind from "../../../TailwindCss/useTailwind";
import { useAlert } from 'react-alert'

const AddProduct = () => {
    const { formHeader, singleDiv, input } = useTailwind();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();

    const onSubmit = product => {
        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "POST",
            headers: {
                "content-type": "application/json"
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
            <form className={singleDiv} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={formHeader}>Add a product</h3>
                <input className={input} {...register("img", { required: true })} placeholder="Enter a img url" />
                <input className={input} {...register("name", { required: true })} placeholder="Enter the name" />
                <input className={input} {...register("category", { required: true })} placeholder="Enter the category" />
                <input className={input} {...register("price", { required: true })} placeholder="Enter the price" />
                <input className={input} {...register("stock", { required: true })} placeholder="Enter the stock" />
                <input className={input} {...register("vendor", { required: true })} placeholder="Enter the vendor name" />
                <input className={input} {...register("type", { required: true })} placeholder="Enter the type of cycle" />
                <textarea className={input} {...register("description", { required: true })} placeholder="Enter short description" />
                <input className="button" type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;