import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 29,
    features: [
      'Basic mockup generator',
      'Simple tech pack builder',
      'Limited AI design suggestions',
      'Social media export (basic)',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 79,
    featured: true,
    features: [
      'Advanced mockup generator',
      'Full tech pack builder',
      'Unlimited AI design generation',
      'All social media formats',
      'Team collaboration (up to 5)',
      'Priority support',
      'Trend insights',
    ],
  },
  {
    name: 'Enterprise',
    price: 199,
    features: [
      'Everything in Professional',
      'Unlimited team members',
      'Custom integrations',
      'Advanced analytics',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom AI training',
    ],
  },
];

export default function Pricing() {
  return (
    <div className="py-12 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your business
          </p>
        </div>

        <div className="mt-20 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier) => (
            <div key={tier.name} 
                 className={`relative p-8 bg-white border rounded-2xl shadow-sm flex flex-col
                            ${tier.featured ? 'ring-2 ring-orange-500 scale-105' : ''}`}>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">{tier.name}</h3>
                <p className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                  <span className="ml-1 text-xl font-semibold">/month</span>
                </p>
                <ul className="mt-6 space-y-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-orange-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium
                                ${tier.featured
                                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                                  : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}>
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}