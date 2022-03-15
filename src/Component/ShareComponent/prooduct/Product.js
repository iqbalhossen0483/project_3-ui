import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFirebase from '../../Hook/useFirebase';
import { useAlert } from 'react-alert'
import useFunc from '../../Hook/useFunc';
import { useEffect } from 'react';

const Product = (props) => {
    const navigate = useNavigate();
    const { user } = useFirebase();
    const { addedProduct, setAddedProduct } = useFunc();
    const { name, _id, price } = props.product;
    const alert = useAlert();

    useEffect(() => {
        const navText = window.location.pathname === '/'
            ? "cycle mart"
            :
            "cycle mart " + window.location.pathname.split("/").join(">> ");
        document.title = navText;
    },[])

    const handleCart = (id) => {
        if (user.email) {
            const notExist = addedProduct?.find(cart => cart.id === id);
            if (!notExist) {
                let cart = [];
                if (!addedProduct) {
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
                fetch(`https://cyclemart.herokuapp.com/users/carts/${user.email}`, {
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
        <div className="product">
            <div>
                <img
                    className="h-52 w-full rounded-t object-cover"
                    src={props.product.productImg?.imgUrl} alt=""
                />
                <p className="text-xl ml-4 font-semibold my-2">
                    {name}
                </p>
                <p className="text-xl ml-4 text-green-500 font-semibold">
                    Price: {price} BDT
                </p>
                <div className="flex justify-between ml-2 mr-8">
                    <button
                        onClick={() => { handleCart(_id) }}
                        className="button">
                        Add to cart
                    </button>
                    <Link to={`/products/${_id}`}>
                        <button className="button">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;