import Dashboard from './pages/Dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router';

function App() {

  return (
    <>
      <Routes>
        <Route path={'/'} element={<Dashboard />}/> 
      </Routes>
    </>
  )
}

export default App;