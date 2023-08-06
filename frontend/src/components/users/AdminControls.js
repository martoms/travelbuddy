import AdminControlsMain from "./AdminControlsMain";
import AdminDestinations from "./AdminDestinations";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { AdminRetrieveUsersMobile } from "./AdminRetrieveUsers";

const AdminControls = () => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/admin/all-users`, 'SET_ALL_USERS');
    useFetch(`${process.env.REACT_APP_API_URL}/users/admin/bookings`, 'SET_BOOKING');
    useFetch(`${process.env.REACT_APP_API_URL}/users/admin/tourpackages`, 'SET_TOURPACKAGE');
    const { bookings, allUsers } = useContext(AllContext);

    return ( 
        <div className="row destinations">
            <h3 className="d-lg-none">Users:</h3>
            {/* Users Accordion (phone screen) */}
            {
                !allUsers ?
                <img src="/images/loading.gif" alt="loading" className="d-lg-none" />
                :
                <AdminRetrieveUsersMobile />
            }
            <h3 style={{marginTop: '1rem'}} className="d-lg-none">Destinations:</h3>
            {/* Destinations Accordion (phone screen) */}
            {
                !bookings ?
                <img src="/images/loading.gif" alt="loading" />
                :
                <AdminDestinations />
            }
            {/* LARGE SCREEN DESTINATIONS AND BOOKINGS */}
            <AdminControlsMain />
        </div>
    );
}
 
export default AdminControls;