import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';

const Shop = () => {
    const [products, setProduct] = useState([]);
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => setProduct(data))
    }, []);
    return (
        <div className="grid grid-cols-4 gap-5 px-5 my-10">
            {
                products.map(product => <Product key={product._id} product={product} />)
            }
        </div>
    );
};

export default Shop;