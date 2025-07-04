export default function UserGreeting({ user }) {
  if (!user) return null;
  return (
    <>
      <h1 className="text-white text-4xl mb-2 font-bold">
        Welcome, <span className="text-blue-500 text-3xl">{user.email.split('@')[0]}</span>
      </h1>
      <h2 className="text-3xl font-bold text-white mb-2">Go Anywhere With</h2>
      <h3 className="text-3xl font-extrabold text-blue-500 tracking-tight mb-4">
        Ride<span className="text-white">Share</span>
      </h3>
    </>
  );
}
