import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useFunc from '../../Hook/useFunc';

const Menus = () => {
    const navigate = useNavigate();
    const [categoryMenus, setCategoryMenus] = useState([]);
    const { userToken } = useFunc();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/menus", {
            headers: {
                "authorization": userToken()
            }
        })
            .then(res => res.json())
            .then(data => setCategoryMenus(data))
    }, [userToken]);

    return (
        <div className="py-5 px-4 text-xl leading-10 border-r h-full">
            <h2 className="text-2xl border-b-2 pb-1">Popular Categories</h2>
            {
                categoryMenus.map(menu => <div
                    onClick={() => { navigate(`/shop/${menu.name.replace(" ", "-")}`) }}
                    className="hover:text-green-500 hover:underline cursor-pointer">
                    <span className='mr-3'><i className={menu.icon}></i></span>
                    <span>{menu.name}</span>
                </div>)
            }
        </div>
    );
};

export default Menus;