import { Mail, Phone, MapPin } from "lucide-react";

export default function Contacts() {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-4xl font-bold mb-4 text-blue-600">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
          </p>

          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600" />
              <span>support@taxiride.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter Your Name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
                placeholder="Enter Your Email..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-900 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
