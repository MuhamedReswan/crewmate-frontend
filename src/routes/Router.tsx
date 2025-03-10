import { createBrowserRouter } from "react-router-dom";
import ServiceBoyRoutes from "./ServiceBoy.route";
import VendorRoutes from "./Vendor.route";
import AdminRoutes from "./Admin.route";
import CommonRoutes from "./Common.route";

const router = createBrowserRouter([
  ServiceBoyRoutes,
  VendorRoutes,
  AdminRoutes,
  CommonRoutes])

export default router