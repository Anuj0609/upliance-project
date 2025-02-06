import Counter from "@/components/Counter";
import RichTextEditor from "@/components/RichTextEditor";
import UserDataForm from "@/components/UserDataForm";

export default function Home() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <div className="flex justify-between items-center p-4">
        <span className="text-xl font-bold">upliance.ai</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>

      <div className="flex w-full md:h-1/2 md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <Counter />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <RichTextEditor />
        </div>
      </div>

      <div className="flex w-full">
        <UserDataForm />
      </div>
    </div>
  );
}
