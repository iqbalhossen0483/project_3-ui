import React from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const PansySlider = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <div
                        className="item">
                        <img
                            className="col-span-2"
                            src="https://i.ibb.co/7bwGPkz/Product10.jpg"
                            alt=""
                        />
                        <div className="col-span-2 hidden md:block">
                            <p className="header slider-header">
                                RIDES MADE BETTER
                            </p>
                            <p>
                                Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today
                            </p>
                            <Link to="/shop">
                                <button className="button mt-6">
                                    see all products
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="item">
                        <img
                            className="col-span-2"
                            src="https://i.ibb.co/FJsHDxn/Product11-1b85d6ef-01d0-4dcc-9f9f-c92f2de1d3fc-1.jpg"
                            alt=""
                        />
                        <div className="col-span-2 hidden md:block">
                            <p className="header slider-header">
                                EXPRIENCE NEW RIDE
                            </p>
                            <p>
                                Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today
                            </p>
                            <Link to="/shop">
                                <button
                                    className="button mt-6">
                                    buy now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="item">
                        <img
                            className="col-span-2"
                            src="https://i.ibb.co/7bwGPkz/Product10.jpg"
                            alt=""
                        />
                        <div className="col-span-2 hidden md:block">
                            <p className="header slider-header">
                                LOVE EVERY RIDE
                            </p>
                            <p>
                                Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today
                            </p>
                            <Link to="/shop">
                                <button
                                    className="button mt-6">
                                    take a look
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className="item">
                        <img
                            className="col-span-2"
                            src="https://i.ibb.co/Kx00vX4/Product4-d92d289a-139f-4f62-8b67-e96b5f3d0d3e.jpg" alt=""
                        />
                        <div className="col-span-2 hidden md:block">
                            <p className="header slider-header">
                                A POPULATION FREE RIDE
                            </p>
                            <p>
                                Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today
                            </p>
                            <Link to="/shop">
                                <button
                                    className="button mt-6">
                                    buy now
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

export default PansySlider;