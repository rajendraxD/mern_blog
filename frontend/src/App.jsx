import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/features/auth/login/LoginPage'
import DashboardPage from './pages/features/dashboard/DashboardPage'
import { ProtectedRoute, PublicRoute } from './utils/RouteProtected'
import { useDispatch } from 'react-redux'
import { profile } from './store/slices/userSlice'
import { setUser } from './store/slices/authSlice'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const dispatch = useDispatch()
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await dispatch(profile()).unwrap()
        dispatch(setUser(res))
      } catch {
        // not authenticated
      } finally {
        setIsInitializing(false)
      }
    }
    fetchUser()
  }, [dispatch])

  if (isInitializing) return <LoadingSpinner />

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
    </BrowserRouter>
  )
}

export default App