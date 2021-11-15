import React, { useEffect, useState } from 'react';
import SingleNews from './singleNews';

const News = () => {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/news")
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])
    console.log(news)
    return (
        <div className="my-16 px-5">
            <div className="grid grid-cols-3 gap-4">
                {
                    news.map(singleNews => <SingleNews key={singleNews._id} news={singleNews} />)
                }
            </div>
        </div>
    );
};

export default News;