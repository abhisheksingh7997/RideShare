import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({allowedRoles}) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if(!token){
  alert("Please Login/Signup First!!!");
     return <Navigate to="/login" replace />
    }
    if(allowedRoles && !allowedRoles.includes(role)){
        alert("You don't have permission to access this page");
        return <Navigate to="/" replace />
    }
    return <Outlet/>

}