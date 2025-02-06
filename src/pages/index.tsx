import Counter from "@/components/Counter";
import RichTextEditor from "@/components/RichTextEditor";
import UserDataForm from "@/components/UserDataForm";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <div className="flex w-full h-1/2">
        <div className="w-1/2 flex justify-center items-center p-4">
          <Counter />
        </div>
        <div className="w-1/2 flex justify-center items-center p-4">
          <RichTextEditor />
        </div>
      </div>

      <div className="flex w-full">
        
          <UserDataForm />
        
      </div>
    </div>
  );
}
