import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import useTailwind from '../../TailwindCss/useTailwind';

const MyOrder = () => {
    const [orders, setOrder] = useState([]);
    const { user } = useAuth();
    const { button } = useTailwind();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => {
                const find = data.filter(order => order.email === user.email);
                setOrder(find);
            })
    }, [user.email]);

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
        <div>
            {orders.length ? <>
                <div className="mx-3 md:mx-5 bg-white my-10 text-center rounded-md">
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
                                    ${order.date}`}
                                </p>
                                <div>
                                    <button onClick={() => handleDelete(order._id)} className={button}>Delete</button>
                                    <p className="text-green-500 mr-2">
                                        {order.status}
                                    </p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </> :
                <div className="text-2xl flex justify-center items-center mt-8">
                    <p>you didn't any order place</p>
                </div>
            }
        </div>
    );
};

export default MyOrder;