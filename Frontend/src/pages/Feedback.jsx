import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const feedbacks = [
  {
    name: "Rober Downey",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162022.jpg?w=2000",
    feedback: "Great experience! The ride was smooth, and the driver was very polite.",
  },
  {
    name: "Michelle Jones",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162100.jpg?w=2000",
    feedback: "Very punctual service. Booking was easy and transparent pricing was a plus.",
  },
  {
    name: "Andrew Jackson",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162022.jpg?w=2000",
    feedback: "I love how clean the vehicle was. Will definitely use the service again!",
  },
  {
    name: "Nicloe Wallace",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162100.jpg?w=2000",
    feedback: "Affordable and reliable. Booked a ride for my parents and they were happy too.",
  },
  {
    name: "Chris Evans",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162022.jpg?w=2000",
    feedback: "Customer support was quick and helpful. Solved my issue within minutes.",
  },
  {
    name: "Adelaide Kane",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162100.jpg?w=2000",
    feedback: "The app UI is so easy to use, and the ride tracking feature is excellent.",
  },
  {
    name: "Harley",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162022.jpg?w=2000",
    feedback: "Driver arrived on time and the pricing was exactly what was shown. Impressed!",
  },
  {
    name: "Brie Larson",
    image: "https://img.freepik.com/premium-photo/profile-icon-white-background_941097-162100.jpg?w=2000",
    feedback: "Loved the bike ride option – super quick and budget-friendly.",
  },
];

export default function Feedback() {
  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold">What Our Users Say</h2>
        <p className="text-gray-400 mt-2">Real feedback from our happy customers</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        className="max-w-3xl mx-auto"
      >
        {feedbacks.map((item, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-gray-800 p-8 rounded-2xl shadow-md text-center flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-full mb-4 border-4 border-blue-500 object-cover"
              />
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-300 mt-2 italic max-w-md">{`"${item.feedback}"`}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
