import "./style/main.scss"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage'
//import FollowPage from "./pages/FollowPage/FollowPage";

// 先用來測試css有沒有正常
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
      <Route path ="/" element={<HomePage/>}/>

      {/*<Route path ="/login" element={<LoginPage/>/>
        <Route path ="/profile" element={<ProfilePage/>}/>
         <Route path ="/setting" element={<SettingPage/>}/>
          <Route path ="/" element={<HomePage/>}/> */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;