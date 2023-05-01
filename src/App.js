import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";

import Home from "./Screens/Home/Home";
import Layout from "./components/Layout";
import BannerScreen from "./Screens/Banner/BannerScreen";
import SectionScreen from "./Screens/Section/SectionScreen";
import TopicScreen from "./Screens/Topic/TopicScreen";
import RouteConfig from "./config/RouteConfig";
import QuestionScreen from "./Screens/Question/QuestionScreen";
import NewsSectionScreen from "./Screens/NewsSection/NewsSectionScreen";
import EventSectionScreen from "./Screens/EventSection/EventSectionScreen";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={RouteConfig.BANNER_SCREEN} element={<BannerScreen />} />
        <Route path={RouteConfig.SECTION_SCREEN} element={<SectionScreen />} />
        <Route path={RouteConfig.NEWS_SECTION_SCREEN} element={<NewsSectionScreen />} />
        <Route path={RouteConfig.EVENT_SECTION_SCREEN} element={<EventSectionScreen />} />
        <Route path={RouteConfig.TOPIC_SCREEN} element={<TopicScreen />} />
        <Route
          path={RouteConfig.QUESTION_SCREEN}
          element={<QuestionScreen />}
        />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
