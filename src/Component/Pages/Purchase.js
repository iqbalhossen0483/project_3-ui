import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const Purchase = () => {
    const [singleProduct, setSingleProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, setAddedProduct, quantity } = useAuth();
    const { formHeader, form, input } = useTailwind();

    const name = user.displayName;
    const email = user.email;
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: name,
            email: email
        }
    });

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, []);

    useEffect(() => {
        if (id.startsWith("&&")) {
            const allId = id.split("&&");
            const sliced = allId.slice(1, allId.length);
            const newCartProducts = [];
            for (const id of sliced) {
                const cartProduct = products.find(product => product._id === id);
                newCartProducts.push(cartProduct);
            }
            setOrders(newCartProducts);
        }
        else {
            fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
                .then(res => res.json())
                .then(data => setSingleProduct([data]))
        }
    }, [id, products]);

    const onSubmit = order => {
        order.date = new Date().toLocaleDateString("en-us");
        order.status = "pending";
        if (singleProduct.length) {
            let newSingle = [];
            singleProduct.map(product => {
                const single = product;
                single.quantity = quantity;
                return newSingle.push(single);
            });
            order.products = newSingle;
        }
        else {
            order.products = orders;
        }

        fetch("https://cycle-mart.herokuapp.com/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Your order created successfully");
                    reset();
                    navigate("/")
                    setAddedProduct([]);
                }
            })
    };
    return (
        <div className="grid grid-cols-2">
            <div className={form}>
                <h1 className={formHeader}>Order Summary</h1>
                {singleProduct.length &&
                    singleProduct.map(product => <div
                        className="grid grid-cols-2 text-xl"
                        key={product._id}>
                        <div className="col-span-2 flex justify-center">
                            <img className="w-36 h-32" src={product.img} alt="" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">Product Name: </p>
                            <hr className="mb-3 mt-1" />
                            <p>Product Price:</p>
                            <p>Product Quantity:</p>
                            <p>Sub-total: </p>
                            <p>Shipping Cost:</p>
                            <hr className="mt-2" />
                            <p>Total:</p>
                        </div>
                        <div>
                            <p className="text-2xl font-semibold">{product.name}</p>
                            <hr className="mb-3 mt-1" />
                            <p>{product.price}</p>
                            <p>{quantity}</p>
                            <p>{quantity * product.price}</p>
                            <p>100</p>
                            <hr className="mt-2" />
                            <p>{quantity * product.price + 100}</p>
                        </div>
                    </div>)
                }
            </div>
            <div>
                <form className={form} onSubmit={handleSubmit(onSubmit)}>
                    <h3 className={formHeader}>Place Order</h3>
                    <input className={input} disabled {...register("name", { required: true })} placeholder="Enter name" />
                    <input type="email" disabled className={input} {...register("email", { required: true })} placeholder="Enter email" />
                    <input className={input} {...register("division", { required: true })} placeholder="Enter division" />
                    <input className={input} {...register("district", { required: true })} placeholder="Enter district" />
                    <input className={input} {...register("ps", { required: true })} placeholder="Enter police station" />
                    <input className={input} {...register("road", { required: true })} placeholder="Enter road name" />
                    <input type="number" className={input} {...register("number", { required: true })} placeholder="Enter your number" />
                    <input className="button w-auto text-center" type="submit" value="Place order" />
                </form>
            </div>
        </div>
    );
};

export default Purchase;