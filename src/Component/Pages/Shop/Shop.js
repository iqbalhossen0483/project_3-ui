import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import Product from '../../ShareComponent/Product';

const Shop = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { products, setProduct } = useAuth();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <div className="md:grid grid-cols-4 gap-5 md:px-5 my-10">
            {
                products.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    );
};

export default Shop;