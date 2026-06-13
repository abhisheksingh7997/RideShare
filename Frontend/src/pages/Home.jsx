import Phone from "../components/Phone";
import Hero from "../components/Hero";
import Pricing from "./Pricing";
import Feedback from "./Feedback";
import Contacts from "./Contacts";
import Footer from "./Footer";
<<<<<<< HEAD
=======
import Features from "./Features";
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
function Home() {
  return (
    <>
  <Hero/>
<<<<<<< HEAD
  <Phone/>
  <Pricing/>
  <Feedback/>
  <Contacts/>
=======
  <div id="phone">
<Phone/>
</div>
<div id="pricing">
  <Pricing/>
  </div>
  <div id="features">
    <Features/>
  </div>
  <div id="feedback">
  <Feedback/>
  </div>
  <div id="contacts">
  <Contacts/>
  </div>
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
  <Footer/>
    </>
  );
}

export default Home;
