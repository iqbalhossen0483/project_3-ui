import React from 'react';
import { useForm } from 'react-hook-form';
import useTailwind from '../../TailwindCss/useTailwind';
import { useAlert } from 'react-alert'

const AddNews = () => {
    const { formHeader, singleDiv, input } = useTailwind();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const onSubmit = news => {
        const date = new Date().toLocaleDateString("en-US")
        news.date = date;
        fetch("https://cycle-mart.herokuapp.com/news", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(news)
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
                <h3 className={formHeader}>Add news</h3>
                <input className={input} {...register("img", { required: true })} placeholder="Enter a img url" />
                <input className={input} {...register("name", { required: true })} placeholder="Enter the name" />
                <textarea className={input} {...register("description", { required: true })} placeholder="Enter short description" />
                <input className="button" type="submit" />
            </form>
        </div>
    );
};

export default AddNews;