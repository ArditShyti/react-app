import logo from './logo.svg';
import './App.css';
import MainPage from './pages/mainpage';
import MainPhoneView from './phoneview/mainphonev';
import LoginForm from './pages/login/loginForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthorizedRoute from './pages/login/authorized';
import { getCookie, setAuthToken } from './pages/login/helpers';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    setAuthToken(getCookie("access_token"));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/main" element={<AuthorizedRoute><MainPage /></AuthorizedRoute>} />
        <Route path="/mainphone" element={ <MainPhoneView />} />
      </Routes>
      </BrowserRouter>
    {/* <MainPhoneView /> */}
    {/* <MainPage /> */}
    {/* <LoginForm /> */}
    </div>
  );
}

export default App;
