import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { useAlert } from 'react-alert'

const ViewCart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [allId, setAllId] = useState("");
    const { addedProduct, setAddedProduct, user } = useAuth();
    const alert = useAlert();

    //find cart products
    useEffect(() => {
        let url = "";
        for (const cart of addedProduct) {
            url += "&&" + cart.id;
        }
        setAllId(url);
        fetch(`https://cycle-mart.herokuapp.com/products/${url}`)
            .then(res => res.json())
            .then(data => {
                data.forEach(product => {
                    for (const cart of addedProduct) {
                        if (product._id === cart.id) {
                            return product.quantity = cart.quantity;
                        }
                    }
                })
                setCartProducts(data);
                setIsLoading(false)
            })
    }, [addedProduct]);

    //quantity increase decrease
    const handlePlusMinus = (id, action) => {
        const newCart = [];
        for (const product of cartProducts) {
            if (product._id === id) {
                if (action === "minus" && product.quantity >= 2) {
                    const newCart = [];
                    product.quantity -= 1;
                    for (const cart of addedProduct) {
                        if (cart.id === id) {
                            cart.quantity -= 1;
                            newCart.push(cart);
                        } else {
                            newCart.push(cart);
                        }
                    }
                    setAddedProduct(newCart);
                }
                if (action === "plus") {
                    const newCart = [];
                    product.quantity += 1;
                    for (const cart of addedProduct) {
                        if (cart.id === id) {
                            cart.quantity += 1;
                            newCart.push(cart);
                        } else {
                            newCart.push(cart);
                        }
                    }
                    setAddedProduct(newCart);
                }
                newCart.push(product);
            }
            else {
                newCart.push(product);
            }
        }
        setCartProducts(newCart);
    }

    // delete cart products
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete");
        if (confirm) {
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
                        alert.show("Product deleted")
                    }
                })
        }
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
            {cartProducts.length && <div className="m-5 bg-white text-xl">
                {
                    cartProducts.map(product => {
                        totalPrice += parseInt(product.price * product.quantity);
                        return <div
                            key={product._id}
                            className="p-3 grid md:grid-cols-4 justify-center items-center text-center">
                            <img src={product.img} alt="" />
                            <p>{product.name}</p>
                            <p>{product.price * product.quantity} BDT</p>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center items-center">
                        <p className="hidden md:block"></p>
                        <p className="hidden lg:block"></p>
                        <p className="text-xl md:text-2xl">Total: <span className="font-semibold text-green-500">{totalPrice} BDT</span></p>
                        <div className="flex justify-center">
                            <Link to={`/place-order/${allId}`}>
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