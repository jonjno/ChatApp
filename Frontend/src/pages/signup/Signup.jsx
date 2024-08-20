import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    Password: "",
    ConfirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          <span className='text-blue-500'> SignUp Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>FullName</span>{" "}
            </label>
            <input
              type='text '
              placeholder='Enter Full Name'
              className='w-full input input-bordered h-10'
              value={inputs.fullName}
              onChange={(e) => {
                setInputs({ ...inputs, fullName: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>User Name</span>{" "}
            </label>
            <input
              type='text '
              placeholder='Enter Username'
              className='w-full input input-bordered h-10'
              value={inputs.userName}
              onChange={(e) => {
                setInputs({ ...inputs, userName: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>PassWord</span>{" "}
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={inputs.Password}
              onChange={(e) => {
                setInputs({ ...inputs, Password: e.target.value });
              }}
            ></input>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'> Confirm PassWord</span>{" "}
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.ConfirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, ConfirmPassword: e.target.value });
              }}
            ></input>
          </div>
          <GenderCheckBox
            onCheckboxChange={handleCheckbox}
            selectedGender={inputs.gender}
          />
          <Link
            to='/login'
            className='text-sm hover: underline hover:text-blue-600 mt-2 inline-block'
          >
            Already have an account
          </Link>
          <div>
            <div>
              <button className='btn btn-block btn-sm mt-2 ' disabled={loading}>
                {loading ? (
                  <span className='loading loading-spinner'></span>
                ) : (
                  "signup"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
