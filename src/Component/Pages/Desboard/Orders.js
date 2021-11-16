import React from 'react';
import useTailwind from '../../TailwindCss/useTailwind';

const Orders = ({ order, handleDelete, children }) => {
    const { button } = useTailwind();
    const { productId, price, img, name, email, division, district, ps, road, date, status } = order;
    return (
        <div className="grid grid-cols-4 gap-3 border-b py-3 items-center">
            <div>
                <p>ID: {productId}</p>
                <p>Price: {price}</p>
            </div>
            <img className="w-full h-32" src={img} alt="" />
            <p>{`${name},
                        ${email}, 
                        ${division}, 
                        ${district}, 
                        ${ps}, 
                        ${road}, 
                        ${date}`}</p>
            <div>
                <button onClick={() => handleDelete(order._id)} className={button}>Delete</button>
                {children}
                <p className="text-green-500 mr-2">
                    {status}
                </p>
            </div>
        </div>
    );
};

export default Orders;