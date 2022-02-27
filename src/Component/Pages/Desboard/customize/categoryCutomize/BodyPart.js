import React, { useEffect, useState, useRef } from 'react'
import { useAlert } from 'react-alert';
import useFunc from '../../../../Hook/useFunc';
import controller from './controller';

const BodyPart = ({update, setUpdate}) => {
    const [subCategoryForm, setSubCategoryForm] = useState(false);
    const [categoryMenus, setCategoryMenus] = useState([]);
    const [menuId, setMenuId] = useState("");
    const { userToken } = useFunc();
    const categoryName = useRef("");
    const alart = useAlert();
    const {
        addSubMenus,
        deletCategoryMenu,
        deleteSubCategoryMenu
    } = controller();

    //load menus
    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/menus", {
            headers: {
                "authorization": userToken()
            }
        })
            .then(res => res.json())
            .then(data => {
                setCategoryMenus(data);
            })
    }, [update]);

    // add sub menus
    const onSubmit = (e) => {
        e.preventDefault();
        addSubMenus(categoryName, menuId, setSubCategoryForm, update, setUpdate, alart);
    };

    //delete menus
    const deletMenu = (id) => {
        deletCategoryMenu(id, userToken, alart, update, setUpdate);
    };

    //delete sub category menu
    function deleteSubCategory(menuId, subText) {
        const menus = { menuId, subText };
        deleteSubCategoryMenu(menus, alart, update, setUpdate);
    }

    //handle sub menu's form
    const showSubCategoryForm = (id) => {
        if (subCategoryForm) {
            setSubCategoryForm(false);
            setMenuId("");
        }
        else {
            setSubCategoryForm(true);
            setMenuId(id);
        }
    };

    return (
        <div className='relative'>
            {
                categoryMenus.map((menu, index) => <details
                    key={index}>
                    <summary className={`customize-category-menu px-5 ${menu.subMenus?.length && "subCategory" }`}>
                        <button
                            className='mr-auto'
                            onClick={() => showSubCategoryForm(menu._id)}>
                            {menu.name}
                        </button>
                        <i
                            onClick={() => { deletMenu(menu._id) }}
                            className="fas fa-trash-alt customize-delete-icon">
                        </i>
                    </summary>
                    {menu.subMenus &&
                        menu.subMenus.map(item => <div
                            className='border-b flex justify-between px-16 py-1'>
                            <p>{item}</p>
                            <i
                                onClick={() => deleteSubCategory(menu._id, item)}
                                className="fas fa-trash-alt"
                            />
                        </div>)
                    }
                </details>)
            }

            <form className={`${subCategoryForm ? "block" : "hidden"}`}
                onSubmit={(e) => onSubmit(e)}>
                <div className='add-subcategory z-40 w-full'>
                    <input
                        className='input w-full'
                        name='name'
                        ref={categoryName}
                        placeholder="Sub-category name"
                    />
                    <button type='submit'>Add +</button>
                </div>
            </form>
        </div>
    );
}

export default BodyPart;