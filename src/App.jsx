// import "./style/main.scss"
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage, SettingPage } from "./pages";
// import { AuthProvider } from "./context/AuthContext";


// //import { AuthProvider } from "./context/AuthContext";
// //import FollowPage from "./pages/FollowPage/FollowPage";
// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <AuthProvider>
//           <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/admin" element={<AdminLoginPage />} />
//             <Route path="register" element={<RegisterPage />} />
//             <Route path="/:id/*" element={<ProfilePage />} />
//             <Route path="/*" element={<HomePage />} />

//             <Route path="/setting" element={<SettingPage />} />
//             {/* <Route path="login" element={<LoginPage />} />
//           <Route path="admin" element={<AdminLoginPage />} />
//           <Route path="register" element={<RegisterPage />} />
//                 <Route path="*" element={<LoginPage />} /> */}
//           </Routes>
//         </AuthProvider>
//       </Router>

//     </div>
//   );
// }
import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes, useParams, useMatch } from 'react-router-dom';
import { HomePage, ProfilePage, LoginPage, AdminLoginPage, RegisterPage, FollowPage, SettingPage } from "./pages";
import OtherProfilePage from './pages/OtherProfilePage/OtherProfilePage';
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { useAuth } from './context/AuthContext';
//import { AuthProvider } from "./context/AuthContext";
//import FollowPage from "./pages/FollowPage/FollowPage";
import ReplyPage from "./pages/ReplyPage/ReplyPage";


function App() {

  // 為了做調試將/改成setting
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <UserProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="/setting" element={<SettingPage />} />
              {/* <Route path="/profile" element={<ProfilePage />} /> */}
              <Route path="/:id/*" element={<HandleProfilePage />} />


              <Route path="/*" element={<HomePage />} />

              {/* <Route path="/:id/*" element={<ProfilePage />} /> */}
              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/setting" element={<SettingPage />} />

              <Route path="/:id/*" element={<HandleProfilePage />} />
              <Route path="/tweets/:tweetId" element={<ReplyPage />} />
              <Route path="/*" element={<HomePage />} /> */}


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
  if (isAuthenticated && user && id === String(user.id)) {
    return (<ProfilePage />)
  } else {
    return (<OtherProfilePage id={id} />)
  }

}
// const HandleProfilePage = () => {
//   const { id } = useParams();
//   const { isAuthenticated, user } = useAuth();
//   const matchFollowers = useMatch("/:id/followers");
//   const matchFollowings = useMatch("/:id/followings")



//   return (<ProfilePage />)
// };


export default App;

//   if (matchFollowers || matchFollowings) {
    //     return (<FollowPage />)
    //   }
    //   else {
    //     return <ProfilePage />
    //   }
    // } else {
    //   return <OtherProfilePage id={id} />
    // }



// const HandleProfilePage = () => {
//   const { id } = useParams();
//   const { isAuthenticated, user } = useAuth();
//   const matchFollowers = useMatch("/:id/followers");
//   const matchFollowings = useMatch("/:id/followings")

//   if (isAuthenticated && user) {
//     if (matchFollowers || matchFollowings) {
//       return (<FollowPage />)
//     } else if (id === String(user.id)) {
//       return <ProfilePage />;
//     } else {
//       return <OtherProfilePage id={id} />;
//     }
//   } else {
//     return <LoginPage />;
//   }
// };