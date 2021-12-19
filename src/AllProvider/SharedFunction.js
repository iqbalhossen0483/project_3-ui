import { useState } from "react";

const SharedFunction = () => {
    const [categoryMenus, setCategoryMenus] = useState([
        { name: "Road Bike", icon: <i className="fas fa-bicycle"></i> },
        { name: "Mountain Bike", icon: <i className="fas fa-biking"></i> },
        { name: "Touring Bike", icon: <i className="fas fa-biking"></i> },
        { name: "Foldering bike", icon: <i className="fas fa-biking"></i> }
    ])

    return {
        categoryMenus,
        setCategoryMenus
    }
};

export default SharedFunction;