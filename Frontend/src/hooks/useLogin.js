import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const { loading, setloading } = useState(false);

  const loginn = async (userName, Password) => {
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, Password }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, loginn };
};

export default useLogin;
