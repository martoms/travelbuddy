import { Link } from "react-router-dom";
import TopDestinations from "./TopDestinations";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";

const Landing = () => {

    // const { topDestinations } = useContext(AllContext);

    return ( 
        <div id="landing" className="container-fluid vw-100">
            <div className="row">
                {/* Header starts */}
                <div className="row px-0 mb-1 header scrollOffsetIndicator">
                    <h1>Your Ultimate Travel Companion</h1>
                    <p>Find, Plan, and Experience the Perfect Getaway!</p>
                </div>
                {/* Header ends */}

                {/* Top Destinations */}
                <TopDestinations />

                {/* Travel Plans Starts */}
                <div className="row mt-5 px-0 plan">
                    <h3>How would you like to travel?</h3>
                    <Link to="/bookings/with-guests">With Guests<img src="/images/arrowr.svg" alt="arrow right" /></Link>
                    <Link to="/bookings/with-friends">With Friends<img src="/images/arrowr.svg" alt="arrow right" /></Link>
                    <Link to="/bookings/solo">Solo<img src="/images/arrowr.svg" alt="arrow right" /></Link>
                </div>
                {/* Travel Plans Ends */}
            </div>
        </div>
    );
}
 
export default Landing;