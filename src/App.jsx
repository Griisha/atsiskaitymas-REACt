import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "./contexts/UsersContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home";

const App = () => {
  const { loggedInUser } = useContext(UsersContext);
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/user">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path=":name"
              element={
                loggedInUser ? <UserPage /> : <Navigate to="/user/login" />
              }
            />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
