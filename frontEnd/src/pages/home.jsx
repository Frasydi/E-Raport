import {Button} from "../component/button/Button";
const Home = () => {
    return (
        <div className="w-full h-full flex  bg-[url(images/tk_belajar.jpg)] bg-cover backdrop-brightness-[0.5] justify-center items-center flex-col">
            <h1 className="text-white text-5xl font-bold text-shadow-lg text-center font-poppins">E RAPORT<br />TK Al-IKHLAS BALLA</h1>
            <p className="w-2xl text-white text-center mt-2 mb-4">Platform digital untuk memudahkan guru dan orang tua dalam melihat perkembangan belajar anak. Akses nilai, catatan guru, dan laporan perkembangan setiap semester secara online.</p>
            <Button bg="bg-[#27548A]"/>
        </div>
    )
};

export default Home;
