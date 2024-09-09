import { useState,useEffect } from "react";
import { useAuth } from "../store/auth";
import { RiDeleteBin4Fill } from "react-icons/ri";
import {toast} from "react-toastify";
export const Contactadmin = () => {
    const [contacts, setContacts] = useState([]);
    const { authToken,LocalHost } = useAuth();
    const deleteContact = async(id) => {
        try{
            const response = await fetch(`${LocalHost}/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{Authorization:authToken},
            });
            const data = await response.json();
            console.log(`contacts after delete: ${data}`);
            if(response.ok){
                getAllcontacts();
                toast.success("Contacts Deleted Successfully");
            }
            else{
                toast.error("Cannot Delete Contacts Data");
            }
        }
        catch(error){
            console.log(error);
        }
    };
    const getAllcontacts = async () => {
        try {
            const response = await fetch(`${LocalHost}/api/admin/contacts`, {
                method: "GET",
                headers: { "Authorization": authToken },
            })
            const data = await response.json();
            console.log(data);
            setContacts(data.data);
        }
        catch (error) {
            console.error("contacts not found");
        }
    }
    useEffect(()=>{
        getAllcontacts();
    },[]);

    return <>
        <div className="container" style={{marginBottom:'-50px'}}><h1 className="main-heading">Admin Contacts Data</h1></div>
        <div className="container admin-users">
            <table>
                <thead>
                    <tr style={{ gridTemplateColumns: 'repeat(4,minmax(10rem,1fr))'}}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((currElem, Index) => {
                        const { username, email, message } = currElem;
                        return (
                            <tr key={Index} style={{gridTemplateColumns: 'repeat(4,minmax(10rem,1fr))'}}>
                                <td>{username}</td>
                                <td>{email}</td>
                                <td>{message}</td>
                                <td><button style={{backgroundColor:'rgba(255,80,0,0.8)',borderColor:'grey'}} onClick={()=>deleteContact(currElem._id)}><RiDeleteBin4Fill style={{ color: 'rgba(255,255, 0, 0.8)', fontSize: '3rem' }}/></button></td>
                            </tr>
                        );
                    })}

                </tbody>
            </table>
        </div>
    </>
}