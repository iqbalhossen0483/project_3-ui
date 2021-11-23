import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react";
import Authentication from "./Authentication";

const useFirebase = () => {
    Authentication();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [addedProduct, setAddedProduct] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [hideUserInfo, setHideUserInfo] = useState(false);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();


    //create user to database
    const makeUser = (name, email) => {
        const userInfo = {
            displayName: name,
            email: email
        };
        fetch("https://cycle-mart.herokuapp.com/users", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
            .then(res => res.json())
            .then(data => { })
    };
    // chect user is admin
    const checkUser = (email) => {
        fetch(`https://cycle-mart.herokuapp.com/users/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsLoading(true);
                if (data.cart) {
                    setAddedProduct(data.cart);
                }
                if (data?.roll === "admin") {
                    setIsAdmin(true);
                    setIsLoading(false);
                }
                else {
                    setIsAdmin(false);
                    setIsLoading(false);
                }
            })
    }

    //google log in
    const logInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }
    //observe user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkUser(user.email);
            }
            else {
                setUser({});;
            }
            setIsLoading(false)
        })
    }, [auth, isAdmin]);


    //email pass
    const singUPWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
    }
    //log in
    const logInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //sign out
    const lognOut = () => {
        signOut(auth)
            .then(result => {
                setHideUserInfo(false);
            })
            .catch(err => {
                console.log(err.message)
            })
    };

    return {
        logInWithGoogle,
        user,
        lognOut,
        singUPWithEmail,
        userName,
        logInWithEmail,
        isLoading,
        makeUser,
        isAdmin,
        hideUserInfo,
        setHideUserInfo,
        addedProduct,
        setAddedProduct,
        showCart,
        setShowCart,
        cartProducts,
        setCartProducts
    }
};

export default useFirebase;