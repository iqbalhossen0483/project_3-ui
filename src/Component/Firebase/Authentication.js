import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';

const Authentication = () => {
    console.log(firebaseConfig);
    return initializeApp(firebaseConfig);
};

export default Authentication;