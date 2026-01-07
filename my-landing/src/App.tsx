import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import { Suspense, lazy } from 'react';

// Оптимізований lazy loading для сторінок
const Home = lazy(() => import('./pages/Home/Home'));
const NYTNews = lazy(() => import('./pages/NYTNews/NYTNews'));
const Philo = lazy(() => import('./pages/Philo/Philo'));
const Login = lazy(() => import('./pages/LoginRegister/LoginRegister'));
const Weather = lazy(() => import('./pages/Weather/Weather'));
const Library = lazy(() => import('./pages/Library/Library'));
const UserDashboard = lazy(() => import('./features/user/userdashbord/UserDashboard'));

// Layout і ProtectedRoute потрібні відразу для роутингу
import Layout from './Layout';
import ProtectedRoute from './routes/ProtectedRoute';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <Philo />
              </Suspense>
            } />
            <Route path="/nytnews" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <NYTNews />
              </Suspense>
            } />
            <Route path="/library" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <Library />
              </Suspense>
            } />
            <Route path="/philo" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <Home />
              </Suspense>
            } />
            <Route path="/user" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              </Suspense>
            } />
            <Route path="/weather" element={
              <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>Loading...</div>}>
                <Weather />
              </Suspense>
            } />
          </Route>
          <Route path="/login" element={
            <Suspense fallback={<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>Loading...</div>}>
              <Login />
            </Suspense>
          } />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
