import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 mb-2 p-1 border-b border-gray-300">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('bold') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Bold"
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('italic') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Italic"
      >
        <span className="italic">I</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('strike') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Strikethrough"
      >
        <span className="line-through">S</span>
      </button>
      <div className="border-r border-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Heading 1"
      >
        H1
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Heading 2"
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Heading 3"
      >
        H3
      </button>
      <div className="border-r border-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('bulletList') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('orderedList') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Numbered List"
      >
        1. List
      </button>
      <div className="border-r border-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-2 py-1 text-sm border rounded ${editor.isActive('blockquote') ? 'bg-gray-200 border-gray-400' : 'border-gray-300'}`}
        title="Blockquote"
      >
        " Quote
      </button>
      <div className="border-r border-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-2 py-1 text-sm border rounded border-gray-300"
        title="Horizontal Rule"
      >
        ─
      </button>
      <div className="border-r border-gray-300 mx-1"></div>
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="px-2 py-1 text-sm border rounded border-gray-300"
        title="Undo"
      >
        ↩
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="px-2 py-1 text-sm border rounded border-gray-300"
        title="Redo"
      >
        ↪
      </button>
    </div>
  );
};

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose max-w-none focus:outline-none min-h-[200px] px-3 py-2',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update content from value prop
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '');
    }
  }, [value, editor]);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {!value && !editor?.getText() && placeholder && (
        <div className="absolute top-[3.5rem] left-4 text-gray-400 pointer-events-none">
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
