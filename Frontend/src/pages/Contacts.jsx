import { Mail, Phone, MapPin } from "lucide-react";
<<<<<<< HEAD

export default function Contacts() {
  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-4">
=======
import { useRef } from "react";
import emailjs from "emailjs-com";

export default function Contacts() {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2kvhmx4",       
        "template_ry95h5f",      
        formRef.current,
        "oUA5GjTlkAXbHeV8m"           
      )
      .then(
        (result) => {
          alert("Message sent successfully!",result);
          formRef.current.reset();
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <section className="bg-gray-100 text-gray-800 py-16 px-4" id="contacts">
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
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
<<<<<<< HEAD
              <span>support@taxiride.com</span>
=======
              <span>support@rideshare.com</span>
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-blue-600" />
              <span>Jaipur, Rajasthan, India</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
<<<<<<< HEAD
          <form className="space-y-6">
=======
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
<<<<<<< HEAD
                placeholder="Enter Your Name..."
=======
                name="name"
                placeholder="Enter Your Name..."
                required
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Your Email</label>
              <input
                type="email"
<<<<<<< HEAD
                placeholder="Enter Your Email..."
=======
                name="email"
                placeholder="Enter Your Email..."
                required
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
<<<<<<< HEAD
                rows="5"
                placeholder="Type your message..."
=======
                name="message"
                rows="5"
                placeholder="Type your message..."
                required
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
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
