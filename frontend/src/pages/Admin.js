import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { AllContext } from "../context/AllContext";
import { AdminPanelMain, AdminPanelMobile } from "../components/users/AdminPanel";
import CreatePackage from "../components/users/CreatePackage";
import AdminControls from "../components/users/AdminControls";
import { Navigate } from "react-router-dom";
import { NonAdminWarning, UnauthenticatedWarning } from "../components/Warning";

const Admin = () => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/admin`, 'SET_USER');
    useFetch(`${process.env.REACT_APP_API_URL}/destinations`, 'SET_DESTINATION');
    const token = localStorage.getItem('token');
    const { user } = useContext(AllContext);

    let username;
    let firstName;
    let lastName;
    let isAdmin;
    let forbiddenAction = 'access the admin dashboard'
    if(user) {
        username = user.username
        firstName = user.firstName
        lastName = user.lastName
        isAdmin = user.isAdmin
    }
    
    return (
        token === null ?
        <>
        <Navigate to='/users/login' />
        <UnauthenticatedWarning forbiddenAction={forbiddenAction} />
        </>
        :
        (
            token && user && !isAdmin ?
            <>
            <Navigate to='/users/login' />
            <NonAdminWarning username={username} forbiddenAction={forbiddenAction} />
            </>
            :
            (
                !username ?
                <div className="loading">
                    <p>fetching data...</p>
                    <img src="/images/loading.gif" alt="loading" />
                </div>
                :
                <div id="admin" className="page container-fluid d-flex flex-column">
                    {/* COVER AND PROFILE PHOTO */}
                    <div className="row cover">
                        <div className="scrollOffsetIndicator"></div>
                        <div id="user-admin"></div>
                    </div>

                    {/* ADMIN PANEL AND SETTINGS ICONS (LG SCREEN) */}
                    <AdminPanelMain
                        username={username}
                        firstName={firstName} 
                        lastName={lastName}
                    />

                    {/* ADMIN PANEL AND SETTINGS ICONS */}
                    <AdminPanelMobile
                        username={username}
                        firstName={firstName} 
                        lastName={lastName}
                    />

                    {/* CREATE PACKAGE */}
                    <CreatePackage />

                    {/* TOUR DESTINATIONS */}
                    <AdminControls />
                </div>
            )
        )
    );
}
 
export default Admin;