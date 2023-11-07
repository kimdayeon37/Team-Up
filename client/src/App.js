import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteChangeTracker from "./RouteChangeTracker";

import "./App.css";
import HeaderComponent from "./component/navigation/HeaderComponent";

import EditorPage from "./component/pages/EditorPage";
import FooterComponent from "./component/navigation/FooterComponent";
import PostPage from "./component/pages/PostPage";
import MainPage from "./component/pages/MainPage";
import SignupPage from "./component/pages/SignupPage";
import ForumPage from "./component/pages/ForumPage";
import GlobalNavBar from "./component/navigation/GlobalNavBarComponent";
import ScrollToTop from "./component/common/ScrollToTop";
import LoginPage from "./component/pages/LoginPage";
import MyPage from "./component/pages/MyPage";
import UserInfoPage from "./component/pages/UserInfoPage";
import NotFoundPage from "./component/pages/NotFoundPage";
import CheckboxList from "./component/forum/CheckboxList";

function App() {
  RouteChangeTracker();
  return (
    <div>
      <ScrollToTop />
      <div id="all">
        <div className="container">
          <HeaderComponent />
          <GlobalNavBar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Mypage" element={<MyPage />} />
            <Route path="/Mypage/UserInfo" element={<UserInfoPage />} />
            <Route path="/Mypage/Evaluation" element={<CheckboxList />} />
            <Route path="/:Category/:Sub" element={<ForumPage />} />
            <Route path="/:Category/:Sub/post" element={<PostPage />} />
            <Route path="/:Category/:Sub/editor" element={<EditorPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <FooterComponent />
      </div>
    </div>
  );
}

export default App;
