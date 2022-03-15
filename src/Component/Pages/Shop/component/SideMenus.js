import Product from '../../../ShareComponent/prooduct/Product';
import PriceFilter from './PriceFilter';
import TypeFilter from './TypeFilter';
import Sellers from './Sellers';
import React from 'react'

const SideMenus = (props) => {
    const {
        handleSellers,
        setSeller,
        showProductsByPriceRange,
        handleReset,
        handlePriceRange,
        handleType,
        setType,
        randomProduct
    } = props;
    
    return (
        <div className="sidebar scrollbar">
            <Sellers
                handleSellers={handleSellers}
                setSeller={setSeller}
            />
            <PriceFilter
                showProductsByPriceRange={showProductsByPriceRange}
                handleReset={handleReset}
                handlePriceRange={handlePriceRange}
            />
            <TypeFilter
                handleType={handleType}
                setType={setType}
            />
            
            <div className="hidden lg:block text-xl leading-8 mt-5">
                <h2 className="side-menu">Best Products</h2>
                {
                    randomProduct.map(product => <Product
                        key={product._id}
                        product={product} />)
                }
            </div>
        </div>
    );
}

export default SideMenus