import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//const URL = `${LocalHost}/api/auth/login`;


export const Login = () => {

    //state hooks  
    //user -- state variable setUser -- updated function
    const [user, setUser] = useState({ //hook
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    //calling storeToken function
    const { storeTokeninLS, LocalHost } = useAuth();
    const [showPassword, setShowPassword] = useState(false); // New state to toggle password visibility
    //handling the input
    const handleInput = (e) => {
        //console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user, //spread operator
            //updates values for particular field and returns with previous form data(user)
            [name]: value, //dynamic names(changes) 
        });
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    //handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // stop reloading of a page after submission
        console.log(user);
        try {
            const response = await fetch(`${LocalHost}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            const res_data = await response.json();
            console.log(res_data);
            if (res_data.message == "Invalid Credentials") {
                return toast.error(`Invalid Credentials`);
            }
            if (response.ok) {
                storeTokeninLS(res_data.token);
                // localStorage.setItem("token",res_data.token);
                setUser({
                    email: "",
                    password: "",
                });

                //getting string name only before @
                toast.success(`login successful. Welcome to CourseHub.`);

                navigate("/");
            }
            else {
                toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
            }
            console.log(response);
        }
        catch (error) {
            console.log("Invalid Credentials");
        }
    }
    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt="Let's fill the login form"
                                width="400"
                                height="400"
                            />
                        </div>
                        {/* Registrartion form */}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Login Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>

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
                                <button type="submit" className="btn btn-submit">Login Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>;
}
