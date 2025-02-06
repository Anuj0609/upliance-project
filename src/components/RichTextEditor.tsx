import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

function RichTextEditor() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedContent = localStorage.getItem("editorContent");
      console.log("Saved Content:", savedContent); 
      if (savedContent) {
        setContent(savedContent);
      }
    }
  }, []);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: content, 
    onUpdate: ({ editor }) => {
      if (typeof window !== "undefined") {
        const htmlContent = editor.getHTML();
        console.log("Saving Content:", htmlContent); 
        localStorage.setItem("editorContent", htmlContent);
      }
    },
  });

 

  const handleReset = () => {
    if (editor) {
      editor.commands.setContent("");
      localStorage.removeItem("editorContent");
      alert("Content reset!");
      setContent("")
    }
  };

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="w-full h-full m-10 p-6 bg-slate-700 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Rich Text Editor
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          Underline
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          Bullet List
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          Ordered List
        </button>
       
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <div className="border p-3 rounded bg-gray-50 min-h-[200px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default RichTextEditor;
