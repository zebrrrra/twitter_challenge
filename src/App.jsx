import "./style/main.scss"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage,ProfilePage,LoginPage, AdminLoginPage, RegisterPage,ReplyPage } from "./pages";
import { AuthProvider } from "./context/AuthContext";
//import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
      <Route path ="/login" element={<LoginPage/>}/>
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/me" element ={<ProfilePage/>}/>
      
      <Route path="/:id/tweets/:tweetId" element ={<ReplyPage/>}/>
      <Route path ="/*" element={<HomePage/>}/>
      
          {/*
          <Route path="/user/:id" component={UserProfilePage} />
         <Route path ="/setting" element={<SettingPage/>}/>
                   */}
        </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;