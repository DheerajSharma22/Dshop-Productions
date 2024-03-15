import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { checkLoggedIn } from "./Services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./Utils/constants";

// Common Page Imports
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./Components/common/Navbar";

// Auth Page Imports
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import OpenRoute from "./Routes/OpenRoute";
import PrivateRoute from "./Routes/PrivateRoute";

// Dashboard Imports
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./Components/core/Dashboard/Profile/MyProfile";
import Setting from "./Components/core/Dashboard/Settings/Setting";
import EnrolledCourses from "./Components/core/Dashboard/EnrolledCourses/EnrolledCouses";
import MyCart from "./Components/core/Dashboard/Cart/MyCart";
import MyCourses from "./Components/core/Dashboard/MyCourses/MyCourses";
import AddCourse from "./Components/core/Dashboard/AddCourse/AddCourse";
import EditCourse from "./Components/core/Dashboard/EditCourse/EditCourse";

// 404 Page Import
import Error from "./Pages/Error";
import Catalog from "./Pages/Catalog";
import CoursePage from "./Pages/CoursePage";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(checkLoggedIn(navigate));
    //eslint-disable-next-line
  }, []);


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <div className="mt-12">
        <Routes>
          {/************************ Normal Routes ************************/}
          <Route path="/" exactc element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/catalog/:catalogName" exact element={<Catalog />} />
          <Route path="/courses/:courseId" exact element={<CoursePage />} />

          {/************************ Open Routes ************************/}
          <Route
            path="/login"
            exact
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
          <Route
            path="/signup"
            exact
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/verify-email"
            exact
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />
          <Route
            path="/forgot-password"
            exact
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
          <Route
            path="/update-password/:token"
            exact
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          {/************************* Private Routes *************************/}

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard/my-profile" exact element={<MyProfile />} />
            <Route path="/dashboard/settings" exact element={<Setting />} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<MyCart />} />
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route
                  path="dashboard/instructor"
                  element={/* <Instructor /> */ <></>}
                />
                <Route
                  path="dashboard/add-course"
                  element={<AddCourse />}
                />
                <Route
                  path="dashboard/my-courses"
                  element={<MyCourses />}
                />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }>
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
              </>
            )}
          </Route>

          {/************************* Not Found Route *************************/}
          <Route
            path="*"
            element={<Error message={"Error 404 - Page Not Found"} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
