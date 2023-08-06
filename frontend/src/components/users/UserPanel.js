import useModal from "../../hooks/useModal";
import { UserNotifications } from "./UserNotifications";
import { UserSettings } from "./UserSettings";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

// UserPanel for Phone Screens
const UserPanelMobile = ({ username, firstName, lastName }) => {

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
            <h2 className="username">@{username}</h2>
            <h3 className="fullname">{firstName} {lastName}</h3>
        </div>
        
        <UserNotifications
            showNotifications={showNotifications}
            handleCloseNotifications={handleCloseNotifications}
        />
        <UserSettings
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
        />
        </>
    );
}

// UserPanel for Larger Screens
const UserPanelMain = ({ username, firstName, lastName }) => {

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
            <h2 className="username">@{username}</h2>
            <span>|</span>
            <h3 className="fullname">{firstName} {lastName}</h3>
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

        <UserNotifications
            showNotifications={showNotifications}
            handleCloseNotifications={handleCloseNotifications}
        />
        <UserSettings
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
        />
        </>
    );
}
 
export { UserPanelMobile, UserPanelMain };