import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const Product = (props) => {
    const { product } = useTailwind();
    const navigate = useNavigate();
    const { addedProduct, setAddedProduct, user } = useAuth();
    const { img, name, _id, price } = props.product;
    const handleCart = (id) => {
        if (user.email) {
            const notExist = addedProduct.find(cart => cart.id === id);
            if (!notExist) {
                let cart = [];
                if (addedProduct.length === 0) {
                    cart = [
                        {
                            id: id,
                            quantity: 1
                        }
                    ];
                } else {
                    cart = [...addedProduct, {
                        id: id,
                        quantity: 1
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
                        }
                    })
            }
            else {
                alert("already added")
            }
        }
        else {
            navigate("/log-in");
        }
    }
    return (
        <div className={product}>
            <div>
                <img className="h-52 w-full rounded-t object-cover" src={img} alt="" />
                <p className="text-2xl ml-4 font-semibold mb-2">{name}</p>
                <p className="text-2xl ml-4 text-green-500 font-semibold">
                    Price: {price} BDT</p>
                <div className="flex justify-between mx-2">
                    <button onClick={() => { handleCart(_id) }} className="button">Add to cart</button>
                    <Link to={`/products/${_id}`}>
                        <button className="button">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;