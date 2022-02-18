import React from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert'
import useFunc from '../../Hook/useFunc';

const AddNews = () => {
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const { userToken } = useFunc();

    const onSubmit = news => {
        const date = new Date().toLocaleDateString("en-US");
        const formData = new FormData();
        
        if (!news.img.length) {
            return alert.show("image is required");
        }

        formData.append("date", date);
        formData.append("img", news.img[0]);
        formData.append("title", news.title);
        formData.append("description", news.description);

        fetch("https://cyclemart.herokuapp.com/news", {
            method: "POST",
            headers: {
                "authorization": userToken()
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log("data", data);

                if (data.insertedId) {
                    alert.show("A news was successfully added");
                    reset();
                }
            })
            .catch(err=>console.log("err", err))
    }
    return (
        <div className="mx-3 md:mx-0">
            <form className="container lg:w-11/12" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="header col-span-2">Add news</h3>
                <input
                    className="input w-full"
                    {...register("img")}
                    type="file"
                />
                <input
                    className="input w-full"
                    {...register("title", { required: true })} placeholder="Title here..."
                />
                <textarea
                    className="input w-full"
                    rows={10}
                    {...register("description", { required: true })} placeholder="Write here..."
                />
                <input className="button w-52 h-10" type="submit" />
            </form>
        </div>
    );
};

export default AddNews;