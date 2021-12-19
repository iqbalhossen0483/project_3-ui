import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import { useAlert } from 'react-alert';

const ProductDetails = () => {
    const [products, setProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();
    const { quantity, setQuantity, user, addedProduct, setAddedProduct } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setQuantity(1);
                setIsLoading(false);
            })
    }, [id]);
    const { name, img, price, _id, stock, vendor, type, description, category } = products;

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleCart = (id) => {
        if (user.email) {
            const notExist = addedProduct.find(cart => cart.id === id);
            if (!notExist) {
                let cart = [];
                if (addedProduct.length === 0) {
                    cart = [
                        {
                            id: id,
                            quantity: quantity
                        }
                    ];
                } else {
                    cart = [...addedProduct, {
                        id: id,
                        quantity: quantity
                    }];
                }
                fetch(`https://cycle-mart.herokuapp.com/users/carts/${user.email}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(cart)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            setAddedProduct(cart);
                            alert.show("Product added")
                        }
                    })
            }
            else {
                alert.show("already added");
            }
        }
        else {
            navigate("/log-in");
        }
    }

    if (isLoading) {
        return <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    }
    return (
        <>
            <div className="md:grid grid-cols-2 bg-white gap-3">
                <img src={img} alt="" />
                <div className="px-5 md:px-0 mt-8 text-xl md:text-2xl font-bold leading-10">
                    <h1 className="text-4xl md:text-5xl font-semibold mb-7">{name}</h1>
                    <p>Price: <span className="text-2xl font-semibold text-green-500">BDT {price * quantity}</span></p>
                    <div className="product-color flex items-center my-3">Color:
                        <p className="bg-green-600"></p>
                        <p className="bg-red-600"></p>
                        <p className="bg-yellow-600"></p>
                    </div>
                    <p>Vendor: <span className="text-xl font-semibold">{vendor}</span></p>
                    <p className="my-3">Type: <span className="text-xl font-semibold">{type}</span></p>
                    <p className="my-3">Category: <span className="text-xl font-semibold">{category}</span></p>
                    <p>Availability:
                        <span className="text-green-500 text-xl font-semibold ml-2">{parseInt(stock) > 0 && parseInt(stock) > quantity ? "In stock!" :
                            <span className="text-red-500">
                                Out of stock
                            </span>}
                        </span></p>
                    <div>
                        <div className="flex items-center mt-3 leading-4">
                            <p className="mr-3">Quantity: </p>
                            <button
                                onClick={handleMinus}
                                className="border rounded text-3xl px-5">-
                            </button>
                            <span className="mx-3 text-xl font-semibold">{quantity}</span>
                            <button
                                onClick={() => { setQuantity(quantity + 1) }}
                                className="border rounded text-3xl px-5">+
                            </button>
                        </div>
                        <div className="flex justify-center md:justify-start leading-5 mt-4">
                            <button
                                onClick={() => { handleCart(_id) }}
                                className="button">Add to cart</button>
                            <Link to={`/place-order/${_id}`}>
                                <button className="button">buy now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-8 px-2 md:px-0 text-justify text-xl">
                <div className="md:w-3/4 mx-auto border rounded-lg p-5">
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;