import React from 'react';

export default function AboutPage() {
  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              About Code Saathi
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Code Saathi is India's premier platform connecting aspiring developers with experienced mentors. 
              We believe that personalized guidance accelerates learning and helps developers achieve their goals faster.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Our mentors are carefully vetted professionals from top tech companies, startups, and successful freelancers 
              who are passionate about sharing their knowledge and helping the next generation of developers.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-indigo-400 mb-2">10K+</h3>
                <p className="text-gray-300">Students Mentored</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-400 mb-2">500+</h3>
                <p className="text-gray-300">Expert Mentors</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    {/* ChevronRight icon will be imported or passed as a prop */}
                    Personalized 1-on-1 mentoring
                  </li>
                  <li className="flex items-center">
                    {/* ChevronRight icon will be imported or passed as a prop */}
                    Industry-relevant curriculum
                  </li>
                  <li className="flex items-center">
                    {/* ChevronRight icon will be imported or passed as a prop */}
                    Flexible scheduling
                  </li>
                  <li className="flex items-center">
                    {/* ChevronRight icon will be imported or passed as a prop */}
                    Affordable pricing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 