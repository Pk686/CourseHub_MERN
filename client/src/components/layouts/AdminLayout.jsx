import { Outlet } from "react-router-dom";
import { NavLink,Navigate } from "react-router-dom";
import { FaUserTie,FaHouseDamage } from "react-icons/fa";
import { MdContacts,MdMiscellaneousServices } from "react-icons/md";
import { useAuth } from "../../store/auth";
export const AdminLayout = () =>{
    const {user,IsLoading} = useAuth();
    if(IsLoading){
        return<h1>Loading...</h1>
    }
    if(!user.isAdmin){
        return <Navigate to="/" />;
    }
    return <>
        <header>
        <div className="container">
            <nav>
            <ul style={{display:'flex',gap: '3.2rem'}}>
                <li><NavLink to="/admin/users"><FaUserTie/>Users</NavLink></li>
                <li><NavLink to="/admin/contacts"><MdContacts/>Contacts</NavLink></li>
                <li><NavLink to="/services"><MdMiscellaneousServices />Services</NavLink></li>
                <li><NavLink to="/"><FaHouseDamage/>Home</NavLink></li>
            </ul>
            </nav>
        </div>
        </header>
        <Outlet />
    </>
}
