import Header from "../components/Header";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left */}

          {/* right */}

          <div className="flex-1">
            <form className="flex flex-col gap-4 ">
              <label className="text-white" htmlFor="email">
                Email:
              </label>
              <input
                className="p-3 rounded-lg border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                id="email"
                name="email"
                type="email"
                required
              />
              <label className="text-white" htmlFor="password">
                Password:
              </label>
              <input
                className="p-3 rounded-lg border text-sm border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                id="password"
                name="password"
                type="password"
                required
              />
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                formAction={login}>
                Log in
              </button>
              <button
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                formAction={signup}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
