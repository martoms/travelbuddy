import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { AllContext } from "../../context/AllContext";

const SideNav = () => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/profile`, 'SET_USER');
    const { token, user } = useContext(AllContext);
    const [explore, setExplore] = useState('') ;
    const [experience, setExperience] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        setExplore(document.querySelector('#explore'));
        setExperience(document.querySelector('#experience'));
        setAbout(document.querySelector('#about'));
    });

    let username;
    let isAdmin;
    if (user) {
        username = user.username;
        isAdmin = user.isAdmin;
    };

    return ( 
        <div className="row">
            <div className="col-1 d-md-none d-flex justify-content-center">
                <div id="mySidenav" className="sidenav">
                    {
                        token ?
                        <>
                        <Link
                            className="profile-link"
                            to={isAdmin ? '/users/admin' : '/users/profile'}
                        >
                            <div className="sidenav-profile">
                                <div className="profile-icon"></div>
                                <span className="profile-username">
                                    {`@${username}`}
                                </span>
                            </div>
                        </Link>
                        <Link to="/logout" className="logout-btn">Logout</Link>
                        </>
                        :
                        <>
                        <Link to="/users/login" className="login-btn">Login</Link>
                        <Link to="/users/signup" className="signup-btn">Signup</Link>
                        </>
                    }
                    <hr />
                    <Link className="home-btn" to="/">Home</Link>
                    <Link 
                        className="explore-btn"
                        to='/'
                        onClick={() => {
                            explore.classList.remove('d-none')
                            explore.scrollIntoView({ behavior: 'smooth' })
                            experience.classList.add('d-none')
                            about.classList.add('d-none')
                        }}
                    >Explore</Link>
                    <Link 
                        className="experience-btn"
                        to='/'
                        onClick={() => {
                            experience.classList.remove('d-none')
                            experience.scrollIntoView({ behavior: 'smooth' })
                            explore.classList.add('d-none')
                            about.classList.add('d-none')
                        }}
                    >Experience</Link>
                    <Link 
                        className="about-btn"
                        to='/'
                        onClick={() => {
                            about.classList.remove('d-none')
                            about.scrollIntoView({ behavior: 'smooth' })
                            experience.classList.add('d-none')
                            explore.classList.add('d-none')
                        }}
                    >About Us</Link>
                    <hr />
                    <Link className="alldes" to="/destinations">All Destinations &#10095;</Link>
                    {
                        isAdmin ?
                        <></>
                        :
                        <>
                        <hr />
                        <p>Travel Plans</p>
                        <Link to="/bookings/with-guests">With Guests</Link>
                        <Link to="/bookings/with-friends">With Friends</Link>
                        <Link to="/bookings/solo">Solo</Link>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    );
}
 
export default SideNav;