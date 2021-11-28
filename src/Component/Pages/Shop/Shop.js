import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';

const Shop = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProduct] = useState([]);
    const [seller, setSeller] = useState("");
    const [sellerProducts, setSellerProducts] = useState([]);
    const [randomProduct, setRandomProduct] = useState([]);

    useEffect(() => {
        if (seller) {
            fetch(`https://cycle-mart.herokuapp.com/products/brand/${seller}`)
                .then(res => res.json())
                .then(data => {
                    setSellerProducts(data);
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
    }, [seller]);

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

    useEffect(() => {
        if (products.length) {
            const number = Math.floor(Math.random() * products.length) + 1;
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
        <div className="md:grid grid-cols-4 gap-5 md:px-5 my-10">
            <div className="bg-white py-10 px-4">
                <div className="text-xl leading-8">
                    <h2 className="text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Sellers</h2>
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
                <div className="mt-10 text-xl">
                    <h2 className="text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Price</h2>
                    <div className="grid grid-cols-3 mt-4">
                        <div>
                            <p>Start from:</p>
                            <p className="mt-2">Till:</p>
                        </div>
                        <div className="col-span-2">
                            <input className="border rounded-xl w-full focus:outline-none px-4 py-1" type="number" />
                            <input className="border rounded-xl w-full mt-2 focus:outline-none px-4 py-1" type="number" />
                        </div>
                    </div>
                </div>
                <div className="text-xl leading-8 mt-10">
                    <h2 className="text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Products type</h2>
                    <p className="flex items-center">
                        <input type="checkbox" />
                        <p className="ml-2">Geared</p>
                    </p>
                    <p className="flex items-center">
                        <input type="checkbox" />
                        <p className="ml-2">Non-Geared</p>
                    </p>
                </div>
                <div className="text-xl leading-8 mt-10">
                    <h2 className="text-3xl text-green-500 font-semibold border-b-2 py-1 border-green-500">Best Products</h2>
                    {
                        randomProduct.map(product => <Product
                            key={product._id}
                            product={product} />)
                    }
                </div>
            </div>
            <div className="col-span-3 grid grid-cols-3 gap-5">
                {
                    products.map(product => <Product key={product._id} product={product} />)
                }
            </div>
        </div>
    );
};

export default Shop;