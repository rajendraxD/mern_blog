import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/features/auth/login/LoginPage'
import DashboardPage from './pages/features/dashboard/DashboardPage'
import { ProtectedRoute, PublicRoute } from './utils/RouteProtected'
import { useDispatch } from 'react-redux'
import { profile } from './store/slices/userSlice'
import { setUser } from './store/slices/authSlice'
import { useEffect } from 'react'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await dispatch(profile()).unwrap()
        dispatch(setUser(res))
      } catch {
        // not authenticated
      }
    }
    fetchUser()
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

      </Routes>
    </BrowserRouter >
  )
}

export default App