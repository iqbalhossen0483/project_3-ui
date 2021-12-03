import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useTailwind from '../../TailwindCss/useTailwind';
import { Link } from 'react-router-dom';


const Slider = () => {
    const { bannerHeader } = useTailwind();
    return (

        <div className="px-10">
            <Carousel showArrows={false} autoPlay showThumbs={false} infiniteLoop showIndicators={false} showStatus={false} >
                <div className="md:grid grid-cols-4 items-center justify-center">
                    <img className="col-span-2" src="https://i.ibb.co/7bwGPkz/Product10.jpg" alt="" />
                    <div className="col-span-2 hidden md:block">
                        <p className={bannerHeader}>RIDES MADE BETTER</p>
                        <p cl="text-2xl">Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today</p>
                        <Link to="/shop">
                            <button className="button mt-6">see all products</button>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-4 items-center">
                    <img className="col-span-2" src="https://i.ibb.co/FJsHDxn/Product11-1b85d6ef-01d0-4dcc-9f9f-c92f2de1d3fc-1.jpg" alt="" />
                    <div className="col-span-2 hidden md:block">
                        <p className={bannerHeader}>EXPRIENCE NEW RIDE</p>
                        <p cl="text-2xl">Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today</p>
                        <Link to="/shop">
                            <button className="button mt-6">buy now</button>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-4 items-center">
                    <img className="col-span-2" src="https://i.ibb.co/7bwGPkz/Product10.jpg" alt="" />
                    <div className="col-span-2 hidden md:block">
                        <p className={bannerHeader}>LOVE EVERY RIDE</p>
                        <p cl="text-2xl">Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today</p>
                        <Link to="/shop">
                            <button className="button mt-6">take a look</button>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-4 items-center">
                    <img className="col-span-2" src="https://i.ibb.co/Kx00vX4/Product4-d92d289a-139f-4f62-8b67-e96b5f3d0d3e.jpg" alt="" />
                    <div className="col-span-2 hidden md:block">
                        <p className={bannerHeader}>A POPULATION FREE RIDE</p>
                        <p cl="text-2xl">Believe in your cycle, It will lead your way. The best rides heppen on two wheels. Ride it like a pro it's not just a riding. It's a feeling. Ride and live today</p>
                        <Link to="/shop">
                            <button className="button mt-6">buy now</button>
                        </Link>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}

export default Slider;