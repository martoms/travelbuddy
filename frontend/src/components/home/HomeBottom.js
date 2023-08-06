import Explore from "./Explore";
import Experience from "./Experience";
import About from "./About";

const HomeBottom = () => {
    return ( 
        <>
            <div id="bottom" className="container-fluid d-flex flex-column">
                <img src='/images/summer.svg' alt='transition' />
                <Explore />
                <Experience />
                <About />
            </div>
        </>
    );
}
 
export default HomeBottom;