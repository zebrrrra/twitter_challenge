import "./style/main.scss"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage/HomePage'
import { LoginPage, AdminLoginPage } from "./pages";
import { UserInfo } from "./components";

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          {/* <Route path ="/login" element={<LoginPage/>}/> */}
          <Route path="/profile" element={<UserInfo />} />
          {/* <Route path="/setting" element={<SettingPage />} /> */}
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="*" element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;