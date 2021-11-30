import React, { useEffect, useState } from 'react';
import Orders from './Orders';
import { useAlert } from 'react-alert'

const ManageOrder = () => {
    const [orders, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setIsLoading(false);
            })
    }, [isLoading]);

    const handleApprove = (id) => {
        const changeData = {
            status: "Approved",
            id: id
        }
        fetch(`https://cycle-mart.herokuapp.com/orders`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(changeData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert.show("Order Approved");
                    if (isLoading) {
                        setIsLoading(false);
                    }
                    else {
                        setIsLoading(true);
                    }
                }
            })
    }

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <div className="mx-5 bg-white my-10 text-center rounded-md">
            <div className="grid grid-cols-4 gap-3 border-b py-3">
                <p>Product details</p>
                <p>Product images</p>
                <p>Customer details</p>
                <p></p>
            </div>
            <div>
                {
                    orders.map(order => <Orders key={order._id} order={order} orders={orders} setOrder={setOrder}>
                        <button onClick={() => { handleApprove(order._id) }} className="button">Approve</button>
                    </Orders>)
                }
            </div>
        </div>
    );
};

export default ManageOrder;