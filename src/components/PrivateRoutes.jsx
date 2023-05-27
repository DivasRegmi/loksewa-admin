import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { selectUser } from '../redux/userSlice'

const PrivateRoutes = () => {
    const {isAuthenticated} =useSelector(selectUser)
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes