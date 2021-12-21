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
        newProduct.description = newProduct.description || product.description;
        newProduct.price = newProduct.price || product.price;
        newProduct.stock = newProduct.stock || product.stock;
        newProduct.type = newProduct.type || product.type;
        newProduct.vendor = newProduct.vendor || product.vendor;
        newProduct.category = newProduct.category || product.category;

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
        <div
            style={{ position: "absolute" }}
            onClick={() => hideForm(false)}
            className="absolute top-0 left-0 w-full h-full background">
            <div className="h-screen w-full flex justify-center items-center ">
                <form
                    onClick={e => e.stopPropagation()}
                    className="container lg:w-11/12 lg:grid grid-cols-2 gap-5"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="header col-span-2">Update Product</h3>
                    <div>
                        <input
                            className="input w-full"
                            {...register("img", { required: true })}
                            defaultValue={product.img}
                            placeholder="Enter a img url"
                        />
                        <input
                            className="input w-full"
                            {...register("name", { required: true })}
                            defaultValue={product.name}
                            placeholder="Enter the name"
                        />
                        <input
                            className="input w-full"
                            {...register("category", { required: true })}
                            defaultValue={product.category}
                            placeholder="Enter the category"
                        />
                        <input
                            className="input w-full"
                            {...register("price", { required: true })}
                            defaultValue={product.price}
                            placeholder="Enter the price"
                        />
                        <input
                            className="input w-full"
                            {...register("stock", { required: true })}
                            defaultValue={product.stock}
                            placeholder="Enter the stock"
                        />
                        <input
                            className="input w-full"
                            {...register("vendor", { required: true })}
                            defaultValue={product.vendor}
                            placeholder="Enter the vendor name"
                        />
                        <input
                            className="input w-full"
                            {...register("type", { required: true })}
                            defaultValue={product.type}
                            placeholder="Enter the type of cycle"
                        />
                    </div>
                    <textarea
                        className="input"
                        rows={10}
                        {...register("description", { required: true })}
                        defaultValue={product.description}
                        placeholder="Enter short description"
                    />
                    <div className='col-span-2 flex justify-center'>
                        <input className="button w-52" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;