import { FaClipboardList } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { BsCartFill } from "react-icons/bs";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const AdminNavLinks = [
  {
    name: "Products",
    path: "dashboard/products-list",
    icon: <FaClipboardList className="text-2xl" />,
  }, 
  {
    name: "Orders",
    path: "dashboard/orders",
    icon: <BsCartFill className="text-2xl" />,
  },
  {
    name: "Category",
    path: "dashboard/category",
    icon: <MdOutlineDashboardCustomize className="text-2xl" />,
  },
];

export default AdminNavLinks;
