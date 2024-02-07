"use client";

import { useRouter } from "next/navigation";
import revalidateAll from "./actions";

function LogoutBtn() {
  const router = useRouter();

  function handleClick() {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("user");
      revalidateAll();
      router.push("/");
    }
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => {
          handleClick();
        }}
        className="px-4 py-2 bg-blue-600 text-gray-200 text-xl rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:text-2xl -mt-20"
      >
        Logout
      </button>
    </div>
  );
}

export default LogoutBtn;
