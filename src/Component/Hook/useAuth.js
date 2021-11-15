import { useContext } from "react"
import { AuthContex } from "../Firebase/AuthProvider"

const useAuth = () => {
    return useContext(AuthContex)
}
export default useAuth;