import { useEffect } from "react";
import { useState } from "react";
import useFirebase from "../Component/Hook/useFirebase";

const SharedFunction = () => {
    const [addedProduct, setAddedProduct] = useState([]);
    const [customer, setCustomer] = useState({});
    const { user } = useFirebase();
    const gettoken = localStorage.getItem("token");
    const token = JSON.parse(gettoken);

    useEffect(() => {
        if (user.email && token) {
            fetch(`https://cycle-mart.herokuapp.com/users/${user.email}`, {
                headers: {
                    "authorization": token
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAddedProduct(data.cart);
                    setCustomer(data)
                })
        }
    }, [user, token])

    return {
        addedProduct,
        setAddedProduct,
        customer
    }
};

export default SharedFunction;