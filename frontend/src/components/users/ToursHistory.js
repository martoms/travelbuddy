import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import useFetch from "../../hooks/useFetch";
import { Accordion } from "react-bootstrap";
import ToursHistoryDetails from "./ToursHistoryDetails";
import ExperienceForm from "./ExperienceForm";


// Tours History for Phone Screens
const ToursHistoryMobile = () => {

    const { isPending } = useFetch(`${process.env.REACT_APP_API_URL}/users/profile/tours-history`, 'SET_TOURS_HISTORY');
    const { toursHistory } = useContext(AllContext);

    return ( 
        <div className="row tours-history d-lg-none">
            <Accordion id="tours-history">
                <Accordion.Item eventKey="0">
                <Accordion.Header>
                    <div>
                        <img className="d-none d-lg-inline-block" src="/images/history.svg" alt="history" />
                        <img className="d-lg-none" src="/images/history-white.svg" alt="history" />
                        <span>Tours History</span>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    {/* Individual Tours */}
                    <div className="tour">
                        {
                            isPending ?
                            <div>fetching data...</div>
                            :
                            <ToursHistoryDetails toursHistory={toursHistory} />
                        }
                    </div>

                    {/* Add Experience */}
                    {
                        toursHistory && toursHistory.addExperience &&
                        <>
                        <div className="finished">
                            <p>You just finished a tour.</p>
                            <p>Share your experience now!</p>
                        </div>
                        {/* Experience Form */}
                        <div>
                            <ExperienceForm toursHistory={toursHistory} />
                        </div>
                        </>
                    }
                    
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

// Tours History for Larger Screens
const ToursHistoryMain =() => {

    const { isPending } = useFetch(`${process.env.REACT_APP_API_URL}/users/profile/tours-history`, 'SET_TOURS_HISTORY');
    const { toursHistory } = useContext(AllContext);

    return (
        <div className="d-none d-lg-block col-4 tours-history">
            <div>
                <img src="/images/history.svg" alt="history" />
                <span>Tours History</span>
            </div>

            {/* Individual Tours */}
            <div className="tour">
            {
                isPending ?
                <div>fetching data...</div>
                :
                <ToursHistoryDetails toursHistory={toursHistory} />
            }
            </div>
            {/* Add Experience */}
            {
                toursHistory && toursHistory.addExperience &&
                <>
                <div className="finished">
                    <p>You just finished a tour.</p>
                    <p>Share your experience now!</p>
                </div>
                {/* Experience Form */}
                <div>
                    <ExperienceForm toursHistory={toursHistory} />
                </div>
                </>
            }
        </div>
    )
};
 
export {ToursHistoryMobile, ToursHistoryMain};