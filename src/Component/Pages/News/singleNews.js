import React from 'react';

const SingleNews = ({ news }) => {
    const { img, name, description, date } = news;
    return (
        <div className="m-3 md:m-3 bg-white rounded-md pb-5 shadow-lg">
            <img className="rounded-t-md" src={img} alt="" />
            <p className="text-2xl font-semibold my-3 text-center">{name}</p>
            <p className="px-3 text-xl">{description.length > 100 ? description.slice(0, 100) + "..." : description}</p>
            <p className=" px-3">Post on: {date}</p>
            <div className="flex justify-center">
                <button className="button">Learn more</button>
            </div>
        </div>
    );
};

export default SingleNews;