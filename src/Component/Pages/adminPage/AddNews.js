import React from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'

const AddNews = () => {
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
            <form className="container lg:w-11/12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="header col-span-2">Add news</h3>
                <input
                    className="input w-full"
                    {...register("img", { required: true })} placeholder="Enter a img url"
                />
                <input
                    className="input w-full"
                    {...register("name", { required: true })} placeholder="Enter the name"
                />
                <textarea
                    className="input w-full"
                    rows={10}
                    {...register("description", { required: true })} placeholder="Enter short description"
                />
                <input className="button w-52 h-10" type="submit" />
            </form>
        </div>
    );
};

export default AddNews;