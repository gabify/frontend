import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/Navbar';
import StudentRegistration from './pages/StudentRegistration';
import StudentLogin from './pages/StudentLogin';
import { useAuthContext } from './hooks/useAuthContext';
import StudentList from './pages/StudentList';
import CourseView from './pages/CourseView';

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App bg-gray-100 font-karla">
      <BrowserRouter>
        <Navbar/>
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={ user ? <Home/>: <Navigate to= "/login-student"/>
            }
            />
            <Route 
              path='/course/:courseId'
              element={(user && user.userLevel === 0) ? <StudentList />: <CourseView/>}
            />
            
            <Route 
              path='/register-student'
              element={!user ? <StudentRegistration /> : <Navigate to="/" />}
            />
             <Route 
              path='/login-student'
              element={!user ? <StudentLogin /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
