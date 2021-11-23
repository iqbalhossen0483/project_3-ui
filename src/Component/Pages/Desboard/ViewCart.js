import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';

const ViewCart = () => {
    const [quantity, setQuantity] = useState(1);
    const { cartProducts } = useAuth();
    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    return (
        <div className="m-5 bg-white rounded">
            {
                cartProducts?.map(product => <div
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
                        <button className="button">Delete</button>
                    </div>
                    <hr className="col-span-4" />
                </div>)
            }
        </div>
    );
};

export default ViewCart;