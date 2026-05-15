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
          <div className="min-h-screen bg-slate-950 text-white grid place-items-center">
            Loading TaskSphere...
          </div>
        }
      >

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route

            path="/"

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
