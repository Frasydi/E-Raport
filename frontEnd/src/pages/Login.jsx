import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import ErrorMessage from "../component/Error";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await login(username, password);

        if (res.success) {
            if (res.role === "Operator") {
                navigate("/dashboard");
            } else if (res.role === "Ortu") {
                navigate("/orang-tua");
            } else {
                navigate("/");
            }
        } else {
            setError(res.error);
        }

        setLoading(false);
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

                {/* Bagian kiri */}
                <div className="w-full lg:w-1/2 h-[30vh] sm:h-[35vh] lg:h-auto lg:max-h-[90vh] relative group overflow-hidden">
                    <img
                        src="images/LoginPage.jpg"
                        alt="Login Visual"
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                        
                    </div>
                </div>

                {/* Form login */}
                <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center overflow-y-auto">
                    <div className="mb-6 sm:mb-8 text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                            Login
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Masukkan username dan password
                        </p>
                    </div>

                    {error && <ErrorMessage error={error} />}

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
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="masukkan username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="off"
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base placeholder:text-sm"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password"
                                className="text-xs sm:text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                placeholder="masukkan password"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base placeholder:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 sm:py-3 px-4 rounded-lg font-medium 
                                transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                                text-sm sm:text-base ${
                                    loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:from-blue-700 hover:to-indigo-700"
                                }`}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
