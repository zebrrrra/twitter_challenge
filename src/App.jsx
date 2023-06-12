import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage } from "./pages";
import  OtherProfilePage  from './pages/OtherProfilePage/OtherProfilePage';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from './context/AuthContext';
//import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
import ReplyPage from "./pages/ReplyPage/ReplyPage";

const HandleProfilePage = () => {
  const { id } = useParams();
console.log('id:', id);
const { isAuthenticated, user } = useAuth();
console.log('isAuthenticated:', isAuthenticated);
console.log('user:', user);
if (isAuthenticated && user && id === String(user.id)) {
    return <ProfilePage />;
} else {
    return <OtherProfilePage id={id} />
}
};
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="/:id/*" element={<HandleProfilePage />} />
            <Route path="/tweets/:tweetId" element= {<ReplyPage />}/>
            <Route path="/*" element={<HomePage />} />


          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );

}

export default App;

{/*
         <Route path ="/setting" element={<SettingPage/>}/>
                   <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />*/}