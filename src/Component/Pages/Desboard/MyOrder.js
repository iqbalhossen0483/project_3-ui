import React, { useEffect, useState } from 'react';
import useAuth from '../../Hook/useAuth';
import Orders from './Orders';

const MyOrder = () => {
    const [orders, setOrder] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const { user } = useAuth();
    useEffect(() => {
        fetch(`http://localhost:5000/orders/${user.email}`)
            .then(res => res.json())
            .then(data => {
                setOrder(data);
                setIsloading(false);
            })
    }, [user.email]);

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
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