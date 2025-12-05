import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import SmoothScroll from "./components/SmoothScroll";
import Home from './pages/Home'
import Registration from './pages/User/Registration'
import UserLogin from './pages/User/UserLogin'
import OrderPage from './pages/User/OrderPage'
import Admin from './pages/Admin/Admin'
import { AnimatePresence } from 'framer-motion'
import OrderStatus from './pages/User/OrderStatus'
import UserDashboard from './pages/User/UserDashboard'
import UserHome from './pages/User/UserHome'
import UserProfile from './pages/User/UserProfile'
import ChangePassword from './pages/User/ChangePassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { Users } from 'lucide-react'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminHome from './pages/Admin/AdminHome'
import AdminOrders from './pages/Admin/AdminOrders'
import AdminOrdersDetails from './pages/Admin/AdminOrdersDetails'
import AdminSettings from './pages/Admin/AdminSettings'
import AdminManagePricing from './pages/Admin/AdminManagePricing'

function App() {

  const location = useLocation();

  return (
    <SmoothScroll>
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/Registration' element={<Registration />} />
          <Route path='/UserLogin' element={<UserLogin />} />

          {/* Admin route */}        

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<Admin />} />

        {/* ADMIN DASHBOARD WRAPPER */}
        <Route path="/admin" element={<AdminDashboard />}>

          {/* Default page on login */}
          <Route index element={<AdminHome />} />

          {/* ADMIN SUB PAGES */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrdersDetails />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="manageprice" element={<AdminManagePricing />} />

        </Route>

          <Route path='/UserDashboard/' element={<UserDashboard />}>
            <Route index element={<UserHome />}></Route>
            <Route path='OrderPage' element={<OrderPage />}></Route>
            <Route path='OrderStatus' element={<OrderStatus />}></Route>
            <Route path='Userprofile' element={<UserProfile />}></Route>
            <Route path='ChangePassword' element={<ChangePassword />}></Route>
          </Route>
        </Routes>
      </AnimatePresence>
      </SmoothScroll>
  )
}

export default App