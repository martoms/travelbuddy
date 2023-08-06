// Dependency
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
// Components
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import Title from './components/Title';
// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Destinations from './pages/Destinations';
import BookingWithGuests from './pages/BookingWithGuests';
import BookingWithFriends from './pages/BookingWithFriends';
import BookingSolo from './pages/BookingSolo';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import PageNotFound from './pages/PageNotFound';
import Logout from './pages/Logout';

function App() {

  return (
      <Router>
          <Navbar/>
          <Title />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/users/signup' element={ <Signup/> } />
            <Route path='/users/login' element={ <Login/> } />
            <Route path='/destinations' element={ <Destinations/> } />
            <Route path='/bookings/with-guests' element={ <BookingWithGuests/> } />
            <Route path='/bookings/with-friends' element={ <BookingWithFriends/> } />
            <Route path='/bookings/solo' element={ <BookingSolo/> } />
            <Route path='/users/profile' element={ <Profile/> } />
            <Route path='/users/admin' element={ <Admin/> } />
            <Route path='/logout' element={ <Logout /> } />
            <Route path='*' element={ <PageNotFound/> } />
          </Routes>
          <Footer />
      </Router>
  );
}

export default App;
