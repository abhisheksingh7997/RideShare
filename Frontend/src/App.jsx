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
<<<<<<< HEAD
=======
          <Route element={<ProtectedRoute allowedRoles={["passenger"]}/>}>
          <Route path='/passengerdashboard' element={<PassengerDashboard/>}/>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["driver"]}/>}>
          <Route path='/driverdashboard' element={<DriverDashboard/>}/>
          </Route>
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/driverdashboard" element={<DriverDashboard />} />
          <Route path="/passengerdashboard" element={<PassengerDashboard />} />
          <Route path="/rideRequests" element={<RideRequests />} />
          <Route path="/earnings" element={<Earnings />} />
<<<<<<< HEAD
=======
          <Route path="/features" element={<Features />} />
>>>>>>> 7476437d25ab8e76e719c941c9559acd75b72056
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
