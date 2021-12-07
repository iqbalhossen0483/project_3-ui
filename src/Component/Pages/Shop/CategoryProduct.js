import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../../ShareComponent/Product';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [isProduct, setIsProduct] = useState(true);
    const { category } = useParams();

    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/category/${category}`)
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
            {isProduct &&
                <div
                    className="text-3xl h-full flex justify-center items-center">
                    <p>There is no product</p>
                </div>
            }
            {!isProduct &&
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 m-10">
                    {
                        products.map(product => <Product key={product._id} product={product} />)
                    }
                </div>
            }
        </>
    );
};

export default CategoryProduct;