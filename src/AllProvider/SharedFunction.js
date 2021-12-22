import { useEffect } from "react";
import { useState } from "react";
import useFirebase from "../Component/Hook/useFirebase";

const SharedFunction = () => {
    const [addedProduct, setAddedProduct] = useState([]);
    const { user } = useFirebase();
    const gettoken = localStorage.getItem("token");
    const token = JSON.parse(gettoken);

    useEffect(() => {
        if (user.email && token) {
            fetch(`http://localhost:5000/users/${user.email}`, {
                headers: {
                    "authorization": token
                }
            })
                .then(res => res.json())
                .then(data => setAddedProduct(data.cart))
        }
    }, [user, token])

    return {
        addedProduct,
        setAddedProduct
    }
};

export default SharedFunction;