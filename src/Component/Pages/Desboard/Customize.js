import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import useFunc from '../../Hook/useFunc';

const Customize = () => {
    const [form, setShowForm] = useState(false);
    const [categoryMenus, setCategoryMenus] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const alart = useAlert();
    const { userToken } = useFunc();

    useEffect(() => {
        fetch("https://cycle-mart.herokuapp.com/menus", {
            headers: {
                "authorization": userToken()
            }
        })
            .then(res => res.json())
            .then(data => setCategoryMenus(data))
    }, [categoryMenus, userToken])

    const onSubmit = menu => {
        fetch("https://cycle-mart.herokuapp.com/menus", {
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
        fetch(`https://cycle-mart.herokuapp.com/menus/${id}`, {
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
        <div
            className='bg-white m-5 p-5 rounded-md grid grid-cols-3 gap-5 h-full'>
            <div className='border rounded-md px-5 py-3 text-center relative'>
                <p className='text-2xl font-semibold border-b pb-2'>Category Menus</p>
                {
                    categoryMenus.map(menu => <div
                        className='customize-category-menu'>
                        <p>{menu.name}</p>
                        <i
                            onClick={() => { deletMenu(menu._id) }}
                            class="fas fa-trash-alt customize-delete-icon">
                        </i>
                    </div>)
                }
                <form
                    className={`${form ? "block" : "hidden"}`}
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className='customize-form'>
                        <input
                            className='input w-full'
                            {...register("name", { required: true })}
                            placeholder='Category name'
                        />
                        <input
                            className='input w-full'
                            {...register("icon", { required: true })}
                            placeholder='icon'
                        />
                        <button type='submit'>Ok</button>
                    </div>
                </form>
                <button
                    onClick={(e) => showForm(e)}
                    style={{ position: "absolute" }}
                    className='absolute bottom-3 right-3'>
                    Add+
                </button>
            </div>
        </div>
    );
};

export default Customize;