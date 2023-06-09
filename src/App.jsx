import "./style/main.scss"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import { HomePage, LoginPage, AdminLoginPage, RegisterPage } from "./pages";
import HomePage from "./pages/HomePage/HomePage";
//import FollowPage from "./pages/FollowPage/FollowPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
      <Route path ="/" element={<HomePage/>}/>

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