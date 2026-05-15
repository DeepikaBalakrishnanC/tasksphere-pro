import {
  Suspense,
  lazy
} from "react";

import {

  BrowserRouter,

  Navigate,

  Routes,

  Route

} from "react-router-dom";


import ProtectedRoute
from "./components/ProtectedRoute";

const Welcome =
  lazy(() => import("./pages/Welcome"));

const Dashboard =
  lazy(() => import("./pages/Dashboard"));

const Login =
  lazy(() => import("./pages/Login"));

const Register =
  lazy(() => import("./pages/Register"));

const Projects =
  lazy(() => import("./pages/Projects"));

const Team =
  lazy(() => import("./pages/Team"));

const Settings =
  lazy(() => import("./pages/Settings"));


function App() {

  return (

    <BrowserRouter>

      <Suspense
        fallback={
          <div className="min-h-screen bg-[#101318] text-[#f7f3e8] grid place-items-center">
            Loading PulseForge...
          </div>
        }
      >

        <Routes>

          <Route
            path="/"
            element={<Welcome />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route

            path="/dashboard"

            element={

              <ProtectedRoute>

                <Dashboard />

              </ProtectedRoute>

            }

          />

          <Route

            path="/projects"

            element={

              <ProtectedRoute>

                <Projects />

              </ProtectedRoute>

            }

          />

          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <Team />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </Suspense>

    </BrowserRouter>

  );

}

export default App;
