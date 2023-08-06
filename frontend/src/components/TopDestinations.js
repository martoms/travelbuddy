import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState, useContext } from "react";
import { AllContext } from "../context/AllContext";
import { useNavigate } from "react-router-dom";

const TopDestinations = () => {

    useFetch(`${process.env.REACT_APP_API_URL}`, 'SET_TOP_DESTINATION');
    const [current, setCurrent] = useState(0);
    const { topDestinations } = useContext(AllContext);
    const navigate = useNavigate();

    if (topDestinations) {

        const AllTopDestinations = topDestinations.map(topDestination => {

            const { destination, destinationTourPackages } =  topDestination;
            let packageDurations = destinationTourPackages.map(destinationTourPackage => {
                return destinationTourPackage.packageDuration;
            })
            packageDurations.pop()
            packageDurations = packageDurations.join(' | ')

            return (
                <>
                <p className="desname" onClick={() => navigate('/destinations')}>{ destination }</p>
                <p style={{fontWeight: 700, margin: '0'}}>Tour Packages:</p>
                <p className="desloc mb-1">{ packageDurations }</p>
                </>
            )
        })

        return (
            <div className="row px-0 mt-md-5 topdes w-md-100">
                <h3 className="d-mb-block">Top Destinations:</h3>
                <div className="row p-0">
                    {/* == Top Destinations Thumbnail */}
                    <div className="col-6 col-md-5" onClick={() => navigate('/destinations')}>
                        {topDestinations[current].destination === 'Balabac Island' && <img className="tp-img topdes" src="/images/balabac6.webp" alt="balabac1" />}
                        {topDestinations[current].destination === 'Cebu-Bohol' && <img className="tp-img topdes" src="/images/bohol6.webp" alt="cebubohol1" />}
                        {topDestinations[current].destination === 'Cebu' && <img className="tp-img topdes" src="/images/cebu6.webp" alt="cebu1" />}
                        {topDestinations[current].destination === 'Coron' && <img className="tp-img topdes" src="/images/coron6.webp" alt="coron1" />}
                        {topDestinations[current].destination === 'El Nido - Coron' && <img className="tp-img topdes" src="/images/elnido6.webp" alt="elnidocoron1" />}
                        {topDestinations[current].destination === 'Puerto Princesa - El Nido' && <img className="tp-img topdes" src="/images/palawan5.webp" alt="puertopelnido1" />}
                        {topDestinations[current].destination === 'Puerto Princesa - Port Baron' && <img className="tp-img topdes" src="/images/portbaron6.webp" alt="puertopbaron1" />}
                        {topDestinations[current].destination === 'Siargao' && <img className="tp-img topdes" src="/images/siargao6.webp" alt="siargao1" />}
                    </div>
    
                    {/* == Top Destinations descriptio */}
                    <div className="col-6 col-md-7 mb-5 my-md-0" style={{position: 'relative'}}>
                        {/* == destination */}
                        <div className="row desc">
                            <h3 className="mb-0">Top Destinations:</h3>
                            { AllTopDestinations[current] }
                        </div>
                        {/* == navigation buttons */}
                        <div className="row nav prev-next">
                            <Link className="pointer">
                                <img
                                    src="/images/prev.svg"
                                    alt="prev"
                                    onClick={() => {
                                        if (current === 0) {
                                            setCurrent(AllTopDestinations.length -1);
                                        } else {
                                            setCurrent(current -1)
                                        }
                                    }}
                                />
                            </Link>
                            <Link className="pointer">
                                <img
                                    src="/images/next.svg"
                                    alt="next"
                                    onClick={() => {
                                        if (current === AllTopDestinations.length -1) {
                                            setCurrent(0);
                                        } else {
                                            setCurrent(current + 1)
                                        }
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
 
export default TopDestinations;