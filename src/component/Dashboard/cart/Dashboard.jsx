import { NavLink, Outlet } from "react-router-dom";
import { FaBandAid, FaBookMedical, FaDatabase, FaFileMedical, FaHome, FaIdCard } from "react-icons/fa";
//import useCart from "../hooks/useCart";

const Dashboard = () => {
  //  const [cart] = useCart();
  const isAdmin= true ;

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                        <>
                        
                        <li>
                        <NavLink to="/dashboard/adminHome">
                        <FaHome />
                          Admin  Home</NavLink>
                        </li>
                       
                    <li>
                        <NavLink to="/dashboard/addTest">
                        <FaFileMedical />
                            Add a Test</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageTest">
                        <FaDatabase></FaDatabase>
                            Manage Test</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addBanner">
                        <FaBandAid />
                            Add Banner</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageBanner">
                            <FaDatabase></FaDatabase>
                            Manage Banner</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/allUser">
                        <FaIdCard />
                            All  User </NavLink>
                       </li>
                    
                        </>
                        :
                        <>
                        <li>
                        <NavLink to="/dashboard/userHome">
                        <FaIdCard />
                            user Home </NavLink>
                        </li>
                   
                    <li>
                        <NavLink to="/dashboard/appointment">
                        <FaBookMedical />
                            Appointment</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/testResult">
                        <FaBookMedical />
                            Test Result</NavLink>
                    </li>
                        </>
                    }
                   
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome />
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">
                        <FaDatabase></FaDatabase>
                            Profile</NavLink>
                    </li>
                   
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};
export default Dashboard;
