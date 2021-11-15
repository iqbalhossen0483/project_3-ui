import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const Purchase = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { user } = useAuth();
    const { button, formHeader, form, input } = useTailwind();

    const name = user.displayName;
    const email = user.email;
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: name,
            email: email
        }
    });

    const onSubmit = order => {
        order.productId = product._id;
        order.img = product.img;
        order.date = new Date().toLocaleDateString("en-us");
        order.status = "pending";
        fetch("https://cycle-mart.herokuapp.com/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Your order created succesfully");
                    reset()
                }
            })
    }
    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id]);
    return (
        <div>
            <form className={form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={formHeader}>Place Order</h3>
                <input className={input} disabled {...register("name", { required: true })} placeholder="Enter name" />
                <input type="email" disabled className={input} {...register("email", { required: true })} placeholder="Enter email" />
                <input className={input} {...register("division", { required: true })} placeholder="Enter division" />
                <input className={input} {...register("district", { required: true })} placeholder="Enter district" />
                <input className={input} {...register("ps", { required: true })} placeholder="Enter police station" />
                <input className={input} {...register("road", { required: true })} placeholder="Enter road name" />
                <input type="number" className={input} {...register("number", { required: true })} placeholder="Enter your number" />
                <input className={button} type="submit" />
            </form>
        </div>
    );
};

export default Purchase;