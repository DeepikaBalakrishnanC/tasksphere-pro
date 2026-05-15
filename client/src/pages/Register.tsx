import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../context/useAuth";
import { registerUser } from "../services/auth";

const Register = () => {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();
      setError("");
      setLoading(true);

      try {
        const data =
          await registerUser({
            name,
            email,
            password
          });

        if (!data.token) {
          throw new Error(
            "Register response did not include a token"
          );
        }

        login(
          data.token,
          {
            name:
              data.user?.name || name,
            email:
              data.user?.email || email
          }
        );

        navigate("/");
      } catch(error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to create account"
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

          Create Account

        </h1>

        <p className="text-slate-400 mb-6">
          Start managing projects with the PWA workspace.
        </p>

        {error && (
          <p className="mb-4 rounded-xl bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >

          <input

            type="text"

            placeholder="Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"

            required

          />


          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"

            required

          />


          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="w-full p-3 rounded-xl bg-slate-800 text-white outline-none border border-slate-700"

            minLength={6}

            required

          />


          <button

            type="submit"

            disabled={loading}

            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 p-3 rounded-xl text-white font-semibold"

          >

            {loading ? "Creating..." : "Create Account"}

          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>
        </p>

      </div>

    </div>

  );

};

export default Register;
