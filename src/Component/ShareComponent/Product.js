import React from 'react';
import { Link } from 'react-router-dom';
import useTailwind from '../TailwindCss/useTailwind';

const Product = (props) => {
    const { img, name, description, _id } = props.product;
    const { product, button } = useTailwind();
    return (
        <div className={product}>
            <img style={{ borderRadius: "5px" }} src={img} alt="" />
            <p className="text-2xl text-center font-semibold mb-2">{name}</p>
            <p className="text-justify px-3">{description.slice(0, 150)}</p>
            <div className="flex justify-center my-3">
                <Link to={`/place-order/${_id}`}>
                    <button className={button}>Buy now</button>
                </Link>
            </div>
        </div>
    );
};

export default Product;