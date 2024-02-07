"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

function Page() {
  const input = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const res = localStorage.getItem("user") || "";
      if (res !== "") router.push("/chat");
    }
  }, [router]);

  function handlekey(e) {
    if (e.code === "Enter") {
      e.preventDefault();
      if (input.current === "") return;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", input.current.value);
        router.push("/chat");
      }
    }
  }
  return (
    <main
      className="flex flex-col items-center justify-center h-screen"
      onKeyDown={handlekey}
    >
      <h1 className="text-gray-200 text-3xl my-4">
        Welcome to a Simple Chat app!
      </h1>
      <h2 className="text-gray-200 text-2xl my-4">
        Enter your name below to start -
      </h2>
      <input className="outline-none p-2 rounded-2xl" ref={input} />
      <button
        className="mt-4 text-gray-200 rounded-2xl bg-blue-600 px-4 py-2 hover:bg-blue-700 transition-all duration-300"
        onClick={() => {
          const e = {
            code: "Enter",
            preventDefault: () => {
              return;
            },
          };
        }}
      >
        submit
      </button>
    </main>
  );
}

export default Page;
