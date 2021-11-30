import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import { useAlert } from 'react-alert'

const ManageProduct = () => {
    const [products, setProduct] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const [showUpdateForm, setUpdateForm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const alert = useAlert();

    // get data 
    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/products")
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false);
            })
    }, [singleProduct]);

    // delete data 
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure to delete");
        if (confirm) {
            fetch(`https://cycle-mart.herokuapp.com/products/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert.show("delete successfull");
                        const newProducts = products.filter(product => product._id !== id);
                        setProduct(newProducts)

                    }
                })
        }
    }

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center">
            <div className="spinner"></div>
        </div>
    }
    return (
        <div className="mx-5 bg-white my-10 text-center rounded-md relative">
            <div className="grid grid-cols-5 gap-3 border-b py-3 z-0">
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
                            <button onClick={() => handleDelete(product._id)} className="button">Delete</button>
                            <Link to={product._id}>
                                <button onClick={() => setUpdateForm(true)} className="button">Update</button>
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