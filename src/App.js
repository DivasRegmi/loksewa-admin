import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import RouteConfig from "./config/RouteConfig";
import Layout from "./components/Layout";
import NotFoundPage from "./components/NotFoundPage";
import PrivateRoutes from "./components/PrivateRoutes";
import SuspenseRoutes from "./components/SuspenseRoutes";
import AddQuestionsManuallyScreen from "./Screens/Exam/AddQuestionsManuallyScreen";
import DeleteUserScreen from "./Screens/deleteUser/DeleteuserScreen";

const Home = lazy(() => import("./Screens/Home/Home"));
const BannerScreen = lazy(() => import("./Screens/Banner/BannerScreen"));
const SectionScreen = lazy(() => import("./Screens/Section/SectionScreen"));
const TopicScreen = lazy(() => import("./Screens/Topic/TopicScreen"));
const QuestionScreen = lazy(() => import("./Screens/Question/QuestionScreen"));
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

const CategoryScreen = lazy(() => import("./Screens/Category/CategoryScreen"));
const AddSectionToCategoryScreen = lazy(() =>
  import("./Screens/Category/AddSectionToCategoryScreen")
);
const TopicDescriptionScreen = lazy(() =>
  import("./Screens/TopicDescription/TopicDescriptionScreen")
);
const CKEditorTopicDescription = lazy(() =>
  import("./Screens/TopicDescription/CKEditorTopicDescription")
);
const ImageScreen = lazy(() => import("./Screens/Image/ImageScreen"));
const AddImage = lazy(() => import("./Screens/Image/Addimage"));
const SearchImages = lazy(() => import("./Screens/Image/SearchImages"));
const AddTopicToCategoryScreen = lazy(() =>
  import("./Screens/Category/AddTopicToCategoryScreen")
);
const VacancyScreen = lazy(() => import("./Screens/Vacency/VacancyScreen"));
const CKEditorVacancy = lazy(() => import("./Screens/Vacency/CKEditorVacancy"));

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

          <Route path={RouteConfig.DELETE_USER_SCREEN} element={<DeleteUserScreen />} />

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
              path={RouteConfig.ADD_TOPIC_TO_CATEGORY_SCREEN}
              element={<AddTopicToCategoryScreen />}
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
              path={RouteConfig.EXAM_MANUAL_QUESTION_ADD_SCREEN}
              element={<AddQuestionsManuallyScreen />}
            />
            <Route
              path={RouteConfig.EXAM_MODEL_SET_SECTION}
              element={<ExamModelSetSectionScreen />}
            />
            <Route
              path={RouteConfig.EXAM_MODEL_SET}
              element={<ExamModelSetScreen />}
            />
            <Route path={RouteConfig.IMAGE_SCREEN} element={<ImageScreen />} />
            <Route path={RouteConfig.IMAGE_ADD_SCREEN} element={<AddImage />} />
            <Route
              path={RouteConfig.IMAGE_SEARCH_SCREEN}
              element={<SearchImages />}
            />
            <Route
              path={RouteConfig.VACENCY_SCREEN}
              element={<VacancyScreen />}
            />
            <Route
              path={RouteConfig.VACENCY_CK_Editor_SCREEN}
              element={<CKEditorVacancy />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
