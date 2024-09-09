import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { FaUserEdit } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

export const Useradmin = () => {
    const { authToken,LocalHost } = useAuth();
    const deleteUser = async(id) => {
        try{
            const response = await fetch(`${LocalHost}/api/admin/users/delete/${id}`,{
                method:"DELETE",
                headers:{Authorization:authToken},
            });
            const data = await response.json();
            console.log(`users after delete: ${data}`);
            if(response.ok){
                getAllUsers();
                toast.success("User Deleted Successfully");
            }
            else{
                toast.error("Cannot Delete User Data");
            }
        }
        catch(error){
            console.log(error);
        }
    };
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await fetch(`${LocalHost}/api/admin/users`, {
                method: "GET",
                headers: { Authorization: authToken },
            });
            const data = await response.json();
            setUsers(data.data);

        } catch (error) {
            console.error("Users not found");
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return <>
        <div className="container" style={{marginBottom:'-50px'}}>
            <h1 className="main-heading">Admin Users Data</h1>
        </div>
        <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((currElem, index) => {
                            const { username, email, phone } = currElem;
                            return (
                                <tr key={index}>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{phone}</td>
                                    <td><button style={{backgroundColor:'rgba(0,0,255,0.8)',borderColor:'grey'}}><Link to={`/admin/users/${currElem._id}/edit`}><FaUserEdit style={{ color: '#61dafb', fontSize: '3rem' }}  /></Link></button></td>
                                    <td><button style={{backgroundColor:'rgba(255,80,0,0.8)',borderColor:'grey'}} onClick={()=>deleteUser(currElem._id)}><TiUserDelete style={{ color: 'rgba(255,255,0,0.8)', fontSize: '3rem' }} /></button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
    </>
};
