import { useState } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage/LoginPage'
import './App.css'
// import { AuthProvider } from './contexts/AuthProvider'
import AuthProvider from './contexts/AuthProvider'
import HomePage from './pages/HomePage/HomePage'
import AdminPage from './pages/AdminPage/AdminPage'
import SalesManPage from './pages/SalesManPage/SalesManPage'
import CustomerPage from './pages/CustomerPage/CustomerPage'
import InstallerPage from './pages/InstallerPage/InstallerPage'


function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>

          <Routes>
             <Route exact path="/" element={<HomePage/>}/>
             <Route exact path="/login" element={<LoginPage/>} />
             <Route exact path="/admin" element={<AdminPage/>} />
             <Route exact path="/sales-man" element={<SalesManPage/>} />
             <Route exact path='/installer' element={<InstallerPage/>} />
             <Route exact path='/customer' element={<CustomerPage/>} />
             {/* <Route element={<Auth allowedRoles={['admin']}/>}>
                  <Route path ='/admin' element = {<AdminPage/>}/>
                  </Route>
                  <Route element={<Auth allowedRoles={['installer']}/>}>
                  <Route path ='/installer' element = {<InstallerPage/>}/>
                </Route> */}
            </Routes>
                </AuthProvider>
        
      </Router>
    </>
  )
}

export default App
