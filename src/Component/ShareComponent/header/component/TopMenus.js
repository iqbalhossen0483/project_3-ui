import useFirebase from '../../../Hook/useFirebase';
import Anchor from '../../../../utilitize/Anchor';
import useFunc from '../../../Hook/useFunc';
import React from 'react'

const TopMenus = ({setShowCart, toggleShow}) => {
    const { addedProduct } = useFunc();
    const { user } = useFirebase();

    return (
        <div className="menu-wrapper justify-end items-center">

            <div className="link md:hidden gradient-text flex flex-col items-center justify-center mb-3 leading-6">
                <i className="fa fa-home" aria-hidden="true"></i>
                <Anchor to="/">Home</Anchor>
            </div>
            <div className="link gradient-text flex flex-col items-center justify-center mx-2 leading-6">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <Anchor to="/shop">Shop</Anchor>
            </div>

            <div className="link gradient-text flex flex-col items-center justify-center mx-2 my-3 md:my-0 leading-4">
                <i className="fa fa-user" aria-hidden="true"></i>
                <Anchor to="/my-account/profile">Account</Anchor>
            </div>

            <div className='hidden md:flex justify-center items-center'>
                {
                    user.email && <div
                        className="gradient-text flex flex-col items-center leading-4 cursor-pointer text-xl mx-2">
                        <div>
                            <i
                                onMouseEnter={() => { setShowCart(true) }}
                                className="fas fa-shopping-cart">
                            </i>
                            <span className="text-purple-900 font-semibold ml-1">
                                {addedProduct?.length}
                            </span>
                        </div>
                        <span>View Cart</span>
                    </div>
                }
                {
                    user.email &&
                    <img
                        onClick={toggleShow}
                        className="w-10 h-10 rounded-full ml-2"
                        src={user.imgUrl ?
                            user.imgUrl :
                            user.photoURL ?
                                user.photoURL :
                                "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"} alt=""
                    />
                }
                        
            </div>
            {!user?.email &&
                <div className="link gradient-text flex flex-col items-center justify-center mx-3 my-3 md:my-0 leading-4">
                    <i className="fa fa-registered" aria-hidden="true"></i>
                    <Anchor to='/log-in'>LogIn/ SignUp</Anchor>
                </div>
            }
        </div>
    );
}

export default TopMenus