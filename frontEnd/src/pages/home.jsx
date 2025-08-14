import { Button } from "../component/button/Button";

const Home = () => {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[url(images/tk_belajar.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden">
            {/* Gradient overlay with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/70 to-zinc-900/90 backdrop-blur-sm"></div>

            {/* Animated floating elements */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 animate-float1"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-emerald-500/10 animate-float2"></div>

            {/* Main container */}
            <div className="relative z-10 w-full max-w-6xl mx-6 px-4 py-12 md:py-20">
                {/* Modern header with animated text */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-blue-500 animate-text-shimmer">
                            E-RAPORT DIGITAL
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 font-medium mt-4">
                        Transformasi Digital Laporan Belajar TK Al-IKHLAS BALLA
                    </p>
                </div>

                {/* User cards with hover effects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Operator Sekolah Card */}
                    <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/30 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                👩‍🏫
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Operator Sekolah
                            </h2>
                            <p className="text-blue-100/90 mb-6 flex-grow">
                                Dashboard lengkap untuk manajemen data siswa,
                                input nilai, dan generasi laporan secara
                                efisien.
                            </p>
                            <div className="mt-auto">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
                                <p className="text-sm text-blue-300/80">
                                    Akses penuh sistem administrasi
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Orang Tua Card */}
                    <div className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-400/30 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-emerald-500/10">
                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                👨‍👩‍👧‍👦
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Orang Tua/Wali
                            </h2>
                            <p className="text-blue-100/90 mb-6 flex-grow">
                                Pantau perkembangan belajar anak dengan akses
                                real-time ke nilai, catatan guru, dan analisis
                                perkembangan.
                            </p>
                            <div className="mt-auto">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>
                                <p className="text-sm text-emerald-300/80">
                                    Informasi transparan dan terupdate
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Animated CTA button */}
                <div className="text-center mb-16">
                    <Button
                        text="Mulai Sekarang"
                        bg="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
                        className="w-full max-w-md mx-auto py-4 text-lg font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                        onClick={() => (window.location.href = "/login")}
                    />
                    <p className="text-white/70 mt-4 text-sm">
                        Sistem terintegrasi untuk pendidikan yang lebih
                        transparan
                    </p>
                </div>

                {/* Features grid */}
                <div className="flex flex-wrap justify-center gap-6 mb-16">
                    {[
                        {
                            icon: "⚡",
                            title: "Realtime",
                            desc: "Update langsung",
                        },
                        { icon: "🔒", title: "Aman", desc: "Data terenkripsi" },
                        {
                            icon: "📊",
                            title: "Analitik",
                            desc: "Visualisasi data",
                        },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-4 w-40 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        >
                            <div className="text-3xl mb-3">{feature.icon}</div>
                            <h3 className="font-bold text-white mb-1">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-blue-100/80">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                        © {new Date().getFullYear()} E-Raport Digital TK
                        Al-IKHLAS BALLA
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
