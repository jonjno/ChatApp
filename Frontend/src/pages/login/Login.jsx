import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [UserName, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const { loading, loginn } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginn(UserName, Password);
  };
  return (
    <div className=' flex flex-col items-center justify-center min-2-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          {" "}
          Login
          <span className='text-blue-500'> Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>UserName</span>{" "}
            </label>
            <input
              type='text '
              placeholder='Enter UserName'
              className='w-full input input-bordered h-10'
              value={UserName}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password '
              placeholder='Enter Pssword'
              className='w-full input input-bordered h-10'
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <Link
            to='/signup'
            className='text-sm hover: underline hover:text-blue-600 mt-2 inline-block'
          >
            {"Don't"} have an account
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 ' disabled={loading}>
              {loading ? (
                <span className='loading loading-spinner'></span>
              ) : (
                "login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
