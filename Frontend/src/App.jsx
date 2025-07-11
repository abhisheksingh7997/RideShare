import Login from './auth/Login';
import Signup from './auth/Signup';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pricing from './pages/Pricing';
import Feedback from './pages/Feedback';
import Contacts from './pages/Contacts';
import DriverDashboard from './pages/DriverDashboard';
import PassengerDashboard from './pages/PassengerDashboard';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import RideRequests from './components/RideRequests';
import Earnings from './pages/Earnings';



function App() {

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
          <Route path="/passengerdashboard" element={<PassengerDashboard />} />
          <Route path="/rideRequests" element={<RideRequests />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
