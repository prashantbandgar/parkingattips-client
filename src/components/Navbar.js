import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(){
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const logout=e=>{
        dispatch({type:'LogOut'})
        sessionStorage.clear();
        navigate("/");
    }
    
    const state=useSelector((state)=>state);
    console.log("LoggedIn ",state.loggedin.IsLoggedIn)
    const isadmin=state.loggedin.IsLoggedIn && sessionStorage.getItem("role")==="Admin" ?true:false;
    const isuser=state.loggedin.IsLoggedIn && sessionStorage.getItem("role")==="User" ?true:false;
    return(

    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-gradient text-black fw-bold opacity-75 border-bottom border-white" style={{background:'blue'}}>
            <div className="container-fluid">
           <Link className="navbar-brand" to="#">Parking-At-Tips</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
             </button>
         <div className="collapse navbar-collapse" id="navbarNav">
         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
           </li>
            {isadmin?(
            <>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/users">Users</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/AddPark">Add Parking</Link>
            </li> 
            <li className="nav-item">                   
            <Link className="nav-link active" aria-current="page" to="/Address">Add Parking Address</Link>
            </li>                   
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/ParkTime">Add Parking Time</Link>
            </li> 
             <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/bookings">Bookings</Link>
            </li> 
             <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/reports">Report</Link>
            </li> 
            </>    
            ):""}            
            {isuser?(
            <>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/mybookings">Bookings</Link>
            </li> 
            </>          
            ):null}
           {!state.loggedin.IsLoggedIn ? (<>
           <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
           </li>
           <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/cregister">Register</Link>
           </li>
           </>
           ):(
               <>
            <li className="nav-item">
            <Link to="/profile" className="nav-link active" aria-current="page">Hi! {state.loggedin.Username}</Link>
            </li>
            <li className="nav-item">
            <Link to="/login" className="nav-link active" aria-current="page" onClick={logout}>Logout</Link>
           </li>
           </>
           )}

         </ul>
           
            </div>
         </div>
        </nav>
    </div>
    );
}

