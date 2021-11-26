import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const Product = (props) => {
    const { product } = useTailwind();
    const navigate = useNavigate();
    const { addedProduct, setAddedProduct, user } = useAuth();
    const { img, name, description, _id, price } = props.product;
    const handleCart = (id) => {
        if (user.email) {
            console.log("user email available")
            const notExist = addedProduct.find(_id => _id === id);
            if (!notExist) {
                let cart = [];
                if (addedProduct.length === 0) {
                    cart = [id];
                } else {
                    cart = [...addedProduct, id]
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
            console.log("user email not available")
            navigate("/log-in");
        }
    }
    return (
        <div className={product}>
            <img style={{ borderRadius: "5px" }} src={img} alt="" />
            <p className="text-2xl text-center font-semibold mb-2">{name}</p>
            <p className="text-justify px-3">{description.slice(0, 150)}</p>
            <p className="text-2xl ml-4 text-green-500 font-semibold mt-3">
                Price: {price} BDT</p>
            <div className="flex justify-evenly mt-3">
                <button onClick={() => { handleCart(_id) }} className="button">Add to cart</button>
                <Link to={`/place-order/${_id}`}>
                    <button className="button">Buy now</button>
                </Link>
            </div>
        </div>
    );
};

export default Product;