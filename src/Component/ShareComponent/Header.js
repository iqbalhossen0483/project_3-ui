import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Anchor from '../../utilitize/Anchor';
import useFirebase from '../Hook/useFirebase';
import useFunc from '../Hook/useFunc';
import CartProduct from './CartProduct';
import UserInfo from './UserInfo';

const Header = () => {
    const [menu, setMenu] = useState(true);
    const { addedProduct } = useFunc();
    const {
        user,
        hideUserInfo,
        setHideUserInfo,
        showCart,
        setShowCart
    } = useFirebase();

    const toggleShow = () => {
        if (hideUserInfo) {
            setHideUserInfo(false);
        }
        else {
            setHideUserInfo(true);
        }
    };

    const handleMenu = () => {
        if (menu) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }
    useEffect(() => {
        if (window.innerWidth < 480) {
            setMenu(false);
        } else {
            setMenu(true);
        }
    }, []);

    
    return (
        <>
            <div className='header-container header-bg'>
                <i onClick={handleMenu} className="fas fa-bars"></i>
                <div className='flex items-center'>
                    {
                        user.email && <div className="text-xl mx-2">
                            <i
                                onMouseEnter={() => { setShowCart(true) }}
                                className="fas fa-shopping-cart">
                            </i>
                            <span className="text-purple-900 font-semibold ml-1">
                                {addedProduct?.length}
                            </span>
                        </div>
                    }
                    {
                        user.email &&
                        <img onClick={toggleShow} 
                        className="w-10 h-10 rounded-full ml-2" 
                            src={user.imgUrl ?
                                user.imgUrl :
                                user.photoURL ?
                                    user.photoURL :
                                    "https://res.cloudinary.com/dpphyosn4/image/upload/v1642742699/cycle-mart/users/nophoto_elhi6z.png"} alt="" 
                        />
                    }
                </div>
            </div>
            <div className={`${!menu && "close"} header-menu`}>

                <div className='logo-wapper'>
                    <img
                        className='w-10 h-10'
                        src="https://i.ibb.co/ZYgSW6L/IMG-20220218-WA0000-removebg-preview.png"
                        alt=""
                    />
                    <Link to="/">
                        <span className='name'>CYCLE MART</span>
                    </Link>
                </div>

                <div className='top-contact'>
                    <div>
                        <i className="fas fa-phone icon"></i>
                        <span>+880 18386-40747</span>
                    </div>
                    <div>
                        <i className="fa fa-envelope icon" aria-hidden="true"></i>
                        <span>jpishahin07@gmail.com</span>
                    </div>
                    <div>
                        <i className="fa fa-map-marker icon" aria-hidden="true"></i>
                        <span>Level #7, Shop No: 721, Multiplan Center.</span>
                    </div>
                </div>

                <div className="menu-wrapper justify-end items-center">

                    <div className="link md:hidden gradient-text flex flex-col items-center justify-center mb-3 leading-6">
                        <i class="fa fa-home" aria-hidden="true"></i>
                        <Anchor to="/">Home</Anchor>
                    </div>
                    <div className="link gradient-text flex flex-col items-center justify-center leading-6">
                        <i class="fa fa-shopping-bag" aria-hidden="true"></i>
                        <Anchor to="/shop">Shop</Anchor>
                    </div>

                    <div className="link gradient-text flex flex-col items-center justify-center mx-3 my-3 md:my-0 leading-4">
                        <i class="fa fa-user" aria-hidden="true"></i>
                        <Anchor to="/my-account/profile">Account</Anchor>
                    </div>

                    <div className='hidden md:flex justify-center items-center'>
                        {
                            user.email && <div
                                className="gradient-text flex flex-col items-center leading-4 cursor-pointer text-xl mx-3">
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
                    {!user?.email && <>
                        <Anchor to='/log-in'>LogIn/ SignUp</Anchor>
                    </>}
                </div>
                
                {/* user info  */}
                {hideUserInfo && <UserInfo />}
                {showCart && addedProduct?.length > 0 && <CartProduct />}
            </div>
        </>
    );
};

export default Header;