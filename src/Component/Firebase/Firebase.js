import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Authentication from "./Authentication";

const Firebase = () => {
    Authentication();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [hideUserInfo, setHideUserInfo] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const alart = useAlert();


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
                setIsLoading(false);
            }
        });
    }, [auth, isAdmin]);

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
        fetch(`https://cycle-mart.herokuapp.com/users/login/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    const token = localStorage.getItem("token");
                    if (token) {
                        localStorage.setItem("token", JSON.stringify(`Bearar ${data.token}`))
                    } else {
                        localStorage.setItem("token", JSON.stringify(`Bearar ${data.token}`))
                    }
                    if (data.admin) {
                        setIsAdmin(true);
                    }
                    else {
                        setIsAdmin(false);
                    }
                } else {
                    setUser({});
                    alart.show("an unexpected error ocur");
                }
                setIsLoading(false);
            })
    }

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
        showCart,
        setShowCart,
        quantity,
        setQuantity,
    }
};

export default Firebase;