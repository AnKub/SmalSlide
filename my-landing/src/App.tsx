import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider, createTheme } from "@mantine/core";
import { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const NYTNews = lazy(() => import('./pages/NYTNews'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Weather = lazy(() => import('./pages/Weather'));
const Library = lazy(() => import('./pages/Library'));

import ScrollToTop from './components/ScrollToTop'; 
import Layout from './Layout';

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
         <ScrollToTop />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/nytnews" element={<NYTNews />} />
              <Route path="/library" element={<Library />} />
              <Route path="/contact" element={<Contact />} />
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
