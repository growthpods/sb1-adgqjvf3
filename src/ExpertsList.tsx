import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

interface Expert {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  background: string;
  hourly_rate: number;
  image_url?: string;
}

const ExpertsList = ({ onBack, onExpertSelect }: { 
  onBack: () => void;
  onExpertSelect: (expert: Expert) => void;
}) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Product Design',
    'Software Engineering',
    'Marketing',
    'Business Strategy',
    'Data Science',
    'Leadership',
    'Sales',
    'Finance'
  ];

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const { data, error } = await supabase
        .from('experts')
        .select('*')
        .order('name');

      if (error) throw error;
      setExperts(data || []);
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperts = selectedCategory === 'All' 
    ? experts 
    : experts.filter(expert => 
        expert.expertise.some(skill => 
          skill.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.toLowerCase().includes(skill.toLowerCase())
        )
      );

  const getExpertImage = (expert: Expert) => {
    if (expert.image_url) return expert.image_url;
    
    // Generate a placeholder based on name
    const initials = expert.name.split(' ').map(n => n[0]).join('');
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=6366f1&color=fff&size=200`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading experts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="/logos/logo.png" alt="MeetExperts" className="h-8" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={onBack} className="text-neutral-600 hover:text-neutral-900">
                Back
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Expert</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with world-class experts across various fields. Get personalized advice, 
            mentorship, and insights to accelerate your growth.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredExperts.length} expert{filteredExperts.length !== 1 ? 's' : ''} found
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Experts Grid */}
        {filteredExperts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No experts found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperts.map((expert) => (
              <div
                key={expert.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer"
                onClick={() => onExpertSelect(expert)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={getExpertImage(expert)}
                      alt={expert.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                      <p className="text-sm text-gray-600">{expert.title}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {expert.expertise.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {expert.expertise.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{expert.expertise.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {expert.background}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">
                      ${expert.hourly_rate / 100}/hour
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Don't see the right expert?</h2>
          <p className="text-gray-600 mb-6">
            We're constantly adding new experts to our platform. Let us know what expertise you're looking for.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
            Request an Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpertsList;
