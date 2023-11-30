// import React, { useContext, useEffect, useState } from 'react';
// import { NavLink, Outlet, useLocation } from 'react-router-dom';
// import { FaHome, FaFileMedical, FaDatabase, FaBandAid, FaReadme, FaIdCard, FaBookMedical, FaIcons } from 'react-icons/fa';
// import { AuthContext } from '../../../firebase/AuthProvider';
// import { useMediaQuery } from 'react-responsive';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBandAid, FaBookMedical, FaDatabase, FaFileMedical, FaHome, FaICursor, FaIcons, FaIdCard, FaReadme } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../firebase/AuthProvider";
import { useMediaQuery } from 'react-responsive'; 

const ResponsiveTabs = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const navigate = useNavigate();
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const handleTabClick = () => {
      if (isMobile) {
        setIsMenuOpen(false);
      }
    };
  
    return (
      <div className="md:hidden px-5 py-5 text-lg">
        <button onClick={toggleMenu} className="menu-toggle">
          ☰
        </button>
        {isMenuOpen && (
          <ul className="menu p-4">
            {React.Children.map(children, (child) => React.cloneElement(child, { onClick: handleTabClick }))}
          </ul>
        )}
      </div>
    );
  };
  
  const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
  
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
  
  return (
    <div className="flex">
      <ResponsiveTabs>
        {userData && userData?.length > 0 && userData[0]?.role === 'admin' ? (
          <>
            <li>
            <NavLink to="/dashboard" activeClassName="active">
                <FaHome />
                Admin Home
             </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addTest" activeClassName="active">
                <FaFileMedical />
                Add a Test
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageTest" activeClassName="active">
                <FaDatabase></FaDatabase>
                Manage Test
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/addBanner" activeClassName="active">
                <FaBandAid />
                Add Banner
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manageBanner" activeClassName="active">
                <FaDatabase></FaDatabase>
                Manage Banner
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/appointment" activeClassName="active">
                <FaReadme />
                Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/allUser" activeClassName="active">
                <FaIdCard />
                All User
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
            <NavLink to="/dashboard" activeClassName="active">
                <FaIdCard />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/userAppointment" activeClassName="active">
                <FaBookMedical />
                Appointment
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/userTestReport" activeClassName="active">
                <FaBookMedical />
                Test Result
              </NavLink>
            </li>
          </>
        )}
        <div className="divider"></div>
        <li>
          <NavLink to="/" activeClassName="active">
            <FaHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" activeClassName="active">
            <FaIcons></FaIcons>
            Profile
          </NavLink>
        </li>
      </ResponsiveTabs>
      <div className="w-64 hidden md:block min-h-screen bg-green-200">
        <ul className="menu p-4">
          {userData && userData?.length > 0 && userData[0]?.role === 'admin' ? (
            <>
              <li>
              <NavLink to="/dashboard" activeClassName="active">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addTest" activeClassName="active">
                  <FaFileMedical />
                  Add a Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageTest" activeClassName="active">
                  <FaDatabase></FaDatabase>
                  Manage Test
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addBanner" activeClassName="active">
                  <FaBandAid />
                  Add Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBanner" activeClassName="active">
                  <FaDatabase></FaDatabase>
                  Manage Banner
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/appointment" activeClassName="active">
                  <FaReadme />
                  Appointment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUser" activeClassName="active">
                  <FaIdCard />
                  All User
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard" activeClassName="active">
                  <FaIdCard />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userAppointment" activeClassName="active">
                  <FaBookMedical />
                  Appointment
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/userTestReport" activeClassName="active">
                  <FaBookMedical />
                  Test Result
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/" activeClassName="active">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" activeClassName="active">
              <FaIcons></FaIcons>
              Profile
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
