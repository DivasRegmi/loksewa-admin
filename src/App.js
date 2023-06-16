import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import RouteConfig from "./config/RouteConfig";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import PrivateRoutes from "./components/PrivateRoutes";
import SuspenseRoutes from "./components/SuspenseRoutes";
import CategoryScreen from "./Screens/Category/CategoryScreen";
import AddSectionToCategoryScreen from "./Screens/Category/AddSectionToCategoryScreen";
import TopicDescriptionScreen from "./Screens/TopicDescription/TopicDescriptionScreen";
import CKEditorTopicDescription from "./Screens/TopicDescription/CKEditorTopicDescription";

const Home = lazy(() => import("./Screens/Home/Home"));
const BannerScreen = lazy(() => import("./Screens/Banner/BannerScreen"));
const SectionScreen = lazy(() => import("./Screens/Section/SectionScreen"));
const TopicScreen = lazy(() => import("./Screens/Topic/TopicScreen"));
const QuestionScreen = lazy(() => import("./Screens/Question/QuestionScreen"));
const NewsSectionScreen = lazy(() =>
  import("./Screens/NewsSection/NewsSectionScreen")
);
const EventSectionScreen = lazy(() =>
  import("./Screens/EventSection/EventSectionScreen")
);
const NewsScreen = lazy(() => import("./Screens/News/NewsScreen"));
const EventScreen = lazy(() => import("./Screens/Event/EventScreen"));
const SearchQuestion = lazy(() => import("./Screens/Question/SearchQuestion"));
const QuestionReport = lazy(() => import("./Screens/Question/QuestionReport"));
const ExamScreen = lazy(() => import("./Screens/Exam/ExamScreen"));
const ExamDetails = lazy(() => import("./Screens/Exam/ExamDetails"));
const ExamModelSetSectionScreen = lazy(() =>
  import("./Screens/ExamModelSetSection/ExamModelSetSectionScreen")
);
const ExamModelSetScreen = lazy(() =>
  import("./Screens/ExamModelSet/ExamModelSetScreen")
);
const PaymentScreen = lazy(() => import("./Screens/Payment/PaymentScreen"));
const LoginScreen = lazy(() => import("./Screens/Auth/LoginScreen"));
const RegisterScreen = lazy(() => import("./Screens/Auth/RegisterScreen"));
const UserScreen = lazy(() => import("./Screens/Users/UserScreen"));
const EditUser = lazy(() => import("./Screens/Users/EditUser"));
const DisplayPaymentByUserId = lazy(() =>
  import("./Screens/Payment/DisplayPaymentByUserId")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<SuspenseRoutes />}>
          <Route path={RouteConfig.LOGIN_SCREEN} element={<LoginScreen />} />
          <Route
            path={RouteConfig.REGISTER_SCREEN}
            element={<RegisterScreen />}
          />

          <Route element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path={RouteConfig.USERS_SCREEN} element={<UserScreen />} />
            <Route path={RouteConfig.EDIT_USER_SCREEN} element={<EditUser />} />
            <Route path={RouteConfig.PAYMENT} element={<PaymentScreen />} />
            <Route
              path={RouteConfig.PAYMENT_BY_USER_ID}
              element={<DisplayPaymentByUserId />}
            />

            <Route
              path={RouteConfig.BANNER_SCREEN}
              element={<BannerScreen />}
            />
            <Route
              path={RouteConfig.CATEGORY_SCREEN}
              element={<CategoryScreen />}
            />
            <Route
              path={RouteConfig.ADD_SECTION_TO_CATEGORY_SCREEN}
              element={<AddSectionToCategoryScreen />}
            />
            <Route
              path={RouteConfig.SECTION_SCREEN}
              element={<SectionScreen />}
            />
            <Route path={RouteConfig.TOPIC_SCREEN} element={<TopicScreen />} />
            <Route
              path={RouteConfig.TOPIC_DESCRIPTION_SCREEN}
              element={<TopicDescriptionScreen />}
            />
            <Route
              path={RouteConfig.TOPIC_DESCRIPTION_CK_Editor_SCREEN}
              element={<CKEditorTopicDescription />}
            />

            <Route
              path={RouteConfig.NEWS_SECTION_SCREEN}
              element={<NewsSectionScreen />}
            />
            <Route path={RouteConfig.NEWS_SCREEN} element={<NewsScreen />} />
            <Route path={RouteConfig.EVENT_SCREEN} element={<EventScreen />} />
            <Route
              path={RouteConfig.EVENT_SECTION_SCREEN}
              element={<EventSectionScreen />}
            />
            <Route
              path={RouteConfig.QUESTION_SCREEN}
              element={<QuestionScreen />}
            />
            <Route
              path={RouteConfig.SEARCH_QUESTION}
              element={<SearchQuestion />}
            />
            <Route
              path={RouteConfig.QUESTION_REPORT}
              element={<QuestionReport />}
            />
            <Route path={RouteConfig.EXAM_SCREEN} element={<ExamScreen />} />
            <Route path={RouteConfig.EXAM_DETAILS} element={<ExamDetails />} />
            <Route
              path={RouteConfig.EXAM_MODEL_SET_SECTION}
              element={<ExamModelSetSectionScreen />}
            />
            <Route
              path={RouteConfig.EXAM_MODEL_SET}
              element={<ExamModelSetScreen />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
