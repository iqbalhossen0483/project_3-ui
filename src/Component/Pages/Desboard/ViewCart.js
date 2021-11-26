import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';

const ViewCart = () => {
    const [products, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addedProduct, setAddedProduct, user } = useAuth();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    useEffect(() => {
        if (products.length) {
            const newCartProducts = [];
            for (const cart of addedProduct) {
                const findCartProduct = products.find(product => product._id === cart.id);
                findCartProduct.quantity = cart.quantity;
                newCartProducts.push(findCartProduct);
            }
            setCartProducts(newCartProducts);
            setIsLoading(false);
        }
    }, [addedProduct, products]);

    const handlePlusMinus = (id, action) => {
        const newCart = [];
        for (const product of cartProducts) {
            if (product._id === id) {
                if (action === "minus" && product.quantity >= 2) {
                    product.quantity -= 1;
                }
                if (action === "plus") {
                    product.quantity += 1;
                }
                newCart.push(product);
            }
            else {
                newCart.push(product);
            }
        }
        setCartProducts(newCart);
    }

    const handleDelete = (id) => {
        const remain = addedProduct.filter(cart => cart.id !== id);
        const remainCartProduct = cartProducts.filter(product => product._id !== id);

        fetch(`https://cycle-mart.herokuapp.com/users/carts/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(remain)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setAddedProduct(remain);
                    setCartProducts(remainCartProduct);
                }
            })
    }
    let totalPrice = 0;

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <>
            {!cartProducts.length &&
                <div className="text-center text-3xl py-8 text-gray-500">
                    <h1>There no product you added</h1>
                </div>

            }
            {cartProducts.length && <div className="m-5 bg-white rounded text-xl">
                {
                    cartProducts.map(product => {
                        totalPrice += parseInt(product.price);
                        return <div
                            key={product._id}
                            className="p-3 grid grid-cols-4 justify-center items-center text-center">
                            <img src={product.img} alt="" />
                            <p>{product.name}</p>
                            <p>{product.price} BDT</p>
                            <div className="flex justify-evenly">
                                <div className="flex items-center">
                                    <button
                                        onClick={() => { handlePlusMinus(product._id, "minus") }} className="button">-
                                    </button>
                                    <span>{product.quantity}</span>
                                    <button
                                        onClick={() => { handlePlusMinus(product._id, "plus") }}
                                        className="button">+
                                    </button>
                                </div>
                                <button
                                    onClick={() => { handleDelete(product._id) }}
                                    className="button">Delete</button>
                            </div>
                            <hr className="col-span-4" />
                        </div>
                    })
                }
                {cartProducts.length &&
                    <div className="grid grid-cols-4 text-center items-center">
                        <p></p>
                        <p></p>
                        <p className="text-2xl">Total: <span className="font-semibold text-green-500">{totalPrice} BDT</span></p>
                        <div className="flex justify-center">
                            <Link to="">
                                <button className="button">Pleace Order</button>
                            </Link>
                        </div>
                    </div>
                }
            </div>}
        </>
    );
};

export default ViewCart;