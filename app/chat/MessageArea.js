import dynamic from "next/dynamic";

async function MessageArea() {
  const NoSSR = dynamic(() => import("./ActualMessages"), { ssr: false });
  const res = await import("@/app/api/chats/route");
  const { success, data } = await (await res.GET()).json();
  if (!success)
    return (
      <h1 className="text-red-600 text-3xl text-center">
        Something went wrong! API server down!
      </h1>
    );
  return (
    <div className="h-full overflow-auto flex flex-col-reverse">
      <NoSSR data={data} />
    </div>
  );
}

export default MessageArea;
