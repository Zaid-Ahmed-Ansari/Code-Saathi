import React from 'react';

export default function ContactPage() {
  return (
    <section className="py-20 bg-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300">
            Have questions? We're here to help you start your coding journey
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                {/* Mail icon will be imported or passed as a prop */}
                <span className="text-gray-300">hello@codesaathi.com</span>
              </div>
              <div className="flex items-center">
                {/* Phone icon will be imported or passed as a prop */}
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                {/* MapPin icon will be imported or passed as a prop */}
                <span className="text-gray-300">Bangalore, India</span>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {/* Social icons will be imported or passed as a prop */}
              </div>
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                onClick={() => alert('Message sent! We\'ll get back to you soon.')}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 