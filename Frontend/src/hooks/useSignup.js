import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const useSignup = () => {
  const [loading, setloading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    Password,
    ConfirmPassword,
    gender,
  }) => {
    const sucess = handleInputError({
      fullName,
      userName,
      Password,
      ConfirmPassword,
      gender,
    });
    if (!sucess) return;
    setloading(true);
    try {
      console.log("wow");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          Password,
          ConfirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      //   Local Storage
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

const handleInputError = ({
  fullName,
  userName,
  Password,
  ConfirmPassword,
  gender,
}) => {
  console.log(fullName, userName, Password, ConfirmPassword, gender);
  if (!fullName || !userName || !Password || !ConfirmPassword || !gender) {
    toast.error("please fill all fields");
    return false;
  }
  if (Password !== ConfirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (Password.length < 6) {
    toast.error("password must be atleast 6 char");
    return false;
  }
  return true;
};
