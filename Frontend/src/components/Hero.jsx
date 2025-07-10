import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <>
      <Navbar />
      <header className="relative min-h-screen text-white bg-black px-6 pt-28 pb-14 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490650404312-a2175773bbf5?w=1600&auto=format&fit=crop&q=80')",
            zIndex: 0,
            opacity: 0.5,
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

        <div className="relative z-10 max-w-4xl mx-auto mt-40 p-8 text-white text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight  hover:text-blue-200">
            Book a Taxi to <br /> Your Destination in Style
          </h2>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Download now and you'll be up and running in just minutes. Enjoy safe, comfortable, and luxury rides anytime, anywhere with our professional fleet.
          </p>

          <div className="mt-20 flex justify-center flex-wrap gap-6">
            <Link to="/login">
              <button className="px-8 py-4 border-blue-500 border-2 text-white font-semibold rounded-full text-base transition duration-300 hover:shadow-[0_0_15px_4px_rgba(255,215,0,0.6)]">
                Login
              </button>
            </Link>

            <Link to="/signup">
              <button className="px-8 py-4 border-blue-500 border-2 text-white font-semibold rounded-full text-base transition duration-300 hover:shadow-[0_0_15px_4px_rgba(255,215,0,0.6)]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default Hero;
