import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LineProvider from "next-auth/providers/line";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import {
  // FORGOT_URL,
  LINE_AUTHORIZATION_BOT_PROMPT,
  LINE_AUTHORIZATION_LOGIN_REDIRECT_URI,
  LINE_AUTHORIZATION_NONCE,
  LINE_AUTHORIZATION_RESPONSE_TYPE,
  LINE_AUTHORIZATION_SCOPE,
  LINE_AUTHORIZATION_STATE,
  LINE_AUTHORIZATION_URL,
} from "../../utils/constants";

const LoginComponent = () => {
  const router = useRouter();
  const { code } = router.query;
  const [lineNonce, setLineNonce] = useState(undefined);
  const [lineState, setLineState] = useState(undefined);
  const [accessToken, setAccessToken] = useState(undefined);

  const generator = require("generate-password");
  const password = generator.generate({
    length: 10,
    numbers: true,
  });

  useEffect(() => {
    setLineNonce(LINE_AUTHORIZATION_NONCE);
    setLineState(LINE_AUTHORIZATION_STATE);
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetch("https://api.line.me/oauth2/v2.1/token", {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams({
  //         grant_type: "authorization_code",
  //         code,
  //         redirect_uri: " https://fd5c-152-165-199-159.jp.ngrok.io/",
  //         client_id: "1657295671",
  //         client_secret: "ba803e05ff7e425513c5f7c229c92a3d",
  //       }),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setAccessToken(data?.accessToken));
  //   }
  //   console.log({ code, accessToken });
  //   if (code && !accessToken) {
  //     fetchData();
  //   }
  // }, [code, accessToken]);
  // console.log(accessToken);

  // useEffect(() => {
  //   async function fetchData() {
  //     await fetch("https://api.line.me/oauth2/v2.1/userinfo", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setProfileData(data));
  //   }

  //   if (accessToken) {
  //     fetchData();
  //   }
  // }, [accessToken]);

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 2xl:py-36">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/">
                <a className="font-medium text-gray-600 hover:text-gray-500">
                  browse more products
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-grat-600 focus:ring-gray-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white group-hover:text-gray-100"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </form>
          <Link
            href={`${LINE_AUTHORIZATION_URL}?response_type=${LINE_AUTHORIZATION_RESPONSE_TYPE}&client_id=${process.env.NEXT_PUBLIC_LINE_AUTHORIZATION_CLIENT_ID}&redirect_uri=${LINE_AUTHORIZATION_LOGIN_REDIRECT_URI}&state=${lineState}&bot_prompt=${LINE_AUTHORIZATION_BOT_PROMPT}&scope=${LINE_AUTHORIZATION_SCOPE}&nonce=${lineNonce}`}
          >
            <div className="cursor-pointer group relative flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              <a>
                <p className="whitespace-pre-wrap text-center text-sm">{`LINEで\n新規登録・ログイン`}</p>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default LoginComponent;

const gql = String.raw;
const customerCreate = gql`
  mutation CustomerCreate($input: CustomerInput) {
    customerCreate(input: $input) {
      customer {
        email
      }
      customerUserErrors {
        field
        message
      }
    }
  }
`;
