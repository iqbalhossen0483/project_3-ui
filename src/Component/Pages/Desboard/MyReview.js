import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import Rviews from '../Home/Rviews';

const MyReview = () => {
    const [reviews, setReview] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/reviews")
            .then(res => res.json())
            .then(data => {
                const find = data.filter(review => review.email === user.email);
                setReview(find);
            })
    }, [user.email]);
    return (
        <div>
            {reviews.length ?
                <div className="md:grid grid-cols-3 gap-4 md:m-10">
                    {
                        reviews.map(review => <Rviews review={review} />)
                    }
                </div>
                :
                <div className="text-xl text-center mt-8 w-40 mx-auto">
                    <p>You didn't make any review</p>
                    <NavLink className="button" to='add-review'>Add-Review</NavLink>
                </div>}
        </div>
    );
};

export default MyReview;