import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage, FollowPage, SettingPage } from "./pages";
import OtherProfilePage from './pages/OtherProfilePage/OtherProfilePage';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from './context/AuthContext';
import ProtectedRouter from './components/AdminProtectedRouter';
import ReplyPage from "./pages/ReplyPage/ReplyPage";
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import AdminHomePage from "./pages/AdminHomePage/AdminHomePage";
import ChatPage from "./pages/ChatPage/ChatPage";
import { UpdateTagProvider } from "./context/UpdateTagContext";
import { ChatContextProvider } from './context/ChatContext';
import PrivateChatPage from "./pages/PrivateChatPage/PrivateChatPage";

const basename = process.env.PUBLIC_URL

function App() {

  return (
    <div className="App" >
      <Router basename={basename}>
        <AuthProvider>
          <UpdateTagProvider>
            <ChatContextProvider>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="chat" element={<ChatPage />} />
                <Route path="chat/:roomId/:targetId" element={<PrivateChatPage/>} />
                {/* <Route path="main" element={<HomePage />} /> */}
                {/* 暫時為了顯示chatpage做的設定 */}
                <Route path="main" element={<ChatPage />} />
                <Route path="admin" element={<AdminLoginPage />} />
                <Route path="admin/list" element={<ProtectedRouter><AdminHomePage /></ProtectedRouter>} />
                <Route path="admin/user" element={<ProtectedRouter><AdminUserPage /></ProtectedRouter>} />
                <Route path="setting" element={<SettingPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="tweets/:tweetId" element={<ReplyPage />} />
                <Route path=":id/follow/*" element={<HandleProfilePage />} />
                <Route path=":id/*" element={<HandleProfilePage />} />
                <Route path="profile/*" element={<ProfilePage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </ChatContextProvider>
          </UpdateTagProvider>
        </AuthProvider>
      </Router>

    </div>
  );

}
const HandleProfilePage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const matchFollowers = useMatch(":id/followers");
  const matchFollowings = useMatch(":id/followings")


  if (isAuthenticated && user) {
    if (matchFollowers || matchFollowings) {
      return (<FollowPage />)
    } else if (id === String(user.id)) {
      return <ProfilePage />;
    } else {
      return <OtherProfilePage id={id} />;
    }
  } else {
    return <LoginPage />;
  }
};

export default App;

