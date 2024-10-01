import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";
import { toast } from "sonner";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    const signUpFormdata =  { email, password }
    
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, signUpFormdata)
    .then((response) => {
      const response_data = response.data;
  
      // Save the user to local storage
      localStorage.setItem("user", JSON.stringify(response_data));
  
      // Update the auth context
      dispatch({ type: "LOGIN", payload: response_data });
  
      // Notify the user of successful signup
      toast.success("Signup Successfully");
  
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.response?.data?.message || "An error occurred");
      setIsLoading(false);
    });
  };
  return { signup, isLoading, error };
};
