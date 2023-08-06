import { Navbar } from 'react-bootstrap';
import NavToggle from '../script_dependencies/NavToggle';
import { Link } from 'react-router-dom';

const MobileNav = () => {
    return ( 
        <>
          <Navbar id="navbar" className="navbar d-md-none fixed-top-transparent">
              {/* Collapse button */}
              <button className="navbar-toggler hamburger-button" type="button" onClick={NavToggle} style={{ zIndex: 10 }}>
                <div className="animated-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
              </button>


              {/* Navbar brand */}
              <div className="ms-auto">
                <Link className="navbar-brand" to="/">
                    <img src="/images/travelbuds.svg" alt="my_logo" id="brand_logo" />
                </Link>
              </div>
          </Navbar>
        </>
    );
}


export default MobileNav;