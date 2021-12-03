import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';

const Shop = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProduct] = useState([]);
    const [seller, setSeller] = useState("");
    const [type, setType] = useState("");
    const [rangePrice, setRangePrice] = useState({
        from: 0,
        till: 0
    });
    const [randomProduct, setRandomProduct] = useState([]);

    useEffect(() => {
        if (seller) {
            fetch(`https://cycle-mart.herokuapp.com/products/brand/${seller}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setIsLoading(false);
                })
        }
        else if (type) {
            fetch(`https://cycle-mart.herokuapp.com/products/type/${type}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                    setIsLoading(false);
                })
        }
        else {
            fetch("https://cycle-mart.herokuapp.com/products")
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
        else {
            setSeller(e.target.name);
        }
    }
    const handleType = e => {
        if (type) {
            if (!type.includes(e.target.name)) {
                setType(type + "&&" + e.target.name);
            }
        }
        else {
            setType(e.target.name);
        }
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
            fetch(`https://cycle-mart.herokuapp.com/productsByPrice?from=${rangePrice.from}&till=${rangePrice.till}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                })
        }
    }
    const handleReset = () => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
        const previous = rangePrice;
        previous.from = 0;
        previous.till = 0;
        setRangePrice(previous);
    }

    useEffect(() => {
        if (products.length) {
            const number = Math.floor(Math.random() * products.length - 1) + 1;
            fetch(`https://cycle-mart.herokuapp.com/products/rendom/${number}`)
                .then(res => res.json())
                .then(data => setRandomProduct(data))
        }
    }, [products]);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <div className="md:pl-2 lg:px-5 my-10 flex md:h-screen md:overflow-hidden">
            <div className="scrollbar hidden md:block bg-white py-10 px-2 lg:px-4 md:w-52 lg:w-80 mr-4 lg:mr-10">
                <div className="lg:text-xl leading-8">
                    <h2 className="text-2xl lg:text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Sellers</h2>
                    <form>
                        <p className="flex items-center">
                            <input
                                onClick={(e) => { handleSellers(e) }}
                                type="checkbox"
                                name="Rakib"
                            />
                            <p className="ml-2">Rakib</p>
                        </p>
                        <p className="flex items-center">
                            <input
                                onClick={(e) => { handleSellers(e) }}
                                type="checkbox" name="Rakib-Enterprise"
                            />
                            <p className="ml-2">Rakib-Enterprise</p>
                        </p>
                        <input type="reset" onClick={() => { setSeller("") }} className="button" />
                    </form>
                </div>
                <div className="mt-10 lg:text-xl">
                    <h2 className="text-2xl lg:text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Price</h2>
                    <form
                        onSubmit={(e) => { showProductsByPriceRange(e) }}
                        onReset={handleReset}
                        className="grid grid-cols-3 mt-4">
                        <div>
                            <p>From:</p>
                            <p className="mt-2">Till:</p>
                        </div>
                        <div className="col-span-2">
                            <input
                                onBlur={(e) => { handlePriceRange(e, "from") }}
                                className="border rounded-xl w-full focus:outline-none px-4 py-1"
                                type="number"
                            />
                            <input
                                onBlur={(e) => { handlePriceRange(e, "till") }}
                                className="border rounded-xl w-full mt-2 focus:outline-none px-4 py-1"
                                type="number"
                            />
                        </div>
                        <div className="flex">
                            <input type="submit" className="button"
                            />
                            <input type="reset" className="button" />
                        </div>
                    </form>
                </div>
                <div className="lg:text-xl leading-8 mt-10">
                    <h2 className="text-2xl lg:text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Products type</h2>
                    <form>
                        <p className="flex items-center">
                            <input
                                onClick={(e) => { handleType(e) }}
                                type="checkbox"
                                name="Geared"
                            />
                            <p className="ml-2">Geared</p>
                        </p>
                        <p className="flex items-center">
                            <input
                                onClick={(e) => { handleType(e) }}
                                type="checkbox"
                                name="Non-Geared"
                            />
                            <p className="ml-2">Non-Geared</p>
                        </p>
                        <input type="reset" onClick={() => { setType("") }} className="button" />
                    </form>
                </div>
                <div className="hidden lg:block text-xl leading-8 mt-10">
                    <h2 className="text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Best Products</h2>
                    {
                        randomProduct.map(product => <Product
                            key={product._id}
                            product={product} />)
                    }
                </div>
            </div>
            <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto scrollbar">
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default Shop;