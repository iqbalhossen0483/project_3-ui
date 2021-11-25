import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import Orders from './Orders';

const MyOrder = () => {
    const [orders, setOrder] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/orders")
            .then(res => res.json())
            .then(data => {
                const find = data.filter(order => order.email === user.email);
                setOrder(find);
            })
    }, [user.email]);
    return (
        <div>
            {orders.length ? <>
                <div className="mx-3 md:mx-5 bg-white my-10 text-center rounded-md">
                    <div className="grid grid-cols-4 gap-3 border-b py-3">
                        <p>Product details</p>
                        <p>Product images</p>
                        <p>Cutomer details</p>
                        <p></p>
                    </div>
                    <div>
                        {
                            orders.map(order => <Orders
                                key={order._id}
                                order={order}
                                orders={orders}
                                setOrder={setOrder}
                            />)
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