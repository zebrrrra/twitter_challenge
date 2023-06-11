import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage } from "./pages";
import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="admin" element={<AdminLoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/:id/" element={<ProfilePage />} />
            <Route path="/*" element={<HomePage />} />

            {/*
         <Route path ="/setting" element={<SettingPage/>}/>
                   <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />*/}
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;