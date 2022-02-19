import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAlert } from 'react-alert';
import useFunc from '../../../Hook/useFunc';

function Category() {
    const [form, setShowForm] = useState(false);
    const [categoryMenus, setCategoryMenus] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const alart = useAlert();
    const { userToken } = useFunc();

    useEffect(() => {
        fetch("https://cyclemart.herokuapp.com/menus", {
            headers: {
                "authorization": userToken()
            }
        })
            .then(res => res.json())
            .then(data => setCategoryMenus(data))
    }, [categoryMenus, userToken])

    const onSubmit = menu => {
        fetch("https://cyclemart.herokuapp.com/menus", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": userToken()
            },
            body: JSON.stringify(menu)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    reset();
                    setShowForm(false);
                    alart.show("menu added");
                }
            })
    }

    const deletMenu = (id) => {
        fetch(`https://cyclemart.herokuapp.com/menus/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": userToken()
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    alart.show("menu deleted")
                    const menus = categoryMenus.filter(menu => menu.name !== id);
                    setCategoryMenus(menus);
                }
            })
    }

    const showForm = (e) => {
        e.stopPropagation();
        setShowForm(true);
    }
    return (
        <div onClick={() => { setShowForm(false)}} className='border rounded-md pb-10 text-center relative'>
            <div
                className='bg-green-500 sticky top-0 rounded-t text-gray-200 flex justify-evenly'>
                <p className='text-2xl font-semibold pb-2'>
                    Category Menus
                </p>
                <button
                    onClick={(e) => showForm(e)}>
                    Add+
                </button>

                <form
                    onClick={e=>{e.stopPropagation()}}
                    className={`${form ? "block" : "hidden"}`}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='customize-form w-full'>
                        <input
                            className='input w-full'
                            {...register("name", { required: true })}
                            placeholder="Enter category name"
                        />
                        <input
                            className='input w-full'
                            {...register("icon", { required: true })}
                            placeholder='Icon'
                        />
                        <button type='submit'>Ok</button>
                    </div>
                </form>
            </div>


            {
                categoryMenus.map((menu, index) => <div
                    key={index}
                    className='customize-category-menu px-5'>
                    <p>{menu.name}</p>
                    <i
                        onClick={() => { deletMenu(menu._id) }}
                        className="fas fa-trash-alt customize-delete-icon">
                    </i>
                </div>)
            }
        </div>
    );
}

export default Category