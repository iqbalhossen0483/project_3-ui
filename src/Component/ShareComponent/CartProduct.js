import React, { useEffect, useState } from 'react';
import useAuth from '../Hook/useAuth';
import useTailwind from '../TailwindCss/useTailwind';

const CartProduct = () => {
    const { addedProduct, setShowCart } = useAuth();
    const [products, setProduct] = useState([])
    const [carts, setCart] = useState([]);
    const { button } = useTailwind();
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })

        const cartProducts = [];
        for (const id of addedProduct) {
            const findCartProduct = products.find(product => product._id === id);
            cartProducts.push(findCartProduct);
        }
        setCart(cartProducts);
    }, [addedProduct, products]);

    return (
        <div
            onMouseEnter={() => setShowCart(true)}
            onMouseLeave={() => setShowCart(false)}
            className="absolute top-full right-5 bg-white shadow-md z-10">
            {products &&
                carts.map(product => <div
                    key={product?._id}
                    className="grid grid-cols-2 items-center text-center">
                    <img className="w-32" src={product?.img} alt="" />
                    <p className="text-xl">{product?.name}</p>
                    < hr className="col-span-2" />
                </div>)
            }
            <div className="col-span-2 text-center mt-3">
                <button className={button}>View cart</button>
            </div>
        </div>
    );
};

export default CartProduct;