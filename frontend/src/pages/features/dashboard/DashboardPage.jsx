import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/authSlice'
import { Button } from '../../../components/ui/button'
function DashboardPage() {
  const dispatch = useDispatch()

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const res = await dispatch(logout()).unwrap()
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>DashboardPage
      <Button  onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default DashboardPage