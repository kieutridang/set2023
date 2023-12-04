"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

function Regsiter() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        await handleRegister();
    }

    async function handleRegister() {
        if (username && password) {
            console.log(username, password);
            try {
                await axios.post(
                    "https://6569640ede53105b0dd6f973.mockapi.io/users",
                    {
                        username,
                        password,
                    }
                );
                router.push("/login");
            } catch (error) {
                console.log("Register failed", error.message);
            }
        }
    }

    return (
        <form className="max-w-xs mx-auto mt-20">
            <h1 className="text-center text-xl font-bold text-gray-500 m-3 ">
                Register
            </h1>
            <div className="mb-5">
                <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                >
                    Username
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
                    Password
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

            <button
                type="submit"
                onClick={(event) => handleSubmit(event)}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            >
                Register
            </button>
        </form>
    );
}
export default Regsiter;
