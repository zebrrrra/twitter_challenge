import "./style/main.scss"
<<<<<<< .merge_file_al7VOp
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
//import FollowPage from "./pages/FollowPage/FollowPage";
=======
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, AdminLoginPage, RegisterPage } from "./pages";
>>>>>>> .merge_file_gB0SpY

function App() {
  return (
    <div className="App">
<<<<<<< .merge_file_al7VOp
      <Router>
        <Routes>
      <Route path ="/" element={<HomePage/>}/>

      {/*<Route path ="/login" element={<LoginPage/>/>
        <Route path ="/profile" element={<ProfilePage/>}/>
         <Route path ="/setting" element={<SettingPage/>}/>
          <Route path ="/" element={<HomePage/>}/> */}
      </Routes>
      </Router>
=======
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="*" element={<LoginPage />} />


        </Routes>
      </BrowserRouter>
>>>>>>> .merge_file_gB0SpY
    </div>
  );
}

export default App;