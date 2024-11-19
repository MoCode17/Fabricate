import React from 'react';
import { Palette, FileStack, Sparkles, Share2, Image, Users, TrendingUp, ShoppingBag } from 'lucide-react';

const features = [
  {
    name: 'Mockup Generator',
    description: 'Create detailed 2D mockups with easy-to-use drag-and-drop tools.',
    icon: Palette,
  },
  {
    name: 'Tech Pack Builder',
    description: 'Auto-generate professional tech packs with fabric details and measurements.',
    icon: FileStack,
  },
  {
    name: 'AI-Generated Designs',
    description: 'Generate unique patterns and styles from mood boards or text prompts.',
    icon: Sparkles,
  },
  {
    name: 'Social Media Formatting',
    description: 'Format designs into high-quality mockups for social media platforms.',
    icon: Share2,
  },
  {
    name: 'Reference Image Uploader',
    description: 'Upload and integrate inspiration images seamlessly into your designs.',
    icon: Image,
  },
  {
    name: 'Collaboration Hub',
    description: 'Share and comment on designs with your team in real-time.',
    icon: Users,
  },
  {
    name: 'AI-Driven Trend Insights',
    description: 'Stay ahead with AI-powered fashion trend analysis and suggestions.',
    icon: TrendingUp,
  },
  {
    name: 'Marketplace Integration',
    description: 'Export designs directly to e-commerce and print-on-demand services.',
    icon: ShoppingBag,
  },
];

export default function Features() {
  return (
    <div className="py-12 bg-gradient-to-b from-gray-50 to-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent sm:text-4xl">
            Everything you need to design and launch
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Powerful tools to bring your fashion ideas to life
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} 
                   className="group relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="relative">
                  <feature.icon className="h-8 w-8 text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text" />
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}