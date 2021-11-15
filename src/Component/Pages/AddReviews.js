import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Rating from 'react-rating';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const AddReviews = () => {
    const { button, formHeader, form, input } = useTailwind();
    const [rating, setRating] = useState(0);
    const { user } = useAuth();
    const name = user.displayName;
    const email = user.email;
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: name,
            email: email
        }
    });

    const handleRating = e => {
        setRating(e)
    }
    const onSubmit = review => {
        review.rating = rating;
        review.img = user.photoURL;
        fetch("http://localhost:5000/reviews", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("A review was successfully added");
                    reset();
                }
            })
    }
    return (
        <div>
            <form className={form} onSubmit={handleSubmit(onSubmit)}>
                <h3 className={formHeader}>Your valuable comment</h3>
                <input className={input} disabled {...register("name", { required: true })} placeholder="Enter the name" />
                <input type="email" disabled className={input} {...register("email", { required: true })} placeholder="Enter a email" />
                <textarea className={input} {...register("description", { required: true })} placeholder="Enter short description" />
                <Rating
                    onChange={handleRating}
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                />
                <input className={button} type="submit" />
            </form>
        </div>
    );
};

export default AddReviews;