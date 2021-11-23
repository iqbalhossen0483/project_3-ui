import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const CartProduct = () => {
    const { addedProduct, setShowCart, cartProducts, setCartProducts } = useAuth();
    const [products, setProduct] = useState([])
    const { button } = useTailwind();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })

        const newCartProducts = [];
        for (const id of addedProduct) {
            const findCartProduct = products.find(product => product._id === id);
            newCartProducts.push(findCartProduct);
        }
        setCartProducts(newCartProducts);
    }, [addedProduct, products]);

    return (
        <div
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
            className="absolute top-full right-5 bg-white shadow-md z-20">
            {products &&
                cartProducts.map(product => <div
                    key={product?._id}
                    className="grid grid-cols-2 items-center text-center">
                    <img className="w-32" src={product?.img} alt="" />
                    <p className="text-xl">{product?.name}</p>
                    < hr className="col-span-2" />
                </div>)
            }
            <div className="col-span-2 mt-3 flex justify-center">
                <Link to="/my-account/view-cart">
                    <button className="button">View cart</button>
                </Link>
            </div>
        </div>
    );
};

export default CartProduct;