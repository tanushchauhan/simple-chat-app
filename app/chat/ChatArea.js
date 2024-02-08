"use client";
import { useEffect, useRef } from "react";
import revalidateAll from "./actions";
function ChatArea() {
  const input = useRef(null);
  const check = useRef(false);
  const user = useRef("");
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      user.current = localStorage.getItem("user");
    }
  }, []);

  function handleKey(e) {
    if (e.code == "Enter") {
      e.preventDefault();
      if (check.current) {
        return;
      } else check.current = true;
      if (input.current.innerHTML.trim() === "") {
        check.current = false;
        return;
      }

      const data = { sender: user.current, content: input.current.innerHTML };
      fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (!res.success) {
            console.error("Error sending messages");
          } else {
            input.current.innerHTML = "";
            check.current = false;
          }
        });
    }
  }
  return (
    <>
      <div className="flex items-center h-full w-full">
        <div
          contentEditable="plaintext-only"
          className="h-full py-3 lg:pt-8 min-w-full bg-gray-700 text-xl rounded-b-2xl px-4 text-gray-200 focus:outline-none cursor-text break-all"
          ref={input}
          onKeyDown={handleKey}
        />
      </div>
      <button
        className="px-2 py-1 font-bold uppercase text-gray-200 bg-blue-700 text-xl hover:text-2xl hover:bg-blue-800 transition-all duration-300 rounded-br-2xl"
        onClick={() => {
          const e = {
            code: "Enter",
            preventDefault: () => {
              return;
            },
          };
          handleKey(e);
        }}
      >
        Send
      </button>
    </>
  );
}

export default ChatArea;
