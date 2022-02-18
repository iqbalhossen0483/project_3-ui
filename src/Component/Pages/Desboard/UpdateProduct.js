import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useAlert } from 'react-alert'
import useFunc from '../../Hook/useFunc';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [oneProductUpdate, setOneProductUpdate] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [product, setProduct] = useState({});
    const { userToken } = useFunc();
    const navigate = useNavigate();
    const { id } = useParams();
    const alert = useAlert();

    useEffect(() => {
        fetch(`https://cyclemart.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, oneProductUpdate]);

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

        formData.append("img", newProduct.img[0]);
        const gallery = Array.from(newProduct.gallery);
        gallery.map(img => {
            formData.append("gallery", img);
        });

        if (gallery.length > 3) {
            return alert.show("Gallery image should not be more than 3");
        };

        if (!product.imgGallery?.length && !newProduct.gallery?.length) {
            return alert.show("Gallery image is recommanded")
        }

        //existing images
        if (product.productImg && newProduct.img[0]) {
            formData.append("productImgId", product.productImg.imgId);
        }
        if (product.imgGallery?.length && newProduct.gallery?.length) {
            formData.append("Gallery", product.imgGallery);
        }

        fetch("https://cyclemart.herokuapp.com/products", {
            method: "PUT",
            headers: {
                "authorization": userToken()
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert.show("This Product was updated");
                    if (oneProductUpdate) {
                        setOneProductUpdate(false);
                    }
                    else {
                        setOneProductUpdate(true);
                    }
                    reset();
                    navigate("/desboard/manage-product");
                } else {
                    alert.show("You didn't update any field");
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
                        <label className='text-xl my-2 block'>
                        Main image: 
                        <input
                        className='text-sm ml-2'
                            {...register("img")}
                            type="file"
                        />
                        </label>
                        <label className='text-xl my-2 block'>
                            Gallery images: 
                            <input
                            className='text-sm ml-2'
                                {...register("gallery")}
                                multiple
                                type="file"
                            />
                        </label>
                    </div>
                    <textarea
                        className="input text-justify"
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