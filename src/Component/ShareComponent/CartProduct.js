import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFirebase from '../Hook/useFirebase';

const CartProduct = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setShowCart, addedProduct } = useFirebase();


    useEffect(() => {
        let id = "";
        for (const cart of addedProduct) {
            id += "&&" + cart.id;
        }
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setCartProducts(data);
                setIsLoading(false);
            })
    }, [addedProduct]);

    let totalPrice = 0;

    if (isLoading) {
        return <p style={{ position: "absolute" }} className="absolute top-full right-5 bg-white shadow-md z-20">
            Loading...
        </p>
    }
    return (
        <div style={{ position: "absolute" }}
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
            className="cart-product scrollbar">
            {cartProducts.length &&
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
            {cartProducts.length &&
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