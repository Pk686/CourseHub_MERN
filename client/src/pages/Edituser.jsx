import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
export const Edituser = () => {
    const [data,setData] = useState({
        username:"",
        email:"",
        phone:"",
    });
    const params = useParams();
    const {authToken,LocalHost} = useAuth();
    //getting single user data
    const getuserData = async() =>{
        try{
            const response = await fetch(`${LocalHost}/api/admin/users/${params.id}`,{
                method:"GET",
                headers:{Authorization:authToken},
            });
            const data = await response.json();
            //console.log(getData);
            // if(response.ok){
            //     getAllUsers();
            // }
            setData(data);
            console.log(params);
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getuserData();
    },[])
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data, //spread operator
            //updates values for particular field and returns with previous form data(user)
            [name]: value, //dynamic names(changes) 
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const response = await fetch(`${LocalHost}/api/admin/users/update/${params.id}`,{
                method:"PATCH",
                headers:{"Content-Type":"application/json",Authorization:authToken},
                body:JSON.stringify(data),
            });
            //console.log(response);
            if(response.ok){
                toast.success("User Updated Successfully");
                navigate("/admin/users");
            }
            else{
                toast.error("Cannot Update User Data");
            }
        }
        catch(error){
            console.log(error);
        }
    };
    return <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update User Data</h1>
            </div>
            {/* contact page main */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/ai.png"
                        alt="update user data"/>
                </div>
                <section className="section-form">
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text"
                                name="username"
                                placeholder="username"
                                id="username"
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}
                                required   
                            />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email"
                                name="email"
                                placeholder="enter your email"
                                id="email"
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput} 
                                required   
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">phone</label>
                            <input type="number"
                                name="phone"
                                placeholder="Mobile"
                                id="phone"
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                                required       
                            />
                        </div>
                        <div>
                            <button type="submit" className="btn btn-submit">Update</button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </>;
}