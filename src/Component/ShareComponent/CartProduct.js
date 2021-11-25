import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';

const CartProduct = () => {
    const [products, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const { setShowCart, addedProduct } = useAuth();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })

        if (products.length) {
            const newCartProducts = [];
            for (const id of addedProduct) {
                const findCartProduct = products.find(product => product._id === id);
                newCartProducts.push(findCartProduct);
            }
            setCartProducts(newCartProducts);
        }
    }, [addedProduct, products]);

    let totalPrice = 0;
    return (
        <div
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
            className="absolute top-full right-5 bg-white shadow-md z-20">
            {cartProducts &&
                cartProducts.map(product => {
                    totalPrice += parseInt(product.price);
                    return <div
                        key={product?._id}
                        className="grid grid-cols-2 items-center text-center">
                        <img className="w-32" src={product.img} alt="" />
                        <p className="text-xl">{product.price}</p>
                        < hr className="col-span-2" />
                    </div>
                })
            }
            {cartProducts &&
                <div className="grid grid-cols-2 text-center text-xl">
                    <p></p>
                    <p>Total: {totalPrice}</p>
                </div>
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