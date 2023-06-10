import "./style/main.scss"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage, AdminLoginPage, RegisterPage, SettingPage } from "./pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<SettingPage />} />
          <Route path="admin" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="*" element={<LoginPage />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;