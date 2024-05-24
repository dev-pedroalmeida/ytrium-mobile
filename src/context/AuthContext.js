import { createContext } from "react";

export default AuthContext = createContext({
    user: {},
    _setUser: () => {},
    isAuth: false,
    _setIsAuth: () => {}
})