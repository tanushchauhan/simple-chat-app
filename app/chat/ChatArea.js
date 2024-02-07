"use client";
import { createClient } from "@supabase/supabase-js";
import { useRef } from "react";
function ChatArea() {
  const input = useRef(null);
  const supabaseUrl = "https://givjnsuxonlwccylhmla.supabase.co";
  const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpdmpuc3V4b25sd2NjeWxobWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcyODEzMDgsImV4cCI6MjAyMjg1NzMwOH0.qfd45KZdrZLGCuMpUrNBW-JZjM6w7WcVVmUA5NUZ4fk`;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const user = localStorage.getItem("user");
  function handleKey(e) {
    if (e.code == "Enter") {
      e.preventDefault();
      if (input.current.innerHTML === "") return;
      const data = { sender: user, content: input.current.innerHTML };
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
          }
        });
    }
  }
  return (
    <div className="flex items-center h-full w-full">
      <div
        contentEditable="true"
        className="h-full py-3 lg:pt-8 min-w-full bg-gray-700 text-xl rounded-b-2xl px-4 text-gray-200 focus:outline-none cursor-text break-all"
        ref={input}
        onKeyDown={handleKey}
      />
    </div>
  );
}

export default ChatArea;
