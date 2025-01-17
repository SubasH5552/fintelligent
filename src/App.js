import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Auth from "./pages/Auth";
import "./style.scss";
import "./media-query.css";
import NotFound from "./pages/NotFound";
import AddEditblog from "./pages/AddEditblog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { auth } from "./services/firebase";
import { signOut } from "firebase/auth";
function App() {
  let navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  console.log(user);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
      toast.success("Log out Successfull , come back soon🫠");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogOut={handleLogOut}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route
          path="/"
          element={<Home setActive={setActive} user={user} active={active} />}
        />
        <Route path="/details/:id" element={<Detail setActive={setActive} />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditblog user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/auth"
          element={<Auth setActive={setActive} setUser={setUser} user={user} />}
        />
        <Route
          path="/update:id"
          element={
            user?.uid ? <AddEditblog user={user} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
