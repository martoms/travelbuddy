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
          return 'TravelBuds | Home';
        case '/users/signup':
          return 'TravelBuds | Signup';
        case '/users/login':
          return 'TravelBuds | Login';
        case '/destinations':
          return 'TravelBuds | Destinations';
        case '/bookings/with-guests':
          return 'TravelBuds | Booking with Guests';
        case '/bookings/with-friends':
          return 'TravelBuds | Booking with Friends';
        case '/bookings/solo':
          return 'TravelBuds | Booking Solo';
        case '/users/profile':
          return 'TravelBuds | Profile';
        case '/users/admin':
          return 'TravelBuds | Admin';
        default:
          return 'TravelBuds';
      }
  };

  return null; 
};

export default Title;
