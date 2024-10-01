import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { toast } from "sonner";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);


    const signUpFormdata =  { email, password }

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`,signUpFormdata)
      .then((response) => {
        const response_data = response.data;
    
        if (response.status === 200) {
          // save the user to local storage
          localStorage.setItem("user", JSON.stringify(response_data));

          // Notify the user of successful login
          toast.success("Login Succesfully")

          // Update the auth context
          dispatch({ type: "LOGIN", payload: response_data });
          
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };
  return { login, isLoading, error };
};
