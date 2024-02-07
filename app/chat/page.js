import ChatArea from "./ChatArea";
import MessageArea from "./MessageArea";

function Home() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 h-[80%] w-[80%] lg:w-[50%] grid grid-rows-[10fr_1fr] rounded-2xl overflow-auto items-end">
        <MessageArea />
        <div className="bg-gray-700 rounded-b-2xl grid grid-cols-[1fr_6rem] max-w-full">
          <ChatArea />
          <button className="px-2 py-1 font-bold uppercase text-gray-200 bg-blue-700 text-xl hover:text-2xl hover:bg-blue-800 transition-all duration-300 rounded-br-2xl">
            Send
          </button>
        </div>
      </div>
    </main>
  );
}

export default Home;
