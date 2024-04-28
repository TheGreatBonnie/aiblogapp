"use client";

import Link from "next/link";
import { logout } from "../logout/actions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type User = {};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        console.log("No User");
      } else {
        setUser(data.user);
      }

      const userEmail = "thegreatechwriters@gmail.com";

      if (!data?.user || data.user?.email !== userEmail) {
        console.log("No Admin");
      } else {
        setAdmin(data.user);
      }
    }
    getUser();
  }, []);

  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-800 border-b border-gray-200 text-sm py-3 sm:py-0 ">
        <nav
          className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global">
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl text-white font-semibold "
              href="/"
              aria-label="Brand">
              AIBlog
            </Link>
          </div>
          <div id="navbar-collapse-with-animation" className="">
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              {admin ? (
                <Link
                  className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                  href="/createpost">
                  Create Post
                </Link>
              ) : (
                <div></div>
              )}

              {user ? (
                <form action={logout}>
                  <button
                    className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                    type="submit">
                    Logout
                  </button>
                </form>
              ) : (
                <Link
                  className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                  href="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
