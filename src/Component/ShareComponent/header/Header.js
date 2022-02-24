import React, { useEffect, useState } from 'react';
import useFirebase from '../../Hook/useFirebase';
import useFunc from '../../Hook/useFunc';
import CartProduct from '../CartProduct';
import UserInfo from '../UserInfo';
import Logo from './component/Logo';
import MobileView from './component/MobileView';
import SearchBar from './component/SearchBar';
import TopContact from './component/TopContact';
import TopMenus from './component/TopMenus';

const Header = () => {
    const [menu, setMenu] = useState(true);
    const { addedProduct } = useFunc();
    const {
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
            {/* mobile views */}
            <MobileView
                handleMenu={handleMenu}
                toggleShow={toggleShow}
            />
            <div className={`${!menu && "close"} header-menu`}>
                {/* logo section */}
                <Logo />

                {/* top contact info */}
                <TopContact />

                {/* search bar */}
                <div className='hidden md:block col-span-2'>
                    <SearchBar />
                </div>

                {/* menus */}
                <TopMenus
                    setShowCart={setShowCart}
                    toggleShow={toggleShow}
                />
                
                {/* user info  */}
                {hideUserInfo && <UserInfo />}
                {showCart && addedProduct?.length > 0 && <CartProduct />}
            </div>
        </>
    );
};

export default Header;