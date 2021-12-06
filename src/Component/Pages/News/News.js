import React, { useEffect, useState } from 'react';
import Footer from '../../ShareComponent/Footer/Footer';
import Loader from '../../ShareComponent/Loader';
import SingleNews from './singleNews';

const News = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/news")
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <div className="my-16 md:px-5">

                <div className="md:grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        news.map(singleNews => <SingleNews key={singleNews._id} news={singleNews} />)
                    }
                </div>
            </div>
            <Footer />
        </>
    );
};

export default News;