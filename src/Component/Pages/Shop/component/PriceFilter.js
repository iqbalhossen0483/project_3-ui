import React from 'react'

const PriceFilter = (props) => {
    const {
        showProductsByPriceRange,
        handleReset,
        handlePriceRange
    } = props;

    return (
        <div className="mt-5 lg:text-xl">
            <h2 className="side-menu">Price</h2>
            <form
                onSubmit={(e) => { showProductsByPriceRange(e) }}
                onReset={handleReset}
                className="mt-4">
                <div className="grid grid-cols-custom">
                    <p>From:</p>
                    <input
                        onBlur={(e) => { handlePriceRange(e, "from") }}
                        className="input rounded-xl w-full"
                        type="number"
                    />
                    <p>Till:</p>
                    <input
                        onBlur={(e) => { handlePriceRange(e, "till") }}
                        className="input rounded-xl w-full"
                        type="number"
                    />
                </div>
                <div className="flex">
                    <input type="submit" className="button"
                    />
                    <input type="reset" className="button" />
                </div>
            </form>
        </div>
    );
}

export default PriceFilter