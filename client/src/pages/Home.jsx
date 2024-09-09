
export const Home = () => {
    return <>
        <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Empower Your Future with Our Expert-Led Courses</p>
                        <h1>Welcome to CourseHub</h1>
                        <p>
                            Ready to Level Up? Unlock new skills, new opportunities, and a new you with CourseHub's expert-led courses. 
                            Start upskilling today and discover a world of possibilities! Our courses are designed to help you stay ahead 
                            of the curve, boost your career, and transform your life. With flexible and affordable learning options, you can achieve your goals on your own terms. 
                            
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn primary-btn">Connect Now</button></a>
                            <a href="/services"><button className="btn secondary-btn">Learn More</button></a>
                        </div>
                    </div>

                    {/* hero images */}
                    <div className="hero-image">
                        <img src="/images/home.png"
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
            {/* 3rd section */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* hero images */}
                    <div className="hero-image">
                        <img src="/images/design.png"
                            width="400"
                            height="500"
                            alt="HomePage Image" />
                    </div>
                    <div className="hero-content">
                        <p>We are here to help you</p>
                        <h1>Get Started Today</h1>
                        <p>
                            Ready to take the first step towards a more dependable courses and guidance to upskill
                            IT technnolgies? Contact us today for a free webinar and let's discuss how
                            we can help your skills thrive in the digital age.
                        </p>
                        <div className="btn btn-group">
                            <a href="/contact"><button className="btn primary-btn">Connect Now</button></a>
                            <a href="/services"><button className="btn secondary-btn">Learn More</button></a>
                        </div>
                    </div>

                </div>
            </section>
            
        </main>
    </>;
}