import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "./contexts/UsersContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home";
import AddNewCard from "./pages/AddNewCard";
import OneCardPage from "./pages/OneCardPage";
import EditCard from "./pages/EditCard";

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
          <Route path="/cards">
            <Route
              path="addNew"
              element={
                loggedInUser ? <AddNewCard /> : <Navigate to="/user/login" />
              }
            />
            <Route path=":id" element={<OneCardPage />} />
            <Route
              path=":id/edit"
              element={
                loggedInUser ? <EditCard /> : <Navigate to="/user/login" />
              }
            />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
