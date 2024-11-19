import React from 'react';
import { Download, Loader } from 'lucide-react';
import useDesignStore from '../../stores/designStore';

export default function GeneratedDesigns() {
  const { generatedDesigns, isGenerating } = useDesignStore();

  if (isGenerating) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-orange-500 mx-auto" />
          <p className="mt-4 text-gray-600">Generating your designs...</p>
        </div>
      </div>
    );
  }

  if (generatedDesigns.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No designs generated yet</p>
          <p className="text-sm mt-2">Upload a design and set parameters to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {generatedDesigns.map((design, index) => (
        <div key={index} className="relative group">
          <img
            src={design.url}
            alt={`Generated design ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}