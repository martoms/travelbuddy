import { createContext, useReducer } from "react";

const AllContext = createContext();

const allContextReducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_TOURPACKAGE':
            return {
                ...state,
                tourPackages: action.payload
            };
        case 'SET_DESTINATION':
            return {
                ...state,
                destinations: action.payload
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_UPCOMING_TOURS':
            return {
                ...state,
                upcomingTours: action.payload
            };
        case 'SET_TOURS_HISTORY':
            return {
                ...state,
                toursHistory: action.payload
            };
        case 'SET_BOOKING':
            return {
                ...state,
                bookings: action.payload
            };
        case 'SET_TOURIST':
            return {
                ...state,
                tourists: action.payload
            };
        case 'SET_ALL_USERS':
            return {
                ...state,
                allUsers: action.payload
            };
        case 'SET_NOTIFICATIONS_LIST':
            return {
                ...state,
                notificationsList: action.payload
            };
        case 'SET_NOTIFICATION_DETAILS':
            return {
                ...state,
                notificationDetails: action.payload
            };
        case 'SET_EXPERIENCE':
            return {
                ...state,
                experiences: action.payload
            };
        case 'SET_TOP_DESTINATION':
            return {
                ...state,
                topDestinations: action.payload
            };
        default:
            return state
    }
};

const AllContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(allContextReducer, {
        token: localStorage.getItem('token'),
        user: null,
        tourPackages: null,
        destinations: null,
        upcomingTours: null, 
        toursHistory: null,
        bookings: null,
        tourists: null,
        allUsers: null,
        notificationsList: null,
        notificationDetails: null,
        experiences: null,
        topDestinations: null
    });

    return (
        <AllContext.Provider value={{ ...state, dispatch }} >
            { children }
        </AllContext.Provider>
    );
};


// Exports
export {
    AllContext,
    allContextReducer,
    AllContextProvider
}