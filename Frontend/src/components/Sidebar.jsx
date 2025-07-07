import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();
    // function for handling logout 
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <>
            <div className="w-64 h-screen bg-gray-800 text-white flex flex-col justify-between fixed top-0 left-0 ">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-400 mb-8">Driver Panel</h1>
                    <nav className="flex flex-col space-y-4">
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/')}>
                            Home
                        </button>
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/driverdashboard')}>
                            Dashboard
                        </button>
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/rideRequests')}>
                            Ride Requests
                        </button>
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/viewPastRides')}>
                            View Past Rides
                        </button>
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/earnings')}>
                            View Earnings
                        </button>
                        <button className='text-left hover:bg-gray-700 px-4 py-2 rounded transition' onClick={() => navigate('/driverfeedbacks')}>
                            View Feedback
                        </button>
                    </nav>
                </div>
                <div className="p-6 border-t border-gray-700">
                    <button
                        className="w-full text-left bg-green-500 text-black hover:text-white hover:bg-red-600 px-4 py-2 rounded transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
};