import { useAuth } from "../store/auth";

export const About = () => {
    const {user} = useAuth();
    return <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome {user ? `${user.username} to Coursehub`:"to Coursehub"}</p>
                        <h1>Why Choose Us?</h1>
                        <p>
                            Unlock your full potential with CourseHub! Discover a wide range of courses tailored to
                            your interests and career goals. From in-demand skills to hobbyist pursuits, our platform
                            offers flexible and affordable learning options. Explore expert-led classes, interactive tutorials,
                            and self-paced programs. Join a community of learners and gain access to exclusive resources, support, and networking opportunities.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn primary-btn">Connect Now</button></a>
                            <a href="/services"><button className="btn secondary-btn">Learn More</button></a>
                        </div>
                    </div>

                    {/* hero images */}
                    <div className="hero-image">
                        <img src="/images/about.png"
                            width="400"
                            height="500"
                            alt="HomePage Image" />
                    </div>
                </div>
            </section>
            {/* 2nd section */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>registered courses</p>
                    </div>
                    <div className="div1">
                        <h2>10,000+</h2>
                        <p>Happy Professionals</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>Full Stack Developers</p>
                    </div>
                    <div className="div1">
                        <h2>24/7</h2>
                        <p>Service</p>
                    </div>
                </div>
            </section>
            
        </main>
    </>;
}