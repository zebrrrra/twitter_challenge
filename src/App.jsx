import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from 'react-router-dom';
import { LoginPage, AdminLoginPage, AdminUserPage, AdminHomePage, RegisterPage, HomePage, ProfilePage, OtherProfilePage, SettingPage, ReplyPage, FollowPage, ChatPage, PrivateChatPage, NoticePage } from "./pages";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from './context/AuthContext';
import ProtectedRouter from './components/AdminProtectedRouter';
import { UpdateTagProvider } from "./context/UpdateTagContext";
import { ChatContextProvider } from './context/ChatContext';
import { ChatUserProvider } from "./context/ChatUserContext";
import { ChatUnReadProvider } from "./context/ChatUnreadContext";

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
                <Route path="register" element={<RegisterPage />} />
                <Route path="admin" element={<AdminLoginPage />} />
                <Route path="admin/list" element={<ProtectedRouter><AdminHomePage /></ProtectedRouter>} />
                <Route path="admin/user" element={<ProtectedRouter><AdminUserPage /></ProtectedRouter>} />

                <Route path="main" element={<ChatUnReadProvider><HomePage /></ChatUnReadProvider>} />
                <Route path="chat" element={<ChatUnReadProvider><ChatUserProvider><ChatPage /></ChatUserProvider></ChatUnReadProvider>} />
                <Route path="chat/:roomId" element={<ChatUnReadProvider><ChatUserProvider><PrivateChatPage /></ChatUserProvider>
                </ChatUnReadProvider>
                } />
                <Route path="notice" element={<ChatUnReadProvider><NoticePage /></ChatUnReadProvider>} />
                <Route path="setting" element={<ChatUnReadProvider><SettingPage /></ChatUnReadProvider>} />
                <Route path="tweets/:tweetId" element={<ChatUnReadProvider><ReplyPage /></ChatUnReadProvider>} />
                <Route path=":id/follow/*" element={<ChatUnReadProvider><HandleProfilePage /></ChatUnReadProvider>} />
                <Route path=":id/*" element={<ChatUnReadProvider><HandleProfilePage /></ChatUnReadProvider>} />
                <Route path="profile/*" element={<ChatUnReadProvider><ProfilePage /></ChatUnReadProvider>} />
                <Route path="*" element={<ChatUnReadProvider><HomePage /></ChatUnReadProvider>} />
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

