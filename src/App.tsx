import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Home } from './pages/public/Home';
import { Properties } from './pages/public/Properties';
import { PropertyDetails } from './pages/public/PropertyDetails';
import { GisMapPage } from './pages/public/GisMapPage';
import { About } from './pages/public/About';
import { Faq } from './pages/public/Faq';
import { Login } from './pages/public/Login';
import { RegisterPage } from './pages/public/RegisterPage';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { GisDashboardPage } from './pages/dashboard/GisDashboardPage';
import { AddPropertyPage } from './pages/dashboard/AddPropertyPage';
import { LeadsPage } from './pages/dashboard/LeadsPage';
import { InspectionsPage } from './pages/dashboard/InspectionsPage';
import { WalletPage } from './pages/dashboard/WalletPage';
import { DocumentsPage } from './pages/dashboard/DocumentsPage';
import { ReservationsPage } from './pages/dashboard/ReservationsPage';
import { PaymentsPage } from './pages/dashboard/PaymentsPage';
import { FavoritesPage } from './pages/dashboard/FavoritesPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { RoleGuard } from './components/RoleGuard';

import { AddLeadPage } from './pages/dashboard/AddLeadPage';
import { LeadDetailsPage } from './pages/dashboard/LeadDetailsPage';
import { ScheduleInspectionPage } from './pages/dashboard/ScheduleInspectionPage';

import { FinanceDashboardPage } from './pages/dashboard/FinanceDashboardPage';
import { ReportsDashboardPage } from './pages/dashboard/ReportsDashboardPage';
import { BuyersDashboardPage } from './pages/dashboard/BuyersDashboardPage';
import { UsersDashboardPage } from './pages/dashboard/UsersDashboardPage';
import { AddUserPage } from './pages/dashboard/AddUserPage';

const ComingSoon = () => <div className="p-8 text-center text-slate-500">This module is under construction.</div>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/estates" element={<ComingSoon />} />
          <Route path="/map" element={<GisMapPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="/dashboard" element={
          <RoleGuard allowedRoles={['buyer', 'admin', 'executive', 'operations']}>
            <DashboardLayout />
          </RoleGuard>
        }>
          <Route index element={<DashboardHome />} />

          <Route path="settings" element={<SettingsPage />} />

          <Route element={<RoleGuard allowedRoles={['buyer']} />}>
            <Route path="marketplace" element={<Properties />} />
            <Route path="marketplace/:id" element={<PropertyDetails />} />
            <Route path="reservations" element={<ReservationsPage />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={['admin', 'executive', 'operations']} />}>
            <Route path="properties" element={<GisDashboardPage />} />
            <Route path="leads" element={<LeadsPage />} />
            <Route path="leads/new" element={<AddLeadPage />} />
            <Route path="leads/:id" element={<LeadDetailsPage />} />
            <Route path="inspections" element={<InspectionsPage />} />
            <Route path="inspections/new" element={<ScheduleInspectionPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="finance" element={<FinanceDashboardPage />} />
            <Route path="reports" element={<ReportsDashboardPage />} />
          </Route>

          <Route element={<RoleGuard allowedRoles={['admin', 'operations']} />}>
            <Route path="properties/add" element={<AddPropertyPage />} />
            <Route path="buyers" element={<BuyersDashboardPage />} />
            <Route path="users" element={<UsersDashboardPage />} />
            <Route path="users/new" element={<AddUserPage />} />
            <Route path="payments-admin" element={<PaymentsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}