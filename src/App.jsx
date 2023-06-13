import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage,FollowPage } from "./pages";
import  OtherProfilePage  from './pages/OtherProfilePage/OtherProfilePage';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { useAuth } from './context/AuthContext';
//import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
import ReplyPage from "./pages/ReplyPage/ReplyPage";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="/:id/*" element={<HandleProfilePage />} />
            <Route path="/tweets/:tweetId" element= {<ReplyPage />}/>
            <Route path="/*" element={<HomePage />} />


          </Routes>
          </UserProvider>
        </AuthProvider>
      </Router>

    </div>
  );

}
const HandleProfilePage = () => {
  const { id } = useParams();
const { isAuthenticated, user } = useAuth();
const matchFollowers = useMatch("/:id/followers");
const matchFollowings =useMatch ("/:id/followings")
if (isAuthenticated && user && id === String(user.id)) {
  if(matchFollowers||matchFollowings) {
    return(<FollowPage/>)}
   else {
    return <ProfilePage />}
} else {
    return <OtherProfilePage id={id} />
}
};

export default App;

{/*
         <Route path ="/setting" element={<SettingPage/>}/>
                   <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />*/}