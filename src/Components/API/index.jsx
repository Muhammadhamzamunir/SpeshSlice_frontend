
import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Squares } from "react-activity";
import "react-activity/dist/library.css";
import { GetCookie, RemoveCookie } from "../Cookies";
import { useNavigate } from "react-router-dom";
const Index = () => {
    const [loader, setLoader] = useState(false);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = GetCookie();
        setToken(token);
    }, []);

    const APIcall = async (url, method, body = null, action = null) => {
       
    
        setLoader(true);
    
        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        };
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/api${url}`, requestOptions);
            const data = await response.json();
    
            if (data.success) {
                toast.success(data.success, { position: "bottom-right", theme: "dark" });
                action?.resetForm();
            } else if (data.error) {
                toast.error(data.error ? data.error : "Something Went Wrong", { position: "bottom-right", theme: "dark" });
                setError(data.error || "Something Went Wrong");
            }
    
            // End timer
            
    
            setLoader(false);
            return data;
        } catch (error) {
            console.error("API Error:", error);
            setError("API Error");
            setLoader(false);
        }
    };
    



    return { APIcall, loader, setLoader };
};

export default Index;
