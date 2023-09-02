
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import People from './pages/People';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="/" element={<PrivateRoute element={<People />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;