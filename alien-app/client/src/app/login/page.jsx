"use client";
import { useState } from "react";
import axios from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //   function handleSubmit(event) {
    //     event.preventDefault();
    //     handleLogin();
    //   };
    //   async function handleLogin () {
    //     try {
    //         const response = await axios.get(
    //             "https://6569640ede53105b0dd6f973.mockapi.io/projects"
    //         );
    //         setProjects(response.data);
    //     } catch (error) {
    //         console.log("getProjects failed", error.message);
    //     }
    //   };
    return (
        <form className="max-w-xs mx-auto mt-20">
            <h1 className="text-center text-xl font-bold text-gray-500 m-3 ">
                Login
            </h1>
            <div className="mb-5">
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Your username
                </label>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Your password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Pasword"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    />
                </div>
                <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                >
                    Remember me
                </label>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login
            </button>
        </form>
    );
}
export default Login;
