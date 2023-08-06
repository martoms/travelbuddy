import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const TravelPlanOptionsMobile = ({handleShowTravelPlanInfo}) => {

    const [withGuests, setWithGuests] = useState('')
    const [withFriends, setWithFriends] = useState('')
    const [solo, setSolo] = useState('')

    useEffect(() => {
        setWithGuests(document.getElementById('with-guests'))
        setWithFriends(document.getElementById('with-friends'))
        setSolo(document.getElementById('solo'))
    }, [])


    return ( 
        <div className="col-12 travel-options d-lg-none">
            <p>Want to change plans?</p>
            <div>
                { withGuests && (
                    <>
                    <Link to={'/bookings/with-friends'}>
                        <img src="/images/with-friends.svg" alt="with friends" />
                    </Link>
                    <img className="info" src="/images/info.svg" alt="info" onClick={handleShowTravelPlanInfo} />
                    <Link to={'/bookings/solo'}>
                        <img src="/images/solo.svg" alt="solo" />
                    </Link>
                    </>
                ) }
                { withFriends && (
                    <>
                    <Link to={'/bookings/with-guests'}>
                        <img src="/images/with-guests.svg" alt="with guests" />
                    </Link>
                    <img className="info" src="/images/info.svg" alt="info" onClick={handleShowTravelPlanInfo} />
                    <Link to={'/bookings/solo'}>
                        <img src="/images/solo.svg" alt="solo" />
                    </Link>
                    </>
                ) }
                { solo && (
                    <>
                    <Link to={'/bookings/with-guests'}>
                        <img src="/images/with-guests.svg" alt="with guests" />
                    </Link>
                    <img className="info" src="/images/info.svg" alt="info" onClick={handleShowTravelPlanInfo} />
                    <Link to={'/bookings/with-friends'}>
                        <img src="/images/with-friends.svg" alt="with-friends" />
                    </Link>
                    </>
                ) }
            </div>
        </div>
    );
};

const TravelPlanOptionsMain = ({handleShowTravelPlanInfo}) => {

    const [withGuests, setWithGuests] = useState('')
    const [withFriends, setWithFriends] = useState('')
    const [solo, setSolo] = useState('')

    useEffect(() => {
        setWithGuests(document.getElementById('with-guests'))
        setWithFriends(document.getElementById('with-friends'))
        setSolo(document.getElementById('solo'))
    }, [])


    return ( 
        <Form.Group className="section travel-option-lg d-none d-lg-block">
            {
                withGuests &&
                <h6>You're Traveling with Guests!</h6>
            }
            {
                withFriends &&
                <h6>You're Traveling with Friends!</h6>
            }
            {
                solo &&
                <h6>You're Traveling with Solo!</h6>
            }
            <Form.Group>
                <Form.Label>Want to change plans?
                <img className="info" src="/images/info.svg" alt="info" onClick={handleShowTravelPlanInfo} />
                </Form.Label>
            </Form.Group>
            <Form.Group>
            { withGuests && (
                <>
                <Link to={'/bookings/with-friends'}>
                    <img src="/images/with-friends.svg" alt="with friends" />
                </Link>
                <Link to={'/bookings/solo'}>
                    <img src="/images/solo.svg" alt="solo" />
                </Link>
                </>
            ) }
            { withFriends && (
                <>
                <Link to={'/bookings/with-guests'}>
                    <img src="/images/with-guests.svg" alt="with guests" />
                </Link>
                <Link to={'/bookings/solo'}>
                    <img src="/images/solo.svg" alt="solo" />
                </Link>
                </>
            ) }
            { solo && (
                <>
                <Link to={'/bookings/with-guests'}>
                    <img src="/images/with-guests.svg" alt="with guests" />
                </Link>
                <Link to={'/bookings/with-friends'}>
                    <img src="/images/with-friends.svg" alt="with-friends" />
                </Link>
                </>
            ) }
            </Form.Group>
        </Form.Group>
    );
};
 
export { TravelPlanOptionsMobile, TravelPlanOptionsMain };