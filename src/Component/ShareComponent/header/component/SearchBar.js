import { DebounceInput } from 'react-debounce-input';
import SearchedProduct from './SearchedProduct';
import React, { useState } from 'react'

const SearchBar = () => {
    const [showSearchProduct, setShowSearchProduct] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState([]);

    function handleSearchText(searchText) {
        const text = searchText;
        if (!text) return;
        fetch(`https://cyclemart.herokuapp.com/products/searchProduct/${text}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    setSearchedProduct(data);
                    console.log(data);
                }
                else {
                    setSearchedProduct([]);
                }
            });
    };
    
    return (
        <div className='col-span-2'>
            <div className=' w-full md:w-3/4 md:ml-auto relative'>
                <DebounceInput
                    type="text"
                    className="input search-input"
                    placeholder='Search Product...'
                    minLength={2}
                    debounceTimeout={500}
                    onMouseEnter={() => setShowSearchProduct(true)}
                    onChange={e => handleSearchText(e.target.value)}
                />
                <i className="fa fa-search hidden md:block" aria-hidden="true"></i>
                {showSearchProduct &&
                    <SearchedProduct
                        searchedProduct={searchedProduct}
                        setShowSearchProduct={setShowSearchProduct}
                    />
                }
            </div>
        </div>
    );
}

export default SearchBar