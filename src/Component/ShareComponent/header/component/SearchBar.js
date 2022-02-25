import React, { useState } from 'react'
import { DebounceInput } from 'react-debounce-input';
import SearchedProduct from './SearchedProduct';

const SearchBar = () => {
    const [showSearchProduct, setShowSearchProduct] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [searchText, setSearchText] = useState("");

    if (searchText && showSearchProduct) {
        fetch(`https://cyclemart.herokuapp.com/products/searchProduct/${searchText}`)
            .then(res => res.json())
            .then(data => {
                if (data.length) {
                    setSearchedProduct(data);
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
                    onFocus={() => setShowSearchProduct(true)}
                    placeholder='Search Product...'
                    minLength={2}
                    debounceTimeout={500}
                    onChange={e => setSearchText(e.target.value)}
                />
                <i class="fa fa-search hidden md:block" aria-hidden="true"></i>
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