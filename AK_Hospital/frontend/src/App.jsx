import Signup from './pages/Sign.jsx'
import Login from './pages/Login.jsx'
import FrontPage from './pages/FrontPage.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserHome from './pages/UserHome.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import MyAppointments from './pages/MyAppointment.jsx'
import AdminAppointments from './pages/AdminAppointment.jsx'
import DoctorHome from './pages/DocHome.jsx'



const App=()=> {


  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<FrontPage/>} />
    <Route path='/login'element={<Login/>} />
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/userhome'element={<UserHome/>}/>
    <Route path='/bookAppointment'element={<BookAppointment/>}/>
    <Route Path='/MyAppointment' element={<MyAppointments/>}/>
    <Route path='/adminHome'element={<AdminAppointments/>}/>
    <Route path='/adminAppointment'element={<AdminAppointments/>}/>
    <Route path='/Dochome'element={<DoctorHome/>}/>
  
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
