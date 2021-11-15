import React from 'react';
import useTailwind from '../../TailwindCss/useTailwind';

const SingleNews = ({ news }) => {
    const { img, name, description, date } = news;
    const { button } = useTailwind();
    return (
        <div className="bg-white rounded-md">
            <img className="rounded-t-md" src={img} alt="" />
            <p className="text-2xl font-semibold my-3 text-center">{name}</p>
            <p className="text-justify px-3 text-xl">{description.slice(0, 100)}</p>
            <p className=" px-3">Post on: {date}</p>
            <div className="flex justify-center my-2">
                <button className={button}>Learn more</button>
            </div>
        </div>
    );
};

export default SingleNews;