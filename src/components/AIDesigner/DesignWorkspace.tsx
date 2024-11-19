import React from 'react';
import { Upload, Palette, Wand2, Download } from 'lucide-react';
import FileUploader from './FileUploader';
import ParameterControls from './ParameterControls';
import GeneratedDesigns from './GeneratedDesigns';
import useDesignStore from '../../stores/designStore';

export default function DesignWorkspace() {
  const { isGenerating, generateDesigns } = useDesignStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">AI Design Studio</h1>
          <p className="mt-4 text-xl text-gray-600">Transform your sketches into professional designs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Upload className="w-5 h-5 text-orange-500 mr-2" />
                <h2 className="text-lg font-semibold">Upload Design</h2>
              </div>
              <FileUploader />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-orange-500 mr-2" />
                <h2 className="text-lg font-semibold">Design Parameters</h2>
              </div>
              <ParameterControls />
            </div>

            <button
              onClick={generateDesigns}
              disabled={isGenerating}
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition duration-300 flex items-center justify-center disabled:opacity-50"
            >
              <Wand2 className="w-5 h-5 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Designs'}
            </button>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Generated Designs</h2>
                <button className="text-orange-500 hover:text-orange-600 flex items-center">
                  <Download className="w-5 h-5 mr-1" />
                  Download All
                </button>
              </div>
              <GeneratedDesigns />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}