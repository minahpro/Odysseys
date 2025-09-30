'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';

// Use the react-quill-new fork (no findDOMNode) with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});
import 'react-quill-new/dist/quill.snow.css';

export function FormTextEditor({ 
  value = '', 
  onChange, 
  placeholder = 'Enter content...', 
  className = '',
  height = 'h-64',
  label,
  required = false,
  error
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list',
    'link', 'blockquote',
    'color', 'background',
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Card className="p-4">
        {mounted && (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            className={height}
          />
        )}
      </Card>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Default export for easier importing
export default FormTextEditor;

// Simple text editor without the card wrapper for inline use
export function InlineTextEditor({ 
  value = '', 
  onChange, 
  placeholder = 'Enter content...', 
  className = '',
  height = 'h-32'
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const formats = [
    'bold', 'italic', 'underline',
    'list',
    'link',
  ];

  return (
    <div className={className}>
      {mounted && (
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className={height}
        />
      )}
    </div>
  );
}