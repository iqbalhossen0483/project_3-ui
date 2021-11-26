import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';

const ViewCart = () => {
    const [products, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
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
                newCartProducts.push(findCartProduct);
            }
            setCartProducts(newCartProducts);
            setIsLoading(false);
        }
    }, [addedProduct, products,])

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
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
                    <h1>There no product you added to cart</h1>
                </div>

            }
            {cartProducts.length && <div className="m-5 bg-white rounded">
                {cartProducts &&
                    cartProducts.map(product => {
                        totalPrice += parseInt(product.price);
                        return <div
                            key={product._id}
                            className="p-3 grid grid-cols-4 justify-center items-center text-center">
                            <img src={product.img} alt="" />
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                            <div className="flex justify-evenly">
                                <div className="flex items-center">
                                    <button
                                        onClick={handleMinus} className="button">-
                                    </button>
                                    <span>1</span>
                                    <button
                                        onClick={() => { setQuantity(quantity + 1) }} className="button">+
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
                    <div className="grid grid-cols-4 text-center">
                        <p></p>
                        <p></p>
                        <p className="py-3">Total: {totalPrice}</p>
                        <p></p>
                    </div>
                }
            </div>}
        </>
    );
};

export default ViewCart;