import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/auth";
import { useAuth } from "../context/authContext";
import ErrorMessage from "../component/Error";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setAccessToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        setError("");
        e.preventDefault();
        try {
            const res = await login(username, password);
            setAccessToken(res.accessToken);
            navigate("/menu");
        } catch (error) {
            setError(error.response.data.msg);
        }
    };
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center min-h-screen w-full p-4 sm:p-6 overflow-auto">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row relative max-h-[90vh]">
                <a
                    href="/"
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
                    aria-label="Back to home"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </a>
                <div className="w-full lg:w-1/2 h-[30vh] sm:h-[35vh] lg:h-auto lg:max-h-[90vh] relative group overflow-hidden">
                    <img
                        src="images/LoginPage.jpg"
                        alt="Login Visual"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                        <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            Welcome Back
                        </h2>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-6 sm:mb-8 text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                            Sign In
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Please enter your credentials
                        </p>
                    </div>

                    {error && (
                        <ErrorMessage error={error}></ErrorMessage>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-6"
                    >
                        <div className="space-y-1">
                            <label
                                htmlFor="username"
                                className="text-xs sm:text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password"
                                className="text-xs sm:text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base"
                                    autoComplete="off"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
