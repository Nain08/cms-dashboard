import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import SidebarComponent from './components/SidebarComponent';
import DashboardComponent from './components/DashboardComponent';
import PageComponent from './components/PageComponent';
import CategoryComponent from './components/CategoryComponent';
import UserComponent from './components/UserComponent';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem('authToken');
    if (userToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <NoSidebarLayout isLoggedIn={isLoggedIn}><Login /></NoSidebarLayout>}
        />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <NoSidebarLayout isLoggedIn={isLoggedIn}><Register /></NoSidebarLayout>}
        />

        {isLoggedIn ? (
          <>
            <Route
              path="/"
              element={
                <SidebarLayout isLoggedIn={isLoggedIn}>
                  <DashboardComponent />
                </SidebarLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <SidebarLayout isLoggedIn={isLoggedIn}>
                  <DashboardComponent />
                </SidebarLayout>
              }
            />
            <Route
              path="/pages"
              element={
                <>
                <NavbarComponent/>
                <SidebarLayout isLoggedIn={isLoggedIn}>
                  <PageComponent />
                </SidebarLayout>
                </>
              }
            />
            <Route
              path="/categories"
              element={
                <SidebarLayout isLoggedIn={isLoggedIn}>
                  <CategoryComponent />
                </SidebarLayout>
              }
            />
            <Route
              path="/users"
              element={
                <>
                <NavbarComponent/>
                <SidebarLayout isLoggedIn={isLoggedIn}>
                  <UserComponent />
                </SidebarLayout>
                </>
              }
            />
          </>
        ) : (<Route
          path="/"
          element={
            <Login />
          }
        />)}
      </Routes>
    </Router>
  );
};

const SidebarLayout = ({ children,isLoggedIn }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    {isLoggedIn && <NavbarComponent />}
    <div style={{ display: 'flex', flex: 1 }}>
      <SidebarComponent />
      <div style={{ flex: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  </div>
);

const NoSidebarLayout = ({ children,isLoggedIn }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    {isLoggedIn && <NavbarComponent />}
    <div style={{ flex: 1, padding: '20px' }}>
      {children}
    </div>
  </div>
);

export default App;
