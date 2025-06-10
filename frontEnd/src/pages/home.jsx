import { Button } from "../component/button/Button";

const Home = () => {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center bg-[url(images/tk_belajar.jpg)] bg-cover bg-center bg-no-repeat overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 to-zinc-900/80"></div>
            
            {/* Glassmorphism container */}
            <div className="relative z-10 w-full max-w-4xl mx-6 p-8 md:p-12 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
                {/* Logo/Title area */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-5">
                        <span className="text-2xl md:text-3xl font-bold text-white">ER</span>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                        <span className="block text-blue-300">E-RAPORT DIGITAL</span>
                        <span className="block text-white mt-2 text-xl md:text-2xl font-medium">TK Al-IKHLAS BALLA</span>
                    </h1>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {icon: '📊', title: 'Pantau Nilai', desc: 'Real-time tracking'},
                        {icon: '📝', title: 'Catatan Guru', desc: 'Feedback langsung'},
                        {icon: '📅', title: 'Laporan', desc: 'Per semester'}
                    ].map((item, index) => (
                        <div key={index} className="p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/5">
                            <div className="text-2xl mb-3">{item.icon}</div>
                            <h3 className="text-white font-medium mb-1">{item.title}</h3>
                            <p className="text-blue-100 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Main CTA */}
                <div className="text-center">
                    <p className="text-white/90 mb-6 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Platform digital terintegrasi untuk memantau perkembangan belajar anak dengan transparansi penuh.
                    </p>
                    <Button bg="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" />
                </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-blue-400/50"></div>
            <div className="absolute top-12 right-12 w-4 h-4 rounded-full bg-blue-300/40"></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 rounded-full bg-white/30"></div>
        </div>
    );
};

export default Home;