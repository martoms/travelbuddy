import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
import { UserPanelMobile, UserPanelMain } from "../components/users/UserPanel";
import { ToursHistoryMain, ToursHistoryMobile } from "../components/users/ToursHistory";
import UpcomingTours from "../components/users/UpcomingTours";
import { Navigate } from "react-router-dom";
import { AdminWarning, UnauthenticatedWarning } from "../components/Warning";

const Profile = () => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/profile`, 'SET_USER');
    useFetch(`${process.env.REACT_APP_API_URL}/bookings/with-friends`, 'SET_TOURPACKAGE');
    const { user } = useContext(AllContext);
    const token = localStorage.getItem('token');

    let username;
    let firstName;
    let lastName;
    let isAdmin;
    let bookings;
    let forbiddenAction = 'access the user profile'
    if(user) {
        username = user.username
        firstName = user.firstName
        lastName = user.lastName
        isAdmin = user.isAdmin
        bookings = user.bookings
    }
    
    return (
        token === null ?
        <>
        <Navigate to='/users/login' />
        <UnauthenticatedWarning forbiddenAction={forbiddenAction} />
        </>
        :
        (
            token &&  user && isAdmin ?
            <>
            <Navigate to='/users/login' />
            <AdminWarning username={username} forbiddenAction={forbiddenAction} />
            </>
            :
            (   
                !username ?
                <div className="loading">
                    <p>fetching data...</p>
                    <img src="/images/loading.gif" alt="loading" />
                </div>
                :
                <div id="profile" className="page container-fluid d-flex flex-column">
                    {/* COVER AND PROFILE PHOTO */}
                    <div className="row cover">
                        <div className="scrollOffsetIndicator"></div>
                        <div id="user-profile"></div>
                    </div>

                    {/* USER PANEL AND SETTINGS ICONS (LG SCREEN) */}
                    <UserPanelMain
                        username={username}
                        firstName={firstName} 
                        lastName={lastName}
                    />

                    {/* USER PANEL AND SETTINGS ICONS */}
                    <UserPanelMobile
                        username={username}
                        firstName={firstName} 
                        lastName={lastName}
                    />

                    {/* TOURS HISTORY (PHONE SCREENS) */}
                    <ToursHistoryMobile />

                    {/* MAIN DASHBOARD */}
                    <div className="row dashboard">

                        {/* TOURS HISTORY (MAIN) */}
                        <ToursHistoryMain />

                        {/* UPCOMING TOURS */}
                        <UpcomingTours bookings={bookings} />

                    </div>
                </div>
            )
        )
    );
}
 
export default Profile;