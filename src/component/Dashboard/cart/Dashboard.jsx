import { NavLink, Outlet } from "react-router-dom";
import { FaBandAid, FaBookMedical, FaDatabase, FaFileMedical, FaHome, FaICursor, FaIcons, FaIdCard, FaReadme } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../firebase/AuthProvider";
//import useCart from "../hooks/useCart";

const Dashboard = () => {
  //  const [cart] = useCart();
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  let isAdmin = false;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = user?.email;
        const response = await fetch(`https://diagnostic-server-site.vercel.app/user/email?email=${email}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

 // console.log(userData);
  
 if (userData && userData?.length > 0 && userData[0]?.role === 'admin') {
    isAdmin = true;
  }

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-green-200">
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
                        <NavLink to="/dashboard/appointment">
                        <FaReadme />
                            Appointment</NavLink>
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
                        <NavLink to="/dashboard/userAppointment">
                        <FaBookMedical />
                            Appointment</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/userTestReport">
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
                        <NavLink to="/dashboard/profile">
                        <FaIcons></FaIcons>
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
