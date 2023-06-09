import "./style/main.scss"
<<<<<<< HEAD
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { LoginPage, AdminLoginPage, RegisterPage } from "./pages";
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { HomePage, LoginPage, AdminLoginPage, RegisterPage } from "./pages";
>>>>>>> origin/Mergebranch_Main_Modal_2
import HomePage from "./pages/HomePage/HomePage";
//import FollowPage from "./pages/FollowPage/FollowPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
<<<<<<< HEAD
      <Route path ="/" element={<HomePage/>}/>
      <Route path ="/login" element={<LoginPage/>}/>
      <Route path="admin" element={<AdminLoginPage />} />
      <Route path="register" element={<RegisterPage />} />

=======
          <Route path="/" element={<HomePage />} />
>>>>>>> origin/Mergebranch_Main_Modal_2

          {/*<Route path ="/login" element={<LoginPage/>/>
        <Route path ="/profile" element={<ProfilePage/>}/>
         <Route path ="/setting" element={<SettingPage/>}/>
                   <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />*/}
        </Routes>
      </Router>

    </div>
  );
}

export default App;