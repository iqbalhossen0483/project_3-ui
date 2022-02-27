import React from 'react'

const Sellers = ({ handleSellers, setSeller }) => {
    
    return (
        <div className="lg:text-xl leading-8">
            <h2 className="side-menu">Sellers</h2>
            <form>
                <p className="flex items-center">
                    <input
                        onClick={(e) => { handleSellers(e) }}
                        type="checkbox"
                        name="Rakib"
                    />
                    <p className="ml-2">Rakib</p>
                </p>
                <p className="flex items-center">
                    <input
                        onClick={(e) => { handleSellers(e) }}
                        type="checkbox" name="Rakib-Enterprise"
                    />
                    <p className="ml-2">Rakib-Enterprise</p>
                </p>
                <input type="reset" onClick={() => { setSeller("") }} className="button" />
            </form>
        </div>
    );
}

export default Sellers