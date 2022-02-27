import React, { useEffect, useState } from 'react';
import Product from '../../ShareComponent/Product';
import { useParams } from 'react-router';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [isProduct, setIsProduct] = useState(true);
    const { category } = useParams();

    useEffect(() => {
        fetch(`https://cyclemart.herokuapp.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                if (data.length > 0) {
                    setIsProduct(false);
                }
            })
    }, [category]);

    return (
        <>
            {!isProduct ?
                <div className="md:grid md:grid-cols-3 lg:grid-cols-4 md:gap-5 md:m-10">
                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }
                </div>
                :
                <div
                    className="text-3xl h-full flex justify-center items-center">
                    <p>There is no product</p>
                </div>
            }
        </>
    );
};

export default CategoryProduct;