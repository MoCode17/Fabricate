import React from 'react';
import { ArrowRight } from 'lucide-react';

const showcaseItems = [
  {
    title: 'Tech Pack Generation',
    description: 'Automatically generate detailed tech packs from your designs',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800',
    techPackImage: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'AI Pattern Design',
    description: 'Create unique patterns and prints using AI',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    techPackImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Mockup Visualization',
    description: 'See your designs come to life with instant 3D mockups',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
    techPackImage: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Showcase() {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            From concept to production-ready designs in minutes
          </p>
        </div>

        <div className="mt-16 space-y-16">
          {showcaseItems.map((item, index) => (
            <div key={item.title} className={`flex flex-col lg:flex-row gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-lg text-gray-500">{item.description}</p>
                <button className="group flex items-center text-indigo-600 font-medium">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
              <div className="flex-1 space-y-4">
                <div className="gradient-border">
                  <div className="p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="gradient-border">
                  <div className="p-2">
                    <img
                      src={item.techPackImage}
                      alt={`${item.title} tech pack`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}