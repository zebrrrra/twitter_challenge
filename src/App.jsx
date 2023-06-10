import "./style/main.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, AdminLoginPage, RegisterPage } from "./pages";
import { UserInfo } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<UserInfo />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="*" element={<LoginPage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;