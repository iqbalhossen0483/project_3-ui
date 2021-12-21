import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useAlert } from 'react-alert'

const UpdateProduct = ({ hideForm, product, setProduct }) => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();

    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct]);

    const onSubmit = newProduct => {
        newProduct.img = newProduct.img || product.img;
        newProduct.name = newProduct.name || product.name;
        newProduct.category = newProduct.category || product.category;
        newProduct.price = newProduct.price || product.price;
        newProduct.stock = newProduct.stock || product.stock;
        newProduct.vendor = newProduct.vendor || product.vendor;
        newProduct.type = newProduct.type || product.type;
        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert.show("This Product was updated");
                    reset();
                    hideForm(false);
                }
            })
    }
    return (
        <div onClick={() => hideForm(false)} className="absolute top-0 left-0 w-full h-full background">
            <div className="h-screen w-full flex justify-center items-center ">
                <form onClick={e => e.stopPropagation()} className="container" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="header">Update Product</h3>
                    <input className="input" {...register("img")} placeholder="Enter a img url" />
                    <input className="input" {...register("name")} placeholder="Enter the name" />
                    <input className="input" {...register("category")} placeholder="Enter the category" />
                    <input type="number" className="input" {...register("price")} placeholder="Enter price" />
                    <input type="number" className="input" {...register("stock")} placeholder="Enter stock" />
                    <input type="text" className="input" {...register("vendor")} placeholder="Enter vendor name" />
                    <input type="text" className="input" {...register("type")} placeholder="Enter the type of cycle" />
                    <input className="button" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;