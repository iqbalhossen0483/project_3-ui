import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';
import Reviews from "./Rviews"
import useTailwind from '../../TailwindCss/useTailwind';
import SingleNews from "../News/singleNews";
import useAuth from '../../Hook/useAuth';
import Menus from './Menus';
import Massenger from './Massenger';
import { Link } from 'react-router-dom';
import PansySlider from './PansySlider';
import Slider from "react-slick";
import Footer from "../../ShareComponent/Footer/Footer";
import { NewsSkelator, ProductSkelator, ReviewSkelator } from '../../ShareComponent/SkelatorAll';

const Home = () => {
    const [reviews, setReviews] = useState([]);
    const [news, setNews] = useState([]);
    const [products, setProduct] = useState([]);
    const { SectionHeader } = useTailwind();
    const { setHideUserInfo } = useAuth();
    const [productLoading, setProductLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [newsLoading, setNewsLoading] = useState(true);

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products/home")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setProductLoading(false)
            })
            .catch(err => console.log(err.massege))
    }, []);

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setReviewLoading(false);
            })
    }, [])

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/news")
            .then(res => res.json())
            .then(data => {
                setNews(data);
                setNewsLoading(false);
            })
    }, []);

    //for slider
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div onClick={() => { setHideUserInfo(false) }}>
                {/* banner */}
                <div className="lg:grid grid-cols-4 gap-10 items-center text-justify bg-white h-1/4 lg:h-96 overflow-hidden">
                    <div className="hidden lg:block bg-white h-full">
                        <Menus />
                    </div>
                    <div className="col-span-3 bg-white h-full">
                        <PansySlider />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 my-5 px-5 md:px-10 gap-5 md:gap-10 text-center text-xl">
                    <Link to="/shop">
                        <p className="bg-white rounded-3xl py-2 shadow-lg">Free shipping</p>
                    </Link>
                    <Link to="/shop">
                        <p className="bg-white rounded-3xl py-2 shadow-lg">Winter sales</p>
                    </Link>
                    <Link to="/shop">
                        <p className="bg-white rounded-3xl py-2 shadow-lg">Best vendors</p>
                    </Link>
                    <Link to="/shop">
                        <p className="bg-white rounded-3xl py-2 shadow-lg">Hot deals</p>
                    </Link>
                </div>
                {/* product */}
                <div className="mt-10">
                    <h3 className={SectionHeader}>Our Leatest Products</h3>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:m-5">
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
                            products.map(product => <Product key={product._id} product={product} />)
                        }
                    </div>
                </div>
                {/* reviews */}
                <div className="my-16 md:px-5">
                    <h3 className={SectionHeader}>Our Customer Reviews</h3>
                    {reviewLoading ?
                        <div className="grid grid-cols-3 gap-5">
                            <ReviewSkelator />
                            <ReviewSkelator />
                            <ReviewSkelator />
                        </div> :
                        <Slider {...settings}>
                            {
                                reviews.map(review => <Reviews key={review._id} review={review} />)
                            }
                        </Slider>}
                </div>
                {/* news */}
                <div className="my-16 md:px-5">
                    <h3 className={SectionHeader}>Leatest News</h3>
                    {newsLoading ?
                        <div className="grid grid-cols-3 gap-5">
                            <NewsSkelator />
                            <NewsSkelator />
                            <NewsSkelator />
                        </div> :
                        <Slider {...settings}>
                            {
                                news.map(singleNews => <SingleNews key={singleNews._id} news={singleNews} />)
                            }
                        </Slider>}
                </div>
                <Massenger />
            </div>
            <Footer />
        </>
    );
};

export default Home;