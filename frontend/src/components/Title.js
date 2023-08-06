import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Title = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitleFromRoute(location.pathname);
  }, [location]);

  const getTitleFromRoute = (path) => {
    switch (path) {
        case '/':
          return 'TravelBuddy | Home';
        case '/users/signup':
          return 'TravelBuddy | Signup';
        case '/users/login':
          return 'TravelBuddy | Login';
        case '/destinations':
          return 'TravelBuddy | Destinations';
        case '/bookings/with-guests':
          return 'TravelBuddy | Booking with Guests';
        case '/bookings/with-friends':
          return 'TravelBuddy | Booking with Friends';
        case '/bookings/solo':
          return 'TravelBuddy | Booking Solo';
        case '/users/profile':
          return 'TravelBuddy | Profile';
        case '/users/admin':
          return 'TravelBuddy | Admin';
        default:
          return 'TravelBuddy';
      }
  };

  return null; 
};

export default Title;
