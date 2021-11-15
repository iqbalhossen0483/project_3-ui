import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';
import Reviews from "./Rviews"
import useTailwind from '../../TailwindCss/useTailwind';
import SingleNews from "../News/singleNews";
import { Link } from 'react-router-dom';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [news, setNews] = useState([]);
    const [products, setProduct] = useState([]);
    const { bannerHeader, button, SectionHeader } = useTailwind();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products/home")
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/reviews")
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/news")
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])
    return (
        <div>
            {/* banner */}
            <div className="md:grid grid-cols-2 gap-3 bg-white items-center text-justify px-10">
                <img src="https://i.ibb.co/3F4TnWF/Product9-88890957-e050-4cda-bba4-0cdc7c737fef.jpg" alt="" />
                <div>
                    <h3 className={bannerHeader}>RIDES MADE BETTER</h3>
                    <p className="text-xl ">Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today </p>
                    <div className="flex justify-center mt-5">
                        <Link to="/shop">
                            <button className={button}>See all products</button>
                        </Link>
                    </div>
                </div>
            </div>
            {/* product */}
            <div className="mt-10">
                <h3 className={SectionHeader}>Our Leatest Products</h3>
                <div className="grid grid-cols-4 gap-4 m-5">
                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }
                </div>
            </div>
            {/* reviews */}
            <div className="my-16 px-5">
                <h3 className={SectionHeader}>Our Customer Reviews</h3>
                <div className="grid grid-cols-3 gap-4">
                    {
                        reviews.map(review => <Reviews key={review._id} review={review} />)
                    }
                </div>
            </div>
            {/* news */}
            <div className="my-16 px-5">
                <h3 className={SectionHeader}>Leatest News</h3>
                <div className="grid grid-cols-3 gap-4">
                    {
                        news.map(singleNews => <SingleNews key={singleNews._id} news={singleNews} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;