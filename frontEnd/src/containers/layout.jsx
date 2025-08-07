import Navbar from "../component/Navbar";
import { useAuth } from "../context/authContext";

const LayoutMenu = ({ children, blur = false }) => {
    const { logout } = useAuth();
    const handleLogout = async() => {
        const confirmLogout = window.confirm("Yakin ingin logout?");
        if (!confirmLogout) return; 
         try {
            await logout(); 
        } catch (err) {
            console.error("Gagal logout:", err);
        }
    };

    return (
        <div
            className={`w-10/12 flex flex-col items-center self-start mt-3 font-poppins ${
                blur ? "blur-xl h-screen overflow-hidden" : ""
            }`}
        >
            {/* Baris Navbar dan tombol logout */}
            <div className="relative flex w-full  items-center justify-center ">
                <Navbar />
                <div className="absolute right-0 top-2">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-[#FB4141] text-white rounded hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Konten halaman */}
            {children}
        </div>
    );
};

export default LayoutMenu;
