import "./App.css";

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Header from "./components/layout/Header";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Home from "./components/task/Home";
import Update from "./components/task/Update";
import Create from "./components/task/Create";
import { loadUser } from "./actions/userAction";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/" Component={Register} />
            <Route
              path="/search/:keyword"
              element={<ProtectedRoute Component={Home} />}
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Create />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update/:id"
              element={
                <ProtectedRoute>
                  <Update />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/search/:keyword"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
