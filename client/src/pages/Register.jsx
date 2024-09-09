import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//const URL = `${LocalHost}/api/auth/register`;

export const Register = () => {
    //state hooks  
    //user -- state variable setUser -- updated function
    const [user, setUser] = useState({ //hook
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const navigate = useNavigate();

    //calling storeToken function
    const {storeTokeninLS,LocalHost} = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    //handling the input values
    const handleInput = (e) => {
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user, //spread operator
            [name]: value, //dynamic names(changes)
        });
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // stop reloading of a page after submission
        //console.log(user);
        try {
            //handle frontend conenection to backend
            const response = await fetch(`${LocalHost}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            console.log(res_data);
            if (response.ok) {
                storeTokeninLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                });
                const name = user.username;
                toast.success(`hi ${name}, Registration is Successful. Welcome to Coursehub !`);
                navigate("/");
            }
            else{
                toast.error(res_data.extradetails?res_data.extradetails:res_data.message);
            }
            console.log(response);
        }
        catch (error) {
            console.log("register", error);
        }
    }
    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" alt="A girl is trying to do Registration"
                                width="400"
                                height="400"
                            />
                        </div>
                        {/* Registrartion form */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">username</label>
                                    <input type="text"
                                        name="username"
                                        placeholder="username"
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value={user.username}
                                        onChange={handleInput} />
                                </div>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input type="email"
                                        name="email"
                                        placeholder="enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">phone No</label>
                                    <input type="number"
                                        name="phone"
                                        placeholder="phone"
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="password-field">
                                    <label htmlFor="password">password</label>
                                    <div className="password-input-container">
                                    <input type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                    </div>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>;
}
