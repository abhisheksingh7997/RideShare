import Phone from "../components/Phone";
import Hero from "../components/Hero";
import Pricing from "./Pricing";
import Feedback from "./Feedback";
import Contacts from "./Contacts";
import Footer from "./Footer";
import Features from "./Features";
function Home() {
  return (
    <>
  <Hero/>
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
  <Footer/>
    </>
  );
}

export default Home;
