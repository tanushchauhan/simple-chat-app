import ChatArea from "./ChatArea";
import LogoutBtn from "./LogoutBtn";
import MessageArea from "./MessageArea";

function Home() {
  return (
    <>
      <main className="flex items-center justify-center h-screen">
        <div className="bg-gray-800 h-[80%] w-[80%] lg:w-[50%] grid grid-rows-[10fr_1fr] rounded-2xl overflow-auto items-end">
          <MessageArea />
          <div className="bg-gray-700 rounded-b-2xl grid grid-cols-[1fr_6rem] max-w-full">
            <ChatArea />
          </div>
        </div>
      </main>
      <LogoutBtn />
    </>
  );
}

export default Home;
