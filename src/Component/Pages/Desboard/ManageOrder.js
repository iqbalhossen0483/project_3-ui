import React, { useEffect, useState } from 'react';
import useTailwind from '../../TailwindCss/useTailwind';
import Orders from './Orders';

const ManageOrder = () => {
    const [orders, setOrder] = useState([]);
    const [reload, setReload] = useState(false);
    const { button } = useTailwind();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [reload]);

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
                    alert("Order Approved");
                    if (reload) {
                        setReload(false);
                    }
                    else {
                        setReload(true);
                    }
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
                <p>Product details</p>
                <p>Product images</p>
                <p>Customer details</p>
                <p></p>
            </div>
            <div>
                {
                    orders.map(order => <Orders key={order._id} order={order} handleDelete={handleDelete} >
                        <button onClick={() => { handleApprove(order._id) }} className={button}>Approve</button>
                    </Orders>)
                }
            </div>
        </div>
    );
};

export default ManageOrder;