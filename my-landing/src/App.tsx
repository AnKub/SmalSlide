import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import { Suspense, lazy } from 'react';

// Оптимізований lazy loading для всіх компонентів
const Home = lazy(() => import('./pages/Home/Home'));
const NYTNews = lazy(() => import('./pages/NYTNews/NYTNews'));
const Philo = lazy(() => import('./pages/Philo/Philo'));
const Login = lazy(() => import('./pages/LoginRegister/LoginRegister'));
const Weather = lazy(() => import('./pages/Weather/Weather'));
const Library = lazy(() => import('./pages/Library/Library'));
const UserDashboard = lazy(() => import('./features/user/userdashbord/UserDashboard'));

// Layout теж з lazy loading
const Layout = lazy(() => import('./Layout'));
const ProtectedRoute = lazy(() => import('./routes/ProtectedRoute'));

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Suspense fallback={
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px'}}>
            Loading...
          </div>
        }>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Philo />} />
              <Route path="/nytnews" element={<NYTNews />} />
              <Route path="/library" element={<Library />} />
              <Route path="/philo" element= {<Home />}/>
              {/* <Route path="/user" element={<UserDashboard />} /> */}
            <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/weather" element={<Weather />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </MantineProvider>
  );
}

export default App;
