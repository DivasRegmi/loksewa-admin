import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

import Home from "./Screens/Home/Home";
import Contact from "./Screens/Contact/Contact";
import About from "./Screens/About/About";
import Layout from "./components/Layout";
import BannerScreen from "./Screens/Banner/BannerScreen";

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="BannerScreen" element={<BannerScreen />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
  
  );
}

export default App;
