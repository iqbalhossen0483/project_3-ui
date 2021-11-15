import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
                <div className="grid grid-cols-3 gap-4 m-10">
                    {
                        reviews.map(review => <Rviews review={review} />)
                    }
                </div>
                :
                <div className="text-xl text-center mt-8">
                    <p>You didn't make any review</p>
                    <p>please Add a review</p>
                </div>}
        </div>
    );
};

export default MyReview;