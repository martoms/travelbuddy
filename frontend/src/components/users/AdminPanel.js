import useModal from "../../hooks/useModal";
import { AdminUserNotifications } from "./UserNotifications";
import { AdminUserSettings } from "./UserSettings";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

// AdminPanel for Phone Screens
const AdminPanelMobile = ({ username, firstName, lastName }) => {

    const {
        showSettings, handleCloseSettings, handleShowSettings,
        showNotifications, handleCloseNotifications, handleShowNotifications
    } = useModal();

    const { user } = useContext(AllContext);
    
    let unreadCount;
    if (user) {
        const unReadNotifs = user.notifications.filter(notif => !notif.isRead)
        
        unreadCount = unReadNotifs.length
    }

    return ( 
        <>
        <div className="row personal-info d-lg-none">
            <div className="icons">
                <span className="user-notifications" onClick={handleShowNotifications}>
                    <img src="/images/notification.svg" alt="settings" />
                    {
                        unreadCount === 0 ?
                        <></>
                        : 
                        unreadCount < 10 ?
                        <span>{ unreadCount }</span>
                        :
                        <span>9+</span>
                    }
                </span>
                <span className="user-settings" onClick={handleShowSettings}>
                    <img src="/images/settings.svg" alt="settings" />
                </span>
            </div>
            <h2 className="username">@{ username } (admin)</h2>
            <h3 className="fullname">{ firstName } { lastName }</h3>
        </div>

        <AdminUserNotifications
            showNotifications={showNotifications}
            handleCloseNotifications={handleCloseNotifications}
        />
        <AdminUserSettings
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
        />
        </>
    );
};

// AdminPanel for Larger Screens
const AdminPanelMain = ({ username, firstName, lastName }) => {

     const {
        showSettings, handleCloseSettings, handleShowSettings,
        showNotifications, handleCloseNotifications, handleShowNotifications
    } = useModal();

    const { user } = useContext(AllContext);
    
    let unreadCount;
    if (user) {
        const unReadNotifs = user.notifications.filter(notif => !notif.isRead)
        
        unreadCount = unReadNotifs.length
    }

    return (
        <>
        <div className="row personal-info d-none d-lg-flex">
            <h2 className="username">@{ username } (admin)</h2>
            <span>|</span>
            <h3 className="fullname">{ firstName } { lastName }</h3>
            <div className="icons d-flex">
                <span className="user-notifications pointer" onClick={handleShowNotifications}>
                    <img src="/images/notification.svg" alt="settings" />
                    {
                        unreadCount === 0 ?
                        <></>
                        : 
                        unreadCount < 10 ?
                        <span>{ unreadCount }</span>
                        :
                        <span>9+</span>
                    }
                </span>
                <span className="user-settings pointer" onClick={handleShowSettings}>
                    <img src="/images/settings.svg" alt="settings" />
                </span>
            </div>
        </div>

         <AdminUserNotifications
            showNotifications={showNotifications}
            handleCloseNotifications={handleCloseNotifications}
        />
        <AdminUserSettings
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
        />
        </>
    )
};
 
export { AdminPanelMobile, AdminPanelMain };