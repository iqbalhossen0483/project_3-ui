import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useTailwind from '../../TailwindCss/useTailwind';
import UpdateProduct from './UpdateProduct';

const ManageProduct = () => {
    const [products, setProduct] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const [showUpdateForm, setUpdateForm] = useState(false);
    const { button } = useTailwind();
    // get data 
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [singleProduct]);
    // delete data 
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete");
        if (confirm) {
            fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert("delete successfull");
                        const newProducts = products.filter(product => product._id !== id);
                        setProduct(newProducts)

                    }
                })
        }
    }
    return (
        <div className="mx-5 bg-white my-10 text-center rounded-md relative">
            <div className="grid grid-cols-5 gap-3 border-b py-3">
                <p>Images</p>
                <p>Name</p>
                <p>Price</p>
                <p>Stock</p>
                <p></p>
            </div>
            <div>
                {
                    products.map(product => <div
                        key={product._id}
                        className="grid grid-cols-5 gap-3 border-b py-3 items-center">
                        <img className="w-full h-32" src={product.img} alt="" />
                        <p>{product.name}</p>
                        <p>{product.price}</p>
                        <p>{product.stock}</p>
                        <div>
                            <button onClick={() => handleDelete(product._id)} className={button}>Delete</button>
                            <Link to={product._id}>
                                <button onClick={() => setUpdateForm(true)} className={button}>Update</button>
                            </Link>
                        </div>
                    </div>)
                }
            </div>
            {showUpdateForm && <UpdateProduct
                hideForm={setUpdateForm}
                product={singleProduct}
                setProduct={setSingleProduct}
            />}
        </div>
    );
};

export default ManageProduct;