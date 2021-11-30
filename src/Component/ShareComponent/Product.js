import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';
import { useAlert } from 'react-alert'

const Product = (props) => {
    const { product } = useTailwind();
    const navigate = useNavigate();
    const { addedProduct, setAddedProduct, user } = useAuth();
    const { img, name, _id, price } = props.product;
    const alert = useAlert()

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
                            alert.success('Product added to cart');
                        }
                    })
            }
            else {
                alert.info("already added");
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
                <p className="text-xl ml-4 text-green-500 font-semibold">
                    Price: {price} BDT</p>
                <div className="flex justify-between ml-2 mr-8">
                    <button
                        onClick={() => { handleCart(_id) }} className="button">Add to cart</button>
                    <Link to={`/products/${_id}`}>
                        <button className="button">Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;