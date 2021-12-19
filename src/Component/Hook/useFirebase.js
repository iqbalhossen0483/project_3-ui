import { useContext } from "react"
import { AuthContex } from "../Firebase/FirebaseProvider"

const useFirebase = () => {
    return useContext(AuthContex)
}
export default useFirebase;