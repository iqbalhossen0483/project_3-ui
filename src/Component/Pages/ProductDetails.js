import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
    const [products, setProducts] = useState({});
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [id]);
    const { name } = products;
    console.log(products)
    return (
        <div>
            <p>{name}</p>
            <p>products details commming soon</p>
        </div>
    );
};

export default ProductDetails;