import { NavLink, Outlet } from "react-router-dom";
import { FaBandAid, FaBookMedical, FaDatabase, FaFileMedical, FaHome, FaIdCard } from "react-icons/fa";
//import useCart from "../hooks/useCart";

const Dashboard = () => {
  //  const [cart] = useCart();

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/userHome">
                        <FaIdCard />
                            All  User </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                        <FaFileMedical />
                            Add a Test</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaDatabase></FaDatabase>
                            All Test </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                        <FaBandAid />
                            Add Banner</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaDatabase></FaDatabase>
                            All Banner</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                        <FaBookMedical />
                            Reservation</NavLink>
                    </li>
                   
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                        <FaHome />
                            Home</NavLink>
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
