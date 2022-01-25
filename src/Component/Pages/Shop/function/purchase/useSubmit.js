import { useEffect, useState } from "react";
import useFirebase from "../../../../Hook/useFirebase";
import useFunc from "../../../../Hook/useFunc";

const useSubmit = () => {
    const [cashOnDelivary, setCashOnDelivary] = useState(false);
    const [sameAsBilling, setSameAsBilling] = useState(null);
    const [singleProduct, setSingleProduct] = useState([]);
    const [showPayment, setShowPayment] = useState(false);
    const [orderDetails, setOderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const { id } = useParams();
    const { addedProduct, customer } = useFunc();
    const { quantity } = useFirebase();


    //find triger products
    useEffect(() => {
        if (id.startsWith("&&")) {
            fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    let totalPrice = 0;
                    data.forEach(product => {
                        for (const cart of addedProduct) {
                            if (product._id === cart.id) {
                                return product.quantity = cart.quantity;
                            }
                        }
                    });
                    //set total price for lifting up and show payment page
                    data.forEach(product => totalPrice += product.price *product.   quantity);
                    setTotalPrice(totalPrice);
                    setOrders(data);
                    setIsLoading(false);
                })
        }
        else {
            fetch(`https://cycle-mart.herokuapp.com/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setTotalPrice(data.price * quantity);
                    setSingleProduct([data]);
                    setIsLoading(false);
                })
        }
    }, [id, addedProduct, quantity]);

    function onSubmit(order) {
        order.date = new Date().toLocaleDateString("en-us");
        order.status = "pending";
        order.name = customer.displayName;
        order.email = customer.email;
        //same as billing address
        if (sameAsBilling) {
            order.division = customer.division;
            order.district = customer.district;
            order.policeStation = customer.policeStation;
            order.rodeOrVillage = customer.rodeOrVillage;
            order.phone = customer.phone;
        }
        //single product was ordered
        if (singleProduct.length) {
            let newSingle = [];
            let price = 0;
            singleProduct.map(product => {
                const single = product;
                single.quantity = quantity;
                price = product.price;
                return newSingle.push(single);
            });
            order.products = newSingle;
            order.totalBDT = quantity * price + sipping;
        }
        //maltiple products were ordered
        else {
            let newOrders = [];
            orders.map(product => {
                const singleOrder = product;
                let OrderedProductQuantity = 1;
                for (const cart of addedProduct) {
                    OrderedProductQuantity = cart.quantity;
                }
                singleOrder.quantity = OrderedProductQuantity;
                return newOrders.push(singleOrder);
            });
            order.products = newOrders;
            order.totalBDT = totalPrice + sipping;
        }
        //post order
        if (cashOnDelivary) {
            fetch("https://cycle-mart.herokuapp.com/orders", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(order)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        alert.show("Your order created successfully");
                        reset();
                        navigate("/")
                        if (!singleProduct.length) {
                            setAddedProduct([]);
                        }
                    }
                })
        }
        else {
            setOderDetails(order);
            setShowPayment(true);
        }
    };


    return {
        cashOnDelivary,
        setCashOnDelivary,
        sameAsBilling,
        setSameAsBilling,
        singleProduct,
        showPayment,
        setShowPayment,
        isLoading,
        orderDetails,
        totalPrice,
        setTotalPrice,
        orders,
        onSubmit
    }
}

export default useSubmit;