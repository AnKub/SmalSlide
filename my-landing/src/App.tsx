import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NYTNews = lazy(() => import('./pages/NYTNews'));
const Philo = lazy(() => import('./pages/Philo'));
const Login = lazy(() => import('./pages/LoginRegister'));
const Weather = lazy(() => import('./pages/Weather'));
const Library = lazy(() => import('./pages/Library'));
const UserDashboard = lazy(() => import('./features/user/UserDashboard'));

import Layout from './Layout';
import ProtectedRoute from './routes/ProtectedRoute';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Suspense fallback={<div>Loading..</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Philo />} />
              <Route path="/nytnews" element={<NYTNews />} />
              <Route path="/library" element={<Library />} />
              <Route path="/hone" element= {<Home />}/>
              <Route path="/user" element={<UserDashboard />} />
            {/* <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              /> */}
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
