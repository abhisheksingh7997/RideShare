import { Card,CardContent } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Bell, Settings, MapPin, SunMoon, Car, BarChart2, Users, MessageSquare, HelpCircle, FileText, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function TaxiDashboard() {
  return (
    <div className="grid grid-cols-[250px_1fr] h-screen text-white bg-gray-900">
      <Navbar/>
      {/* Sidebar */}
      <aside className="bg-black p-4 flex flex-col space-y-4">
         <Link to="/">
        <div  className="text-2xl font-bold text-blue-500">RideShare</div></Link>
        <nav className="flex flex-col space-y-3 text-sm">
          <SidebarItem icon={<Car />} label="Dashboard" active />
          <SidebarItem icon={<Users />} label="Drivers" />
          <SidebarItem icon={<Users />} label="Riders" />
          <SidebarItem icon={<BarChart2 />} label="Transaction" />
          <SidebarItem icon={<Car />} label="Bookings" />
          <SidebarItem icon={<BarChart2 />} label="Statistics" />
          <SidebarItem icon={<Key />} label="Promo code" />
          <SidebarItem icon={<MessageSquare />} label="Messages" badge="4" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
          <SidebarItem icon={<FileText />} label="Report" />
          <SidebarItem icon={<Settings />} label="Setting" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="p-6 space-y-6 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <input type="text" placeholder="Search here..." className="bg-gray-800 rounded px-4 py-2 w-1/3" />
          <div className="flex space-x-4 items-center">
            <Bell className="text-white" />
            <SunMoon className="text-white" />
            <img src="https://via.placeholder.com/30" alt="User" className="rounded-full" />
            <span>Albert Sebastian</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard title="Total Earnings" amount="$324.00" change="+40%" />
          <StatCard title="Total Profit" amount="$324.00" change="+40%" />
          <StatCard title="Total Expenses" amount="$324.00" change="+40%" negative />
        </div>

        {/* Bookings and Charts */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-1 bg-gray-800">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Cars</h3>
              <div className="flex justify-around text-sm">
                <span>Online: 174</span>
                <span>On order: 30</span>
                <span>Awaiting: 12</span>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-gray-800">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Receiving Bookings</h3>
              <ProgressItem label="Active booking" value={65} />
              <ProgressItem label="Happy Customer" value={65} />
              <ProgressItem label="Cancelled" value={65} />
            </CardContent>
          </Card>

          <Card className="col-span-1 bg-gray-800">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Active Drivers</h3>
              <DriverItem name="Maharm Hasani" orders={5} income={98} />
              <DriverItem name="Maharm Hasani" orders={5} income={98} />
              <DriverItem name="Maharm Hasani" orders={5} income={98} />
            </CardContent>
          </Card>
        </div>

        {/* Recent Booking Map Section */}
        <Card className="bg-gray-800">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">Recent Booking</span>
              <div className="flex items-center space-x-2">
                <select className="bg-gray-700 px-2 py-1 rounded text-white text-sm">
                  <option>Select location</option>
                </select>
                <input type="time" className="bg-gray-700 px-2 py-1 rounded text-white text-sm" />
                <Button>View all booking</Button>
              </div>
            </div>
            <div className="bg-gray-700 rounded h-64 flex items-center justify-center">
              <MapPin className="text-white mr-2" /> Map Placeholder
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, badge }) {
  return (
    <div className={`flex items-center space-x-2 px-2 py-1 rounded cursor-pointer ${active ? 'bg-blue-500 text-black font-semibold' : 'hover:bg-gray-700'}`}>
      {icon}
      <span>{label}</span>
      {badge && <span className="ml-auto bg-red-500 rounded-full text-xs px-2">{badge}</span>}
    </div>
  );
}

function StatCard({ title, amount, change, negative }) {
  return (
    <Card className="bg-gray-800">
      <CardContent className="p-4">
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold">{amount}</div>
        <div className={`text-sm ${negative ? 'text-red-400' : 'text-green-400'}`}>{change} From last month</div>
      </CardContent>
    </Card>
  );
}

function ProgressItem({ label, value }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded h-2">
        <div className="bg-blue-500 h-2 rounded" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}

function DriverItem({ name, orders, income }) {
  return (
    <div className="flex justify-between text-sm border-b border-gray-700 py-2">
      <span>{name}</span>
      <span>Orders: {orders}</span>
      <span>Income: ${income}</span>
    </div>
  );
}