import React from 'react';
import { Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />
      <div className="max-w-7xl mx-auto relative">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                <span className="block text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
                  Design Your Fashion
                </span>
                <span className="block text-gray-900">
                  Powered by AI
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Transform your fashion ideas into reality with AI-powered design tools. Create mockups, generate tech packs, and launch your brand faster than ever.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 md:py-4 md:text-lg md:px-10 transition duration-300">
                    Start Creating
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 md:py-4 md:text-lg md:px-10 transition duration-300">
                    Watch Demo
                  </a>
                </div>
              </div>
            </div>
          </main>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <Wand2 className="h-64 w-64 text-transparent bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text" />
          </div>
        </div>
      </div>
    </div>
  );
}