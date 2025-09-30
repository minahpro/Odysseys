'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

// use the react-quill-new fork (no findDOMNode) with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});
import 'react-quill-new/dist/quill.snow.css';

export function TextEditor() {
  const [editorContent, setEditorContent] = useState('');
  const [savedContents, setSavedContents] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadSavedContents();
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  // <-- removed 'bullet' here; only 'list' is valid
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',               // covers both ordered & bullet
    'link', 'blockquote',
    'color', 'background',
  ];

  const handleSave = async () => {
    if (!editorContent.trim()) {
      toast.error('Please enter some content before saving');
      return;
    }
    try {
      const res = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editorContent }),
      });
      if (!res.ok) throw new Error('Save failed');
      const result = await res.json();
      setSavedContents([...savedContents, result]);
      setEditorContent('');
      toast.success('Content saved successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save content');
    }
  };

  const loadSavedContents = async () => {
    try {
      const res = await fetch('/api/editor');
      if (!res.ok) throw new Error('Load failed');
      const data = await res.json();
      setSavedContents(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load saved contents');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        {mounted && (
          <ReactQuill
            theme="snow"
            value={editorContent}
            onChange={setEditorContent}
            modules={modules}
            formats={formats}
            className="h-64"
          />
        )}
        <Button
          onClick={handleSave}
          className="mt-4 w-full"
          disabled={!editorContent.trim()}
        >
          Save Content
        </Button>
      </Card>

      {savedContents.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Saved Contents</h2>
          <div className="space-y-4">
            {savedContents.map((item, idx) => (
              <Card key={idx} className="p-4 bg-gray-50">
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <p className="text-sm text-gray-500 mt-2">
                  Saved on: {new Date(item.createdAt).toLocaleString()}
                </p>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}