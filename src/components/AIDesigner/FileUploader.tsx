import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import useDesignStore from '../../stores/designStore';

export default function FileUploader() {
  const { uploadedFile, setUploadedFile } = useDesignStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, [setUploadedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg'],
      'image/png': ['.png'],
      'application/illustrator': ['.ai']
    },
    maxFiles: 1
  });

  const removeFile = () => setUploadedFile(null);

  return (
    <div>
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-500'}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag & drop your design file here, or click to select
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Supports SVG, PNG, and AI files
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center p-4 bg-orange-50 rounded-lg">
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-gray-900 truncate">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={removeFile}
              className="ml-4 flex-shrink-0 text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}