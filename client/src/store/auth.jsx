import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

//const URL = `${LocalHost}/api/auth/user`;

//step 1 -- object creation
export const AuthContext = createContext();

//step 2 -- creating a provider component for passing children component data
export const AuthProvider = ({ children }) => {

    const LocalHost = "http://localhost:5000";
    //useState function to get token item
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    //determines whether token is present or not
    const authToken = `Bearer ${token}`;
    let isLoggedIn = !!token;

    //handling logout authentication
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    }

    //handling tokens on client side server
    const storeTokeninLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    //verifying jwt token to get user data
    const [IsLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState("");
    const userAuth = async () => {
        try {
            const response = await fetch(`${LocalHost}/api/auth/user`, {
                method: "GET",
                headers: { Authorization: authToken }
            });
            if (response.ok) {
                const data = await response.json();
                //console.log("user data",data);
                setUser(data.userData);
                setIsLoading(false);
            }
            else {
                console.error("Error fetching admin data");
                setIsLoading(false);
            }
        }
        catch (error) {
            console.error("cannot get user data");
        }
    }

    //handling services page
    const [service, setService] = useState([]);
    const useService = async () => {
        try {
            const response = await fetch(`${LocalHost}/api/data/services`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                //console.log("user data",data);
                setService(data.msg);
            }
        }
        catch (error) {
            console.error("cannot get services data")
        }
    }
    useEffect(() => {
        userAuth();
        useService();
    }, []);

    return <AuthContext.Provider value={{
        isLoggedIn,
        LogoutUser,
        storeTokeninLS,
        user,
        service,
        authToken,
        IsLoading,
        LocalHost,
    }}>
        {children}
    </AuthContext.Provider>;
}

//step 3 -- creating a consumer component using useContext hook to consume the data
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider")
    }
    return authContextValue;
}
