import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import OrganizationList from "../pages/organizations/OrganizationList";
import OrganizationView from "../pages/organizations/OrganizationView";
import AddOrganization from "../pages/organizations/AddOrganization";
import CardsView from "../pages/organizations/CardsView";
import CardsView1 from "../pages/organizations/CardsView1";
import AddPlan from "../pages/plans/AddPlan";
import Settings from "../pages/settings/Settings";
import Login from "../pages/auth/Login";
import PaymentTransactions from "../pages/organizations/PaymentTransactions";
import OrganizationAccessSettings from "../pages/organizations/OrganizationAccessSettings";
import CardTemplate from "../pages/organizations/CardTemplate";
import CardPreview from "../pages/organizations/CardPreview";
import ShowCard from "../pages/organizations/ShowCard";
import StaffCards from "../pages/StaffCards";
import StaffCardForm from "../components/StaffCardForm";
import StaffCardEditForm from "../components/StaffCardEditForm";
import MyCard from "../pages/user/MyCard";
import UserCardPreview from "../pages/organizations/UserCardPreview";
import UserStaffCardEditForm from "../components/UserStaffCardEditForm";
import MeetingCalendar from "../components/MeetingCalendar";
import StaffMeetingCalendar from "../components/StaffMeetingCalendar";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/staff-cards"
        element={
          <ProtectedRoute>
            <StaffCards />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-staff-cards"
        element={
          <ProtectedRoute>
            <StaffCardForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-staff-cards"
        element={
          <ProtectedRoute>
            <StaffCardEditForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-calender"
        element={
          <ProtectedRoute>
            <StaffMeetingCalendar />
          </ProtectedRoute>
        }
      />

      {/* user routes from here */}

      <Route
        path="/user/my-card"
        element={
          <ProtectedRoute>
            {/* <MyCard /> */}

            <UserCardPreview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/calender"
        element={
          <ProtectedRoute>
            {/* <MyCard /> */}

            <UserCardPreview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/edit-card"
        element={
          <ProtectedRoute>
            {/* <MyCard /> */}

            <UserStaffCardEditForm />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="/assign-card/:cardId"
        element={
          <ProtectedRoute>
            <AssignCard />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/organizations"
        element={
          <ProtectedRoute>
            <OrganizationList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/organizations/:id"
        element={
          <ProtectedRoute>
            <OrganizationView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cards/:id"
        element={
          <ProtectedRoute>
            <CardsView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/card-preview"
        element={
          <ProtectedRoute>
            <CardPreview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cards/:cardId/view"
        element={
          <ProtectedRoute>
            <ShowCard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/templates"
        element={
          <ProtectedRoute>
            <CardsView1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizations/cardstemplate"
        element={
          <ProtectedRoute>
            <CardTemplate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions/"
        element={
          <ProtectedRoute>
            <PaymentTransactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/organizations/12/access-settings"
        element={
          <ProtectedRoute>
            <OrganizationAccessSettings />
          </ProtectedRoute>
        }
      />

      {/* ✅ THIS ROUTE FIXES PAGE NOT FOUND */}
      <Route
        path="/organizations/add"
        element={
          <ProtectedRoute>
            <AddOrganization />
          </ProtectedRoute>
        }
      />

      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <AddPlan />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
