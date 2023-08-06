import { useContext, useState } from "react";
import { AllContext } from "../../context/AllContext";
import { Accordion } from "react-bootstrap";
import useReformatDate from "../../hooks/useReformatDate";

const AdminBookings = ({ allBookings }) => {

    const { reformatDate } = useReformatDate()
    const [fetchedTourists, setFetchedTourists] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const { token } = useContext(AllContext);

    if (allBookings.length !== 0) {

        const bookings = allBookings[0].map((booking) => {
            const {
                _id,
                packageDuration,
                tourStarts,
                tourEnds,
                travelPlan
            } = booking

            const dates = reformatDate(tourStarts, tourEnds)
    
            const fetchWithId = (_id) => {
    
                fetch(`${process.env.REACT_APP_API_URL}/users/admin/bookings/${_id}`, {
                    headers: {'Authorization': `Bearer ${token}`}
                })
                .then(res => {
                    if (!res.ok) {
                        throw Error('There seems to be a problem fetching data.');
                    } else {
                        return res.json();
                    };  
                })
                .then(data => {
                    setIsPending(false)
                    setFetchedTourists(data)
                    return data
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        setIsPending(false)
                        console.log(err);
                    }
                })
            };
    
            let tourists;
            let touristCount = 0;
            
            if (fetchedTourists) {
                tourists = fetchedTourists.map((tourist, i) => {
                    const { username, fullname, buddies } = tourist;
                    touristCount++
                    let userBuddies;
                    if (buddies && buddies.length !== 0) {
                        userBuddies = buddies.map((buddy, i) => {
                            
                            if (buddy.length !== 0) {
                                touristCount++
                            }
                            return (
                                <li key={i}>{`🔵 ${buddy}`}</li>
                            )
                        });
                    };
    
                    return (
                        <li key={i}>
                            <p style={{margin: '0'}}>
                                <span className="bookings-username">{username}</span> <span className="d-none d-lg-inline-block">{`(${fullname})`}</span>
                            </p>
                            <p className="d-lg-none">
                                {`(${fullname})`}
                            </p>
                            {
                                buddies && buddies[0].length !== 0 &&
                                <>
                                <p className="buddies-list">
                                    Buddies:
                                </p>
                                <ul className="user-buddies">
                                    { userBuddies }
                                </ul>
                                <br />
                                </>
                            }
                        </li>
                    )
                })
            }
    
    
            return (
                <Accordion.Item
                    key={_id}
                    eventKey={_id}
                    onClick={() => {fetchWithId(_id); setFetchedTourists(null)}}
                    className="destination-bookings destinations-list-item pointer"
                >
                    <Accordion.Header className="admin-control-item">
                        { dates } | { packageDuration } | { travelPlan }
                    </Accordion.Header>
                    <Accordion.Body className="admin-bookings">
                        {
                            isPending || fetchedTourists === null ?
                            <p>Fetching data...<img src="/images/loading.gif" alt="loading" style={{height: '50px'}} /></p>
                            :
                            <>
                            <h3>{`Tourists: (${touristCount})`}</h3>
                            <ol>
                                {tourists}
                            </ol>
                            </>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            )
        });
    
        return bookings
    };

}
 
export default AdminBookings;