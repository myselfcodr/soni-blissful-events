import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import NotFound from "../Components/Shared/NotFound";

import Home from "../Pages/Home/Home";
import Courts from "../Pages/Courts/Courts";
import Events from "../Pages/Events/Events";
import Gallery from "../Pages/Gallery/Gallery";
import Membership from "../Pages/Membership/Membership";
import About from "../Pages/About/About";

import Login from "../Pages/Authentication/Login";
import Register from "../Pages/Authentication/Register";

import PrivacyPolicy from "../Components/Legal/PrivacyPolicy";
import TermsAndConditions from "../Components/Legal/TermsAndConditions";

import PrivateRouter from "./PrivateRouter";
import React, { Suspense } from "react";

// Dashboard pages
import AddCourtPage from "../Pages/Dashboard/Admin/AddCourtPage";
import PendingBookings from "../Pages/Dashboard/Shared/PendingBookings";
import ManageMember from "../Pages/Dashboard/Admin/ManageMember";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import ManageCourts from "../Pages/Dashboard/Admin/ManageCourts";
import ManageCoupons from "../Pages/Dashboard/Admin/ManageCoupons";
import Announcements from "../Pages/Dashboard/Member/Announcements";
import ManageAnnouncement from "../Pages/Dashboard/Admin/ManageAnnouncement";
import BookingsApproval from "../Pages/Dashboard/Admin/BookingsApproval";
import ApproveBookings from "../Pages/Dashboard/Member/ApproveBookings";
import PaymentPage from "../Pages/Dashboard/Member/PaymentPage";
import DashboardProfile from "../Pages/Dashboard/Shared/DashboardProfile";
import ConfirmBookings from "../Pages/Dashboard/Member/ConfirmBookings";
import ManageBookings from "../Pages/Dashboard/Admin/ManageBookings";
import PaymentHistory from "../Pages/Dashboard/Member/PaymentHistory";
import Overview from "../Pages/Dashboard/Shared/Overview/overview";

// Lazy loaded components
const AddBanner = React.lazy(() => import("../Pages/Dashboard/Admin/AddBanner.jsx"));
const ManageBanners = React.lazy(() => import("../Pages/Dashboard/Admin/ManageBanners.jsx"));

// ✅ EVENT MANAGEMENT - Lazy load karo
const ManageEvents = React.lazy(() => import("../Pages/Dashboard/Admin/ManageEvents.jsx"));
const AddEvent = React.lazy(() => import("../Pages/Dashboard/Admin/AddEvent.jsx"));
const EditEvent = React.lazy(() => import("../Pages/Dashboard/Admin/EditEvent.jsx"));

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "courts", element: <Courts /> },
      { path: "events", element: <Events /> },
      { path: "gallery", element: <Gallery /> },
      { path: "membership", element: <Membership /> },
      { path: "about", element: <About /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-and-conditions", element: <TermsAndConditions /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayouts />
      </PrivateRouter>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Overview /> },
      { path: "overview", element: <Overview /> },
      { path: "profile", element: <DashboardProfile /> },
      { path: "courts/add", element: <AddCourtPage /> },
      { path: "courts/manage", element: <ManageCourts /> },
      { path: "members", element: <ManageMember /> },
      { path: "bookings/pending", element: <PendingBookings /> },
      { path: "bookings/approval", element: <BookingsApproval /> },
      { path: "bookings/approve", element: <ApproveBookings /> },
      { path: "bookings/confirm", element: <ConfirmBookings /> },
      { path: "bookings/manage", element: <ManageBookings /> },
      { path: "users", element: <AllUsers /> },
      { path: "coupons/manage", element: <ManageCoupons /> },
      
      // Banner routes
      { 
        path: "banners/add", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AddBanner />
          </Suspense>
        ) 
      },
      { 
        path: "banners", 
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ManageBanners />
          </Suspense>
        ) 
      },
      
      // ✅ EVENT MANAGEMENT ROUTES - Add karo
      { 
        path: "events", 
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-white">Loading events...</div></div>}>
            <ManageEvents />
          </Suspense>
        ) 
      },
      { 
        path: "events/add", 
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-white">Loading form...</div></div>}>
            <AddEvent />
          </Suspense>
        ) 
      },
      { 
        path: "events/edit/:id", 
        element: (
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="text-white">Loading event data...</div></div>}>
            <EditEvent />
          </Suspense>
        ) 
      },
      
      { path: "announcements", element: <Announcements /> },
      { path: "announcements/manage", element: <ManageAnnouncement /> },
      { path: "payment/:bookingId", element: <PaymentPage /> },
      { path: "payments/history", element: <PaymentHistory /> },
    ],
  },
]);

export default Router;
