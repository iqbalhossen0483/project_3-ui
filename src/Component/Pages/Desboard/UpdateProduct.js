import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useAlert } from 'react-alert'
import useFunc from '../../Hook/useFunc';

const UpdateProduct = () => {
    const [product, setProduct] = useState({});
    const [done, setDone] = useState(false);
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const { userToken } = useFunc();

    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, done]);

    const onSubmit = newProduct => {
        const formData = new FormData();
        formData.append("id", product._id);
        formData.append("name", newProduct.name || product.name);
        formData.append("category", newProduct.category || product.category);
        formData.append("price", newProduct.price || product.price);
        formData.append("stock", newProduct.stock || product.stock);
        formData.append("vendor", newProduct.vendor || product.vendor);
        formData.append("type", newProduct.type || product.type);
        formData.append("description", newProduct.description || product.description);
        formData.append("existImg", product.imgId);
        formData.append("img", newProduct.img[0]);

        if (product.imgId && newProduct.img.length === 0) {
            formData.append("imgId", product.imgId);
            formData.append("imgUrl", product.imgurl);
        }
        if (!product.imgId && newProduct.img.length === 0) {
            return alert.show("An image is recommanded")
        }

        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "PUT",
            headers: {
                "authorization": userToken()
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert.show("This Product was updated");
                    reset();
                } else {
                    alert.show("You didn't update any field");
                    if (done) return setDone(false);
                    return setDone(true);
                }
            })
            .catch(err => alert.show(err.message))
    }
    return (
        <div>
            <div className="flex justify-center items-center ">
                <form
                    onClick={e => e.stopPropagation()}
                    className="container lg:w-11/12 lg:grid grid-cols-2 gap-5"
                    onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="header col-span-2">Update Product</h3>
                    <div>
                        <input
                            className="input w-full"
                            {...register("name")}
                            defaultValue={product.name}
                            placeholder="Enter the name"
                        />
                        <input
                            className="input w-full"
                            {...register("category")}
                            defaultValue={product.category}
                            placeholder="Enter the category"
                        />
                        <input
                            className="input w-full"
                            {...register("price")}
                            defaultValue={product.price}
                            placeholder="Enter the price"
                        />
                        <input
                            className="input w-full"
                            {...register("stock")}
                            defaultValue={product.stock}
                            placeholder="Enter the stock"
                        />
                        <input
                            className="input w-full"
                            {...register("vendor")}
                            defaultValue={product.vendor}
                            placeholder="Enter the vendor name"
                        />
                        <input
                            className="input w-full"
                            {...register("type")}
                            defaultValue={product.type}
                            placeholder="Enter the type of cycle"
                        />
                        <input
                            className="input w-full"
                            {...register("img")}
                            type="file"
                            defaultValue={product.img}
                            placeholder="Enter a img url"
                        />
                    </div>
                    <textarea
                        className="input"
                        rows={10}
                        {...register("description")}
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