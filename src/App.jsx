import Dashboard from './pages/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Dashboard />}/> 
        <Route path={'/signIn'} element={<SignIn />}/> 
        <Route path={'/signUp'} element={<SignUp />}/> 
      </Routes>
    </>
  )
}

export default App;