
import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import Header from './components/Header';

import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Auth from './pages/Auth';
import UserProfile from './pages/UserProfile';
import PasswordReset from './pages/PasswordReset';
import NewPassword from './pages/NewPassword';
import ItemDetail from './pages/ItemDetail';
import ItemListing from './pages/ItemListing';
import MapView from './pages/MapView';
import Booking from './pages/Booking';
import Notification from './pages/Notification';
import Settings from "./pages/Settings";
import StickyFooter from "./components/StickyFooter";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Header></Header>
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/forgetpass" element={<PasswordReset />} />
            <Route path="/resetpassword" element={<NewPassword />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/listing" element={<ItemListing />} />
            <Route path="/maplist" element={<MapView />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
        <StickyFooter></StickyFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
