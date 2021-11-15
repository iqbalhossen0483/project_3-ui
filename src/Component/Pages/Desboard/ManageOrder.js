import React, { useEffect, useState } from 'react';
import useTailwind from '../../TailwindCss/useTailwind';

const ManageOrder = () => {
    const [orders, setOrder] = useState([]);
    const { button } = useTailwind();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => setOrder(data))
    }, []);
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
                    alert("Order Approved")
                }
            })
    }
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete");
        if (confirm) {
            fetch(`https://cycle-mart.herokuapp.com/orders/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("Order delete successfully");
                        const remain = orders.filter(order => order._id !== id);
                        setOrder(remain);
                    }
                })
        }
    }
    return (
        <div className="mx-5 bg-white my-10 text-center rounded-md">
            <div className="grid grid-cols-4 gap-3 border-b py-3">
                <p>Product Id</p>
                <p>Images</p>
                <p>Details</p>
                <p></p>
            </div>
            <div>
                {
                    orders.map(order => <div
                        key={order._id}
                        className="grid grid-cols-4 gap-3 border-b py-3 items-center">
                        <p>{order.productId}</p>
                        <img className="w-full h-32" src={order.img} alt="" />
                        <p>{`${order.name},
                        ${order.email}, 
                        ${order.division}, 
                        ${order.distric}, 
                        ${order.ps}, 
                        ${order.road}, 
                        ${order.date}`}</p>
                        <div>
                            <button onClick={() => handleDelete(order._id)} className={button}>Delete</button>
                            <button onClick={() => { handleApprove(order._id) }} className={button}>Appreve</button>
                            <p className="text-green-500 mr-2">
                                {order.status}
                            </p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageOrder;