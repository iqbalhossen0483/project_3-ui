import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useAlert } from 'react-alert'
import useFunc from '../../Hook/useFunc';

const UpdateProduct = ({ hideForm, product, setProduct }) => {
    const { id } = useParams();
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert();
    const { userToken } = useFunc();

    useEffect(() => {
        fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, setProduct]);

    const onSubmit = newProduct => {
        console.log(newProduct)

        fetch("https://cycle-mart.herokuapp.com/products", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "authorization": userToken()
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert.show("This Product was updated");
                    reset();
                    hideForm(false);
                } else {
                    alert.show("You did't update any field");
                    hideForm(false)
                }
            })
            .catch(err => alert.show(err.message))
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
                            {...register("img")}
                            defaultValue={product.img}
                            placeholder="Enter a img url"
                        />
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