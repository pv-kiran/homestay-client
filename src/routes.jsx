import React from 'react'
import { Route, Routes } from "react-router-dom"
import Layout from './layout/Layout'
import AccountPage from './pages/AccountPage'
import DashboardPage from './pages/DashboardPage'
import RoomsPage from './pages/RoomsPage'
import CategoriesPage from './pages/CategoriesPage'
import AddOnsPage from './pages/AddOnsPage'
import SamplePage from './pages/SamplePage'
import LandingPage from './pages/LandingPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/admin' element={<Layout></Layout>}>
          <Route path='' element={<DashboardPage/>}/>
          <Route path='dashboard' element={<DashboardPage />}/>
          <Route path='rooms' element={<RoomsPage />} />
          <Route path='categories' element={<CategoriesPage/>} />
          <Route path='add-ons' element={<AddOnsPage/>} />
          <Route path='account' element={<AccountPage />} />
          <Route path='sample' element={<SamplePage/>} />
        </Route>
      </Routes>
  )
}

export default AppRoutes