import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { loginUser } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();
      setError("");
      setLoading(true);

      try {

        const data =
          await loginUser({

            email,
            password

          });


        if (!data.token) {
          throw new Error(
            "Login response did not include a token"
          );
        }

        login(
          data.token,
          {
            name:
              data.user?.name,
            email:
              data.user?.email || email
          }
        );

        navigate("/dashboard");

      } catch(error) {

        setError(
          error instanceof Error
            ? error.message
            : "Unable to login"
        );

      } finally {
        setLoading(false);
      }

    };


  return (

    <div
      className="min-h-screen flex items-center justify-center bg-slate-950 px-4"
    >

      <div
        className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-slate-800 shadow-xl"
      >

        <p className="text-blue-400 font-semibold mb-2">
          TaskSphere Pro
        </p>

        <h1
          className="text-3xl font-bold mb-2 text-white"
        >

          Login

        </h1>

        <p className="text-slate-400 mb-6">
          Continue to your productivity workspace.
        </p>

        {error && (
          <p className="mb-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <form

          onSubmit={handleLogin}

          className="space-y-4"

        >

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"

            required

          />


          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"

            required

          />


          <button

            type="submit"

            disabled={loading}

            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 transition p-3 rounded-xl text-white font-semibold"

          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Create an account
          </Link>
        </p>

      </div>

    </div>

  );

};

export default Login;
