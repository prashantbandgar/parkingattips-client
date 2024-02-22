import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Carouselslide from "./pages/Carousel";
import Aboutus from "./pages/Aboutus";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import CustomersList from "./pages/CustomerList";
import UserDetails from "./pages/UserDetails";
import MyBookings from "./pages/MyBookings";
import SearchResult from "./pages/SearchResult";
import UserProfile from "./pages/UserProfile";
import MyPayments from "./pages/MyPayments";
import CustomerRegister from "./pages/CustomerRegister";
import Booknow from "./pages/Booknow";
import Bookings from "./pages/Bookings";
import Reports from "./pages/Reports";
import SeatSelect from "./pages/SeatSelect";
import AddPark from "./pages/AddPark";
import Address from "./pages/Address";
import ParkTime from "./pages/ParkTime";

export default function App() {
  return (
   <div style={{width:"100vw"}}>
     <BrowserRouter>
     <Navbar/>     
        <Routes>
          <Route element={<><Carouselslide/><Aboutus /><Footer/></>} path="/" exact />
          <Route element={<><SearchResult /></>} path="/search" exact />
          <Route element={<Login/>} path="/login" />
          <Route element={<CustomerRegister/>} path="/cregister" />
          <Route element={<CustomersList/>} path="/users" />
          <Route element={<Address/>} path="/Address" />
          <Route element={<AddPark/>} path="/AddPark" />
          <Route element={<ParkTime/>} path="/ParkTime" />
          <Route element={<UserDetails/>} path="/udetails/:id" />
          <Route element={<MyBookings/>} path="/mybookings" />
          <Route element={<Bookings/>} path="/bookings" />
          <Route element={<Reports/>} path="/reports" />
          <Route element={<Booknow/>} path="/book/:id" />
          <Route element={<SeatSelect/>} path="/selectseat" />
          <Route element={<MyPayments/>} path="/mypayments" />
          <Route element={<UserProfile/>} path="/profile" />
        </Routes>
     </BrowserRouter>     
   </div>
  );
}

