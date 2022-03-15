import ProductSkelator from '../../ShareComponent/skelator/ProductSkelator';
import ProductSideSkelator from '../../ShareComponent/skelator/ProductSideSkelator';
import Product from '../../ShareComponent/prooduct/Product';
import Footer from '../../ShareComponent/Footer/Footer';
import React, { useEffect, useState } from 'react';
import SideMenus from './component/SideMenus';

const Shop = () => {
    const [randomProduct, setRandomProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rangePrice, setRangePrice] = useState({
        from: 0,
        till: 0
    });
    const [products, setProduct] = useState([]);
    const [seller, setSeller] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {

        if (seller) {
            fetch(`https://cyclemart.herokuapp.com/products/brand/${seller}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setIsLoading(false);
                })
        }
        else if (type) {
            fetch(`https://cyclemart.herokuapp.com/products/type/${type}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setIsLoading(false);
                })
        }
        else {
            fetch("https://cyclemart.herokuapp.com/products")
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setIsLoading(false);
                })
        }
    }, [seller, type, rangePrice]);


    const handleSellers = e => {
        if (seller) {
            if (!seller.includes(e.target.name)) {
                setSeller(seller + "&&" + e.target.name);
            }
        }
        else setSeller(e.target.name);
    }

    const handleType = e => {
        if (type) {
            if (!type.includes(e.target.name)) {
                setType(type + "&&" + e.target.name);
            }
        }
        else setType(e.target.name);
    }

    const handlePriceRange = (e, whereTo) => {
        const previous = rangePrice;
        if (whereTo === "from") {
            previous.from = e.target.value;
            setRangePrice(previous);
        }
        else {
            previous.till = e.target.value;
            setRangePrice(previous);
        }
    }

    const showProductsByPriceRange = (e) => {
        e.preventDefault();
        if (rangePrice.from > 0 && rangePrice.till > 0) {
            fetch(`https://cyclemart.herokuapp.com/products/price/byrange?from=${rangePrice.from}&till=${rangePrice.till}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                })
        }
    };
    const handleReset = () => {
        fetch("https://cyclemart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
        const previous = rangePrice;
        previous.from = 0;
        previous.till = 0;
        setRangePrice(previous);
    }

    //get random product
    useEffect(() => {
        if (products.length) {
            const number = Math.floor(Math.random() * products.length - 1) + 1;
            fetch(`https://cyclemart.herokuapp.com/products/rendom/${number}`)
                .then(res => res.json())
                .then(data => setRandomProduct(data))
        }
    }, [products]);


    if (isLoading) {
        return (
            <div className="lg:grid gap-5 grid-cols-4 mt-5">
                <div className="">
                    <ProductSideSkelator />
                </div>
                <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <ProductSkelator />
                    <ProductSkelator />
                    <ProductSkelator />
                    <ProductSkelator />
                    <ProductSkelator />
                    <ProductSkelator />
                </div>
            </div>
        )
    }
    return (
        <div
            className="md:pl-2 lg:px-2 lg:grid grid-cols-4">
            <p></p>
            <SideMenus
                handleSellers={handleSellers}
                setSeller={setSeller}
                showProductsByPriceRange={showProductsByPriceRange}
                handleReset={handleReset}
                handlePriceRange={handlePriceRange}
                handleType={handleType}
                setType={setType}
                randomProduct={randomProduct}
            />
            <div className="col-span-3 mt-10">
                <div className="shop-product">
                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Shop;