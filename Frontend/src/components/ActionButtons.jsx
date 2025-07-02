export default function ActionButtons({ handleBookRide, navigate }) {
  return (
    <div className="mt-8 flex gap-4 flex-wrap">
      <button
        onClick={handleBookRide}
        className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition"
      >
        Book Ride
      </button>
      <button
        onClick={() => navigate("/pricing")}
        className="bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition"
      >
        See Prices
      </button>
    </div>
  );
}
