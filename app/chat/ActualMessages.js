"use client";
import revalidateAll from "./actions";

import { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";
import { useRouter } from "next/navigation";

function IncommingMessage({ sender, content }) {
  return (
    <div className="justify-self-start flex items-center justify-start w-[50%] px-4">
      <div className="w-3 overflow-hidden">
        <div className="h-4 bg-blue-700 rotate-45 transform origin-bottom-right rounded-sm"></div>
      </div>
      <div className="bg-blue-700 p-4 my-6 rounded-lg flex-1 max-w-full break-words">
        <p className="text-center text-lg mb-2 text-gray-200 font-bold">
          {sender}
        </p>
        <hr className="h-1 bg-slate-200" />
        <p className="mt-2 text-gray-200 text-lg">{content}</p>
      </div>
    </div>
  );
}

function OutgoingMessage({ content }) {
  return (
    <div className="w-full flex items-center justify-end">
      <div className="flex items-center justify-end max-w-[50%]">
        <div className="bg-blue-500 p-4 my-6 rounded-lg flex-1 text-gray-200 text-lg break-all">
          {content}
        </div>
        <div className="w-3 overflow-hidden">
          <div className="h-4 bg-blue-500 rotate-45 transform origin-top-left rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

function ActualMessages({ data }) {
  const [list, setList] = useState(data);
  const user = useRef("");
  const router = useRouter();
  useEffect(() => {
    revalidateAll();
    if (typeof window !== "undefined" && window.localStorage) {
      user.current = localStorage.getItem("user");
      if (!user.current) router.push("/");
    }
    const chats = supabase
      .channel("realtimeChats")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chats" },
        (payload) => {
          if (payload.errors) {
            console.error("Error reciving real time messages");
          } else {
            setList((e) => [...e, payload.new]);
            revalidateAll();
          }
        }
      )
      .subscribe();
  }, [router]);

  return (
    <div>
      {list.map((e) =>
        e.sender !== user.current ? (
          <IncommingMessage sender={e.sender} content={e.content} key={e.id} />
        ) : (
          <OutgoingMessage content={e.content} key={e.id} />
        )
      )}
    </div>
  );
}

export default ActualMessages;
