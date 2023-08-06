import { Link } from "react-router-dom";

const Footer = () => {
    return ( 
        <>
            <div className="row prefooter">
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12 col-lg-6 travel-plans">
                            <h4>Travel Plans</h4>
                            <Link to='/bookings/with-guests'>
                                <p>With Guests</p>
                            </Link>
                            <Link to='/bookings/with-friends'>
                                <p>With Friends</p>
                            </Link>
                            <Link to='/bookings/solo'>
                                <p>Solo</p>
                            </Link>
                        </div>
                        <div className="col-12 col-lg-6 links">
                            <h4>Links</h4>
                            <Link to="https://github.com/martoms" target="_blank"><p><img src="/images/f-github.svg" alt="github" />GitHub</p></Link>
                            <Link to="https://www.linkedin.com/in/m-tomatao/" target="_blank"><p><img src="/images/f-linkedin.svg" alt="linkedin" />LinkedIn</p></Link>
                            <Link to="https://martoms.github.io/webportfolio/" target="_blank"><p><img src="/images/f-mylogo.svg" alt="mylogo" />Portfolio</p></Link>
                            <Link to="https://www.upwork.com/freelancers/~010e1495f770d6ef34" target="_blank"><p><img src="/images/f-upwork.svg" alt="upwork" />Upwork</p></Link>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12 col-lg-5 resources">
                            <h4>Resources</h4>
                            <Link to="https://unsplash.com/" target="_blank"><p>unsplash.com</p></Link>
                            <Link to="https://www.freepik.com/" target="_blank"><p>freepik.com</p></Link>
                            <Link to="https://www.facebook.com/jrdetravel" target="_blank"><p>JRDE Travel & Tours</p></Link>
                            <Link to="https://www.facebook.com/klikktravelexpress" target="_blank"><p>Klikk Travel Express</p></Link>
                        </div>
                        <div className="col-12 col-lg-7 contacts">
                            <h4>Contacts</h4>
                            <p><img src="/images/f-phone.svg" alt="phone" />+639105583385</p>
                            <p><img src="/images/f-email.svg" alt="phone" />tomataomarjohn@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>


            <footer>
                <p>Travel Buddy</p>
                <p>Marjohn Tomatao | Full Stack Web Developer | MERN Stack</p>
                <p>Copyright &copy; 2023. All Rights Reserved</p>
                <hr />
            </footer>
        </>
    );
}
 
export default Footer;