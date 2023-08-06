import { AllDestinationsMain, AllDestinationsMobile } from "../components/destinations/AllDestinations";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";

const Destinations = () => {
    const { destinations, error, isPending } = useContext(AllContext);
    useFetch(`${process.env.REACT_APP_API_URL}/destinations`, 'SET_DESTINATION');

    return ( 
        <div id="destinations" className="page container-fluid d-flex flex-column">
            <div className="container-fluid">
                <h2 className="current-page scrollOffsetIndicator">All Destination</h2>
                <h1>Choose your Adventure!</h1>
                <div className="row">
                    { isPending && <div>Loading....</div> }
                    { error && <div>{ error }</div> }
                    { destinations && <AllDestinationsMobile destinations={ destinations } /> }

                    { isPending && <div>Loading....</div> }
                    { error && <div>{ error }</div> }
                    { destinations && <AllDestinationsMain destinations={ destinations }  /> }
                </div>
            </div>
        </div>
    );
}
 
export default Destinations;