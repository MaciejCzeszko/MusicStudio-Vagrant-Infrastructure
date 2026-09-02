import Button from "./Button";

export const Form = ({ login, onSubmit, onChange, formData }) => {
  return (
    <div class="flex flex-col justify-center px-6 py-12 rounded-md bg-gray-900">
      <h2 class="text-2xl font-bold tracking-tight text-white text-center">
        {login == "login" ? "Sign in to your account" : "Register your account"}
      </h2>

      <div class="mt-10">
        <form onSubmit={onSubmit} method="POST" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-100"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              autoComplete="email"
              class="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-100"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              autoComplete="current-password"
              class="mt-2 w-full rounded-md bg-white/5 px-3 py-1.5 outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
            />
          </div>

          <Button style="flex w-full justify-center">
            {login == "login" ? "Login" : "Register"}
          </Button>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-400">
          {login == "login"
            ? "Don't have an account yet? "
            : "Already have an account? "}
          <a
            href={login == "login" ? "/register" : "/login"}
            class="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {login == "login" ? "Register" : "Log in"}
          </a>
        </p>
      </div>
    </div>
  );
};
