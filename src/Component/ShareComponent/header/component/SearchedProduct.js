import React from 'react'
import { Link } from 'react-router-dom';

const SearchedProduct = ({ searchedProduct,setShowSearchProduct }) => {
    return (
        <div
            onMouseLeave={() => setShowSearchProduct(false)}
            className='searched-product-wrapper'>
            {searchedProduct?.length ?
                searchedProduct?.map(product => {
                    return (
                        <div className='searched-product'>
                            <img
                                className='w-10 h-10'
                                src={product.productImg.imgUrl} alt=""
                            />
                            <div className='col-span-3 text-left'>
                                <Link to={`/products/${product._id}`}>
                                    {product.name}
                                </Link>
                            </div>
                        </div>
                    )
                }) :
                <p className='py-2'>No product found</p>
            }
        </div>
    );
}

export default SearchedProduct