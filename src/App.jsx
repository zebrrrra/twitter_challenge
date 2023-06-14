import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage,FollowPage } from "./pages";
import  OtherProfilePage  from './pages/OtherProfilePage/OtherProfilePage';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { useAuth } from './context/AuthContext';
import ProtectedRouter from './components/AdminProtectedRouter';
//import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
import ReplyPage from "./pages/ReplyPage/ReplyPage";
import AdminAllTweets from "./components/AdminAllTweet/AdminAllTweet";
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <UserProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route path="/admin/list" element={<AdminHomePage />}/>
            <Route path="/testuser" element={<AdminUserPage />}/>
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



if (isAuthenticated && user) {
  if(matchFollowers||matchFollowings) {
    return(<FollowPage/>)
  }else if(id === String(user.id)){
    return <ProfilePage />;
} else {
    return <OtherProfilePage id={id} />;
  }
} else{
  return <LoginPage/>;
}
};

export default App;

{/*
         <Route path ="/setting" element={<SettingPage/>}/>
                   <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<LoginPage />} />
              
              <Route path="/admin/tweets" element={<AdminAllTweets />} />*/}