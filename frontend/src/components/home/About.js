import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const About = () => {

    const [explore, setExplore] = useState('') ;
    const [experience, setExperience] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        setExplore(document.querySelector('#explore'));
        setExperience(document.querySelector('#experience'));
        setAbout(document.querySelector('#about'));
    });


    return ( 
        <div id="about" className="row d-none">

            {/* Toggles Start */}
            <div className="row bottom-btns d-none d-md-flex">
            <div
                className="explore-btn inactive"
                onClick={() => {
                    explore.classList.remove('d-none')
                    explore.scrollIntoView({ behavior: 'smooth' })
                    experience.classList.add('d-none')
                    about.classList.add('d-none')
                }}
            >
                <h1 className="row"><img id="explore-toggle-img" src="/images/explore-white.svg" alt="explore" />Explore</h1>
            </div>
            <div
                className="experience-btn inactive"
                onClick={() => {
                    experience.classList.remove('d-none')
                    experience.scrollIntoView({ behavior: 'smooth' })
                    explore.classList.add('d-none')
                    about.classList.add('d-none')
                }}
            >
                <h1 className="row"><img id="experience-toggle-img" src="/images/experience-white.svg" alt="experience" />Experience</h1>
            </div>
            <div className="about-btn active">
                <h1 className="row"><img id="about-toggle-img" src="/images/about.svg" alt="about" />About</h1>
            </div>
            </div>
            {/* Toggles End */}

            {/* == Title */}
            <h1 className="row d-md-none"><img src="/images/about.svg" alt="about" />About Us</h1>
            <p className="d-md-inline-block">This Site's Actual Purpose</p>

            {/* == Message */}
            <div className="message">
                <img className="profile-pic" src="/images/marjohn.jpg" alt="marjohn" />
                <p>
                    Hi there!
                </p>
                <p>
                    I'm Marjohn Tomatao, and I appreciate you taking the time to explore this website I've crafted as part of our third and final capstone project at Zuitt Coding Bootcamp, where I am currently attending a coding bootcamp. The objective was to create an exceptional online e-commerce site using the MERN Stack for the frontend client side, and backend server. Ultimately, this project showcases my skills in Full Stack Web Development using the MERN Stack which comprises of the MongoDB, Express.js, React.js, and Node.js, along with HTML, CSS, and JavaScript.
                </p>
                <p>
                    Now, let's discuss the user interface. Have you been enjoying it so far? It's not just about the frontend design; everything is fully functional! You can book tours, write comments, and delve deeper into all the amazing features. Rest assured, the booking process is merely a simulated payment to demonstrate the site's functionality, so no actual charges will be incurred. <span>Feel free to continue viewing what this site has in stored for you!</span>
                </p>
                <Link to='/destinations'>
                    <span>View all destinations</span>
                </Link>
                <p>
                    If you like my project and have any further inquiries, please feel free to reach out through the provided contact profiles in the footer below. Cheers!
                </p>
            </div>
        </div>
    );
}
 
export default About;