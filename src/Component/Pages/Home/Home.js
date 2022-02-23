import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';
import Reviews from "./Rviews"
import SingleNews from "../News/singleNews";
import useFirebase from '../../Hook/useFirebase';
import Menus from './Menus';
import Massenger from './Massenger';
import { Link } from 'react-router-dom';
import PansySlider from './PansySlider';
import Slider from "react-slick";
import Footer from "../../ShareComponent/Footer/Footer";
import settings from './sliderSetting';
import { NewsSkelator, ProductSkelator, ReviewSkelator } from '../../ShareComponent/SkelatorAll';
import { useAlert } from 'react-alert';

const Home = () => {
    const [productLoading, setProductLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);
    const [products, setProduct] = useState([]);
    const [reviews, setReviews] = useState([]);
    const { setHideUserInfo } = useFirebase();
    const [offers, setOffers] = useState([]);
    const [error, setError] = useState(null);
    const [news, setNews] = useState([]);
    const alart = useAlert();

    useEffect(() => {

        fetch("https://cyclemart.herokuapp.com/products/home")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setProductLoading(false)
            })
            .catch(err => setError(err.massege))
    }, [alart]);

    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setReviewLoading(false);
            })
            .catch(err => setError(err.massege))
    }, [alart])

    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/news")
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setNewsLoading(false);
            })
            .catch(err => setError(err.massege))
    }, [alart]);

    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/offers")
            .then(res => res.json())
            .then(data => setOffers(data))
    }, []);
    
    return (
        <>
            <div onClick={() => { setHideUserInfo(false) }}>

                {/* banner */}
                <div className="banner">
                    <div className="hidden lg:block bg-white h-full">
                        <Menus />
                    </div>
                    <div className="col-span-3 bg-white h-full">
                        <PansySlider />
                    </div>
                </div>

                {/* flesh cart */}
                <div className="flesh-cart">
                    {
                        offers.map(item => <div key={item._id}>
                            <Link
                                to={item.url.
                                    replace("https://cycle-mart-3ff64.web.app", "")
                                }>
                                <p className="item">{item.name}</p>
                            </Link>    
                        </div>)
                    }
                </div>

                {/* product */}
                <div className="mt-10">
                    <h3 className="h1">Our Leatest Products</h3>
                    <div className="product-container">
                        {productLoading ?
                            <>
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                                <ProductSkelator />
                            </> :
                            products.map(product => <Product
                                key={product._id}
                                product={product}
                            />)
                        }
                    </div>
                </div>

                {/* reviews */}
                <div className="my-16 md:px-5">
                    <h3 className="h1">Our Customer Reviews</h3>
                    {reviewLoading ?
                        <div className="grid grid-cols-3 gap-5">
                            <ReviewSkelator />
                            <ReviewSkelator />
                            <ReviewSkelator />
                        </div> :
                        <Slider {...settings}>
                            {
                                reviews.map(review => <Reviews
                                    key={review._id}
                                    review={review}
                                />)
                            }
                        </Slider>}
                </div>

                {/* news */}
                <div className="my-16 md:px-5">
                    <h3 className="h1">Leatest News</h3>
                    {newsLoading ?
                        <div className="grid grid-cols-3 gap-5">
                            <NewsSkelator />
                            <NewsSkelator />
                            <NewsSkelator />
                        </div> :
                        <Slider {...settings}>
                            {
                                news.map(singleNews => <SingleNews
                                    key={singleNews._id}
                                    news={singleNews}
                                />)
                            }
                        </Slider>}
                </div>
                <Massenger />
                {error &&
                    <p>{error}</p>
                }
            </div>
            <Footer />
        </>
    );
};

export default Home;