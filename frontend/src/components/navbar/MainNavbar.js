import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AllContext } from '../../context/AllContext';

const MainNavbar = () => {

    const { user } = useContext(AllContext);
    const [explore, setExplore] = useState('') ;
    const [experience, setExperience] = useState('');
    const [about, setAbout] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        setExplore(document.querySelector('#explore'));
        setExperience(document.querySelector('#experience'));
        setAbout(document.querySelector('#about'));
        setToken(localStorage.getItem('token'));
    });
    
    let isAdmin;
    if (user) {
        isAdmin = user.isAdmin;
    }

    return ( 
        <Navbar id="navbar2" className="navbar d-none d-md-flex px-5 navbar-expand-md fixed-top-transparent">
            {/* Brand Logo Starts */}
            <Link className="navbar-brand" to="/">
                <img src="/images/travelbuds.svg" alt="my_logo" id="brand_logo" />
            </Link>
            {/* Brand Logo Ends */}

            {/* Nav Links Starts */}
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="smooth-scroll" to="/">Home</Link>
                </li>
                {
                    isAdmin ?
                    <></>
                    :
                    <li className="nav-item">
                        <div className="dropdown">
                            <Link className="smooth-scroll">Travel Plans</Link>
                            <div className="dropdown-content">
                                <Link to="/bookings/with-guests">With Guests</Link>
                                <Link to="/bookings/with-friends">With Friends</Link>
                                <Link to="/bookings/solo">Solo</Link>
                            </div>
                        </div>
                    </li>
                }
                <li className="nav-item">
                <Link className="smooth-scroll" to="/destinations">All Destinations</Link>
                </li>
                <li className="nav-item">
                    <div className="dropdown">
                        <Link className="smooth-scroll">More</Link>
                    <div className="dropdown-content">
                        <Link
                            className="explore-btn"
                            to='/'
                            onClick={() => {
                                explore.classList.remove('d-none')
                                explore.scrollIntoView({ behavior: 'smooth' })
                                experience.classList.add('d-none')
                                about.classList.add('d-none')
                            }}
                        >
                        Explore</Link>
                        <Link
                            className="experience-btn"
                            to='/'
                            onClick={() => {
                                experience.classList.remove('d-none')
                                experience.scrollIntoView({ behavior: 'smooth' })
                                explore.classList.add('d-none')
                                about.classList.add('d-none')
                            }}
                        >
                        Experience</Link>
                        <Link
                            className="about-btn"
                            to='/'
                            onClick={() => {
                                about.classList.remove('d-none')
                                about.scrollIntoView({ behavior: 'smooth' })
                                experience.classList.add('d-none')
                                explore.classList.add('d-none')
                            }}
                        >
                        About Us</Link>
                    </div>
                    </div>
                </li>
            </ul>
            </div>
            {/* Nav Links Ends */}

            {/* User Buttons Start */}
            <div className="user-btns">
                {
                    token ?
                    <>
                    <Link to="/logout" className="logout-btn">Logout</Link>
                    {
                        isAdmin ?
                        <Nav.Link as={NavLink} to='/users/admin' className="profile-icon"></Nav.Link>
                        :
                        <Nav.Link as={NavLink} to='/users/profile' className="profile-icon"></Nav.Link>
                    }
                    </>
                    :
                    <>
                    <Link className="login" to="/users/login">Login</Link>
                    <Link className="signup" to="/users/signup">Signup</Link>
                    </>
                }
            </div>
            {/* User Buttons End */}
        </Navbar>
    );
}
 
export default MainNavbar;