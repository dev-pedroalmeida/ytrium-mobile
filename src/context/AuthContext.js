import { createContext } from "react";

export default AuthContext = createContext({
    user: {},
    setUser: () => {},
    isAuth: false,
    setIsAuth: () => {}
})