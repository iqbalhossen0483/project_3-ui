import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Menus = () => {
    const [categoryMenus, setCategoryMenus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/menus")
            .then(res => res.json())
            .then(data => setCategoryMenus(data))
    }, []);

    return (
        <div className="category-menu-wrapper px-7">
            <h2 className="text-2xl border-b-2 pb-1 text-center">
                Popular Categories
            </h2>
            {
                categoryMenus.map(menu => <div
                    key={menu._id}
                    onClick={() => {
                        navigate(`/shop/${menu
                            .name
                            .replace(" ", "-")}`)
                    }}
                    className="category-menu relative">
                    <p>{menu.name}</p>
                    <div className='sub-menus'>
                        {
                            menu.subMenus?.map(item => <p className='px-3'>{item}</p>)
                        }
                    </div>
                </div>)
            }
        </div>
    );
};

export default Menus;