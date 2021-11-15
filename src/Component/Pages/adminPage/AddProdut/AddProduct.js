import React from 'react';
import { useForm } from "react-hook-form";
import useTailwind from "../../../TailwindCss/useTailwind";
const AddProduct = () => {
    const { button, formHeader, form, input } = useTailwind();
    const { register, handleSubmit, reset } = useForm();
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
                    alert("A product was successfully added");
                    reset();
                }
            })
    }
    return (
        <div>
            <form className={form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={formHeader}>Add a product</h3>
                <input className={input} {...register("img", { required: true })} placeholder="Enter a img url" />
                <input className={input} {...register("name", { required: true })} placeholder="Enter the name" />
                <input className={input} {...register("description", { required: true })} placeholder="Enter short description" />
                <input className={button} type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;