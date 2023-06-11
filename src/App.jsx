import "./style/main.scss"
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, AdminLoginPage, RegisterPage, SettingPage } from "./pages";
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage/HomePage'
// import { LoginPage, AdminLoginPage, RegisterPage } from "./pages";
import { RegisterPage, LoginPage } from "./pages";
import { UserInfo } from "./components";

>>>>>>> 80b7a7660856a4eb09607310b7e139d77ecdd80c
function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="login" element={<SettingPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
=======
          <Route path="/" element={<RegisterPage />} />
>>>>>>> 80b7a7660856a4eb09607310b7e139d77ecdd80c

          {/* <Route path ="/login" element={<LoginPage/>}/> */}
          <Route path="/profile" element={<UserInfo />} />
          {/* <Route path="/setting" element={<SettingPage />} /> */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="*" element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;