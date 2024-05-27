import React, { useState, useContext, createContext, useLayoutEffect, useEffect } from "react";
import { GetCookie } from "../Cookies";

const AuthContext = createContext();

const UserAuthentication = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState("Hamza");
    const fetchData = () => {
        let { userIsLoggedIn, token } = GetCookie();
        setUserInfo({ "user": userIsLoggedIn, "token": token });
        setLoading(false);
    }
    useLayoutEffect(() => {


        fetchData();

    }, []);
    if (loading) {

        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={{ userInfo, fetchData }}>{children}</AuthContext.Provider>;
}

const useUserData = () => {
    return useContext(AuthContext);
}

export { UserAuthentication, useUserData };
