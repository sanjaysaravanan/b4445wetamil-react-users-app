import { Navigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element }) => {
  if (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) {
    return element;
  }

  return <Navigate to={'/login'} replace />
}


export default PrivateRoute;