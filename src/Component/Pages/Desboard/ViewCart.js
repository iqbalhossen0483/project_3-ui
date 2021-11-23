import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';

const ViewCart = () => {
    const [products, setProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const { addedProduct, setAddedProduct, user } = useAuth();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);

    useEffect(() => {
        const newCartProducts = [];
        for (const id of addedProduct) {
            const findCartProduct = products.find(product => product._id === id);
            newCartProducts.push(findCartProduct);
        }
        setCartProducts(newCartProducts);
    }, [addedProduct, products,])

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleDelete = (id) => {
        const remain = addedProduct.filter(_id => _id !== id);
        setAddedProduct(remain);
        const remainCartProduct = cartProducts.filter(product => product._id !== id);
        setCartProducts(remainCartProduct);

        fetch(`https://cycle-mart.herokuapp.com/users/carts/${user.email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(addedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    setAddedProduct(addedProduct);
                }
            })
    }
    return (
        <div className="m-5 bg-white rounded">
            {cartProducts &&
                cartProducts.map(product => <div
                    key={product?._id}
                    className="p-3 grid grid-cols-4 justify-center items-center text-center">
                    <img src={product?.img} alt="" />
                    <p>{product?.name}</p>
                    <p>{product?.price}</p>
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
                </div>)
            }
        </div>
    );
};

export default ViewCart;