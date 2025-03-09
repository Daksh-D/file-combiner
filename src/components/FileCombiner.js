"use client"

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileCombiner() {
  const [files, setFiles] = useState([]);
  const [combinedContent, setCombinedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'text/*',
    multiple: true,
  });

  const combineFiles = async () => {
    setIsLoading(true);
    let content = '';
    
    for (const file of files) {
      const text = await file.text();
      content += `/* File: ${file.name} */\n${text}\n\n`;
    }
    
    setCombinedContent(content);
    setIsLoading(false);
  };

  const handleDownload = () => {
    const blob = new Blob([combinedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'combined-code.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      {/* Branding Section */}
      <div className="text-center mb-10">
        <img 
          src="/logo.svg" 
          alt="CodeFusion Logo" 
          className="w-24 h-24 mx-auto mb-4"
          style={{ filter: 'drop-shadow(0 0 15px #ffd700)' }}
        />
        <h1 className="text-5xl font-bold text-secondary mb-3">CodeFusion</h1>
        <p className="text-accent text-lg">Merge your code files in style</p>
      </div>

      {/* Dropzone */}
      <div 
        {...getRootProps()}
        className="border-2 border-dashed border-secondary rounded-3xl p-10 mb-8
                  bg-luxury-bg bg-opacity-60 backdrop-blur-md
                  transition-all duration-300 hover:scale-[1.015]"
      >
        <input {...getInputProps()} />
        <p className="text-luxury-text text-lg flex flex-col items-center">
          <svg 
            className="w-14 h-14 mb-3 text-secondary"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
          <span className="font-semibold">Drag & drop files here or click to select</span>
        </p>
      </div>

      {/* File List */}
      <div className="flex flex-wrap gap-3 mb-8">
        {files.map((file) => (
          <div 
            key={file.name}
            className="flex items-center bg-luxury-bg px-5 py-3 rounded-xl
                      text-luxury-text shadow-md border border-luxury-border"
          >
            <svg 
              className="w-6 h-6 mr-3 text-secondary"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm">{file.name}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-5 mb-10">
        <button 
          onClick={combineFiles}
          disabled={files.length === 0 || isLoading}
          className="bg-secondary text-primary px-8 py-4 rounded-xl
                    hover:bg-accent hover:text-white transition-all duration-300
                    disabled:bg-gray-600 disabled:cursor-not-allowed
                    flex items-center justify-center space-x-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Combining...</span>
            </>
          ) : (
            <>
              <svg 
                className="w-6 h-6" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4"
                />
              </svg>
              <span>Combine Files</span>
            </>
          )}
        </button>
      </div>

      {/* Result Section */}
      {combinedContent && (
        <div className="bg-luxury-bg rounded-3xl p-6 shadow-xl border border-luxury-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-secondary">Combined Code</h2>
            <button 
              onClick={handleDownload}
              className="bg-accent px-6 py-3 rounded-xl
                        hover:bg-secondary hover:text-accent transition-all duration-300
                        flex items-center space-x-2"
            >
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" fill="none" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12h6m-6 4h6m2 5v-5a1 1 0 00-1-1h-3a1 1 0 00-1 1v3h-3a1 1 0 00-1 1v3a1 1 0 001 1h3"
                />
              </svg>
              <span>Download</span>
            </button>
          </div>
          <pre className="max-h-72 overflow-y-auto p-5 bg-luxury-bg rounded-xl text-sm text-luxury-text">
            {combinedContent}
          </pre>
        </div>
      )}
    </div>
  );
}