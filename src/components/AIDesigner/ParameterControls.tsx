import React from 'react';
import useDesignStore from '../../stores/designStore';

export default function ParameterControls() {
  const { parameters, updateParameter } = useDesignStore();

  const styles = [
    'Streetwear', 'Formal', 'Athletic', 'Casual', 'Bohemian',
    'Y2K', 'Minimalist', 'Avant-garde', 'Vintage', 'Luxury'
  ];

  const patterns = [
    'Solid', 'Stripes', 'Floral', 'Geometric', 'Abstract',
    'Animal Print', 'Plaid', 'Polka Dot', 'Tie-dye', 'Camouflage'
  ];

  const brandSuggestions = [
    'Similar to Nike sportswear',
    'Inspired by Gucci luxury',
    'Like Zara contemporary',
    'Similar to Supreme streetwear',
    'Like Uniqlo basics',
  ];

  const handleSuggestionClick = (suggestion: string) => {
    updateParameter('prompt', parameters.prompt + ' ' + suggestion);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Design Prompt
        </label>
        <textarea
          value={parameters.prompt}
          onChange={(e) => updateParameter('prompt', e.target.value)}
          placeholder="Describe your design vision or reference specific brands..."
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          rows={3}
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {brandSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Style Category
        </label>
        <select
          value={parameters.style}
          onChange={(e) => updateParameter('style', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {styles.map((style) => (
            <option key={style} value={style.toLowerCase()}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pattern Type
        </label>
        <select
          value={parameters.pattern}
          onChange={(e) => updateParameter('pattern', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          {patterns.map((pattern) => (
            <option key={pattern} value={pattern.toLowerCase()}>
              {pattern}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Palette
        </label>
        <div className="grid grid-cols-5 gap-2">
          {parameters.colors.map((color, index) => (
            <input
              key={index}
              type="color"
              value={color}
              onChange={(e) => {
                const newColors = [...parameters.colors];
                newColors[index] = e.target.value;
                updateParameter('colors', newColors);
              }}
              className="w-full h-8 rounded cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}