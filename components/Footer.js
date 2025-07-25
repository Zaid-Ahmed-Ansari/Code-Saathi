import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialButton from './ui/social-button';

const Footer = () => (
  <footer className="bg-neutral-950  backdrop-blur-xl border-t border-white/20 dark:border-gray-700 py-12 shadow-2xl">
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Image priority src="/logo-white.png" alt="Code Saathi" width={40} height={40} />
            <span className='text-xl font-bold'>Code Saathi</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            Connecting learners with expert coding mentors across India.
          </p>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li><Link href="/" className="hover:text-rose-300">Home</Link></li>
            <li><Link href="/mentors" className="hover:text-rose-300">Find Mentors</Link></li>
            <li><Link href="/resources" className="hover:text-rose-300">Resources</Link></li>
            <li><Link href="/about" className="hover:text-rose-300">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-rose-300">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Follow Us</h4>
          <SocialButton/>
        </div>
        
        
      </div>
      <div className="mt-10 border-t-0 pt-8 text-center relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-1/2 h-1 bg-gradient-to-r from-rose-300 via-white to-rose-300 opacity-60 rounded-full" />
        <p className="text-gray-600 dark:text-gray-400 text-sm z-10 relative">&copy; 2025 Code Saathi. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer; 