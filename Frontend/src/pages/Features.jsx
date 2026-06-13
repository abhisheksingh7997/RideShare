import { Car, MapPin, PhoneCall, Clock, ShieldCheck, Wallet } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Car className="w-8 h-8 text-blue-600" />,
      title: "Real-Time Ride Booking",
      description: "Book your ride instantly and get matched with the nearest available driver in real-time.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      title: "Live GPS Tracking",
      description: "Track your driver live on the map from pickup to drop-off using ArcGIS Maps API.",
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-blue-600" />,
      title: "Driver-Passenger Communication",
      description: "Seamless communication between driver and passenger through call or in-app messaging.",
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Estimated Time & Distance",
      description: "Get real-time estimates of arrival time and trip distance using route mapping services.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Secure Login with JWT",
      description: "User and driver authentication with secure JSON Web Tokens and role-based access.",
    },
    {
      icon: <Wallet className="w-8 h-8 text-blue-600" />,
      title: "Feedback & Payment Ready",
      description: "Submit feedback after rides, and integrate Razorpay/Stripe for seamless payments.",
    },
  ];

  return (
    <section className="bg-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-100 mb-4">Key Features</h2>
        <p className="text-gray-400 mb-12">
          Discover what makes our taxi booking platform fast, secure, and user-friendly.
        </p>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-100">{feature.title}</h3>
              <p className="text-gray-200 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
