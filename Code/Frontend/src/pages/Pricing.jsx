const taxiData = [
  {
    title: "Car",
    rate: "₹20/km",
    image:
      "https://images.unsplash.com/photo-1580654712603-eb43273aff33?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Auto",
    rate: "₹15/km",
    image:
      "https://media.istockphoto.com/id/1414019690/photo/auto-rickshaw-bajaj-tuktuk-3d-rendering-on-white-background.jpg?s=612x612&w=0&k=20&c=qm75sswRZHLLJeGe0G1WZsioNToC1rhiJpBpTXBAVm8=",
  },
  {
    title: "Bike",
    rate: "₹10/km",
    image:
      "https://media.istockphoto.com/id/1282948347/vector/online-motorcycle-transportation-with-smartphone-app-illustration-for-webpage-landing-page.jpg?s=612x612&w=0&k=20&c=505wuuTklPB1qY5BIsGSA72epaKK6IDULgQmVP2eHRU=",
  },
];

export default function Pricing() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
          Our taxi <span className="text-blue-500">rate</span>
        </h2>

        <p className="text-gray-300 mb-16 leading-relaxed text-xl font-medium max-w-3xl mx-auto">
          <span className="block mb-1">
            🚖 <span className="text-white font-semibold">Ride Smart, Pay Less!</span>
          </span>
          <span className="block mb-1">
            Transparent fares with <span className="text-blue-400">no hidden charges</span>.
          </span>
          <span className="block mb-1">
            Flat rate from just <span className="text-green-400 font-bold">₹10/km</span> – simple,
            fair, and affordable.
          </span>
          <span className="block">
            Your journey, your price – <span className="italic text-white">no surprises!</span>
          </span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {taxiData.map((taxi, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-b from-blue-700 to-blue-900 rounded-3xl text-white p-8 shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <img
                src={taxi.image}
                alt={taxi.title}
                className="w-full h-40 object-contain rounded-lg mb-6 bg-white p-2"
              />
              <h3 className="text-2xl font-semibold mb-2">{taxi.title}</h3>
              <p className="text-3xl font-bold text-green-300">{taxi.rate}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
