import React from 'react';
import { useForm } from 'react-hook-form';
import useTailwind from '../../TailwindCss/useTailwind';
import { useAlert } from 'react-alert'

const MakeAdmin = () => {
    const { formHeader, singleDiv, input } = useTailwind();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const onSubmit = email => {
        fetch("https://cycle-mart.herokuapp.com/admin", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(email)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert.show("Make admin successful");
                    reset();
                }
            })
    }
    return (
        <div className="mx-3 md:mx-0">
            <form className={singleDiv} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={formHeader}>Make an admin</h3>
                <input type="email" className={input} {...register("email", { required: true })} placeholder="Enter email address" />
                <input className="button" type="submit" />
            </form>
        </div>
    );
};

export default MakeAdmin;