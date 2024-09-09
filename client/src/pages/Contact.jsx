import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    //verifying jwt token and auto-filling contact form by getting user data from backend
    const [userData, setUserData] = useState(true);
    const { user,LocalHost} = useAuth();
    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        })
        setUserData(false);
    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // setContact({
        //     ... contact,
        //     [name]:value,
        // });
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop reloading of a page after submission
        // console.log(contact);
        try {
            const response = await fetch(`${LocalHost}/api/form/contact`, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(contact),
            })
            if (response.ok) {

                setContact({
                    username: "",
                    email: "",
                    message: "",
                });
                toast.success("Message Sent Successfully");
            }
        }
        catch (error) {
            console.log("contact form", error);
        }

    }

    return <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact Us</h1>
            </div>
            {/* contact page main */}
            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/support.png"
                        alt="we are always ready to help" />
                </div>
                <section className="section-form">
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text"
                                name="username"
                                placeholder="username"
                                id="username"
                                required
                                autoComplete="off"
                                value={contact.username}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="email"
                                name="email"
                                placeholder="enter your email"
                                id="email"
                                required
                                autoComplete="off"
                                value={contact.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div>
                            <label htmlFor="message">message</label>
                            <textarea name="message" id="message" cols="30" rows="6"
                                required
                                autoComplete="off" value={contact.message}
                                onChange={handleInput} >
                            </textarea>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-submit">Submit</button>
                        </div>
                    </form>
                </section>
            </div>

            {/* Embed a map */}
            <section className="mb-3">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d463751.88667095645!2d83.75539458906248!3d24.75907650000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398c515ee098670b%3A0xb79bbe172b2451c0!2sTRENDS!5e0!3m2!1sen!2sin!4v1724916204666!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </section>
    </>;
}