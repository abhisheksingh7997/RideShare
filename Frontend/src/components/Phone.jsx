function Phone() {
  return (
    <div className="relative bg-black text-white py-20 px-4 overflow-hidden">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80"
        alt="Taxi background"
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Phone images */}
      <div className="relative z-10 max-w-6xl mx-auto flex justify-center gap-12 items-center">
        <div className="bg-black border-4 border-gray-700 rounded-3xl p-2 shadow-inner">
          <img
            src="https://img.freepik.com/free-vector/taxi-app-concept-illustration_52683-36028.jpg?semt=ais_hybrid&w=740"
            alt="App Screen 1"
            className="w-48 md:w-64 transform rotate-[-10deg] rounded-2xl"
          />
        </div>
        <div className="bg-black border-4 border-gray-700 rounded-3xl p-2 shadow-inner">
          <img
            src="https://t4.ftcdn.net/jpg/04/40/68/71/360_F_440687123_9uub1GigBW0vvUlLCxD429KGwLgmD8Sd.jpg"
            alt="App Screen 2"
            className="w-48 md:w-64 transform rotate-[10deg] rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Phone;
