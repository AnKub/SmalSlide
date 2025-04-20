import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Weather from './pages/Weather';
import Layout from './components/Layout';

import { MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>

          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/weather" element={<Weather />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
