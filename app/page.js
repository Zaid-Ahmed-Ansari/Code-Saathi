'use client'
import React from 'react';
import HeroSection from '@/components/HeroSection';
import { MovingMentors } from '@/components/MovingMentors.';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const aboutStats = [
  { number: "10K+", label: "Students Mentored" },
  { number: "500+", label: "Expert Mentors" },
  { number: "95%", label: "Success Rate" },
  { number: "4.9/5", label: "Average Rating" },
];

const resources = [
  {
    title: "JavaScript for Beginners",
    description: "A comprehensive guide to learning JavaScript from scratch.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
    tag: "Beginner"
  },
  {
    title: "Frontend Mentor Challenges",
    description: "Practice real-world HTML, CSS, and JavaScript challenges.",
    link: "https://www.frontendmentor.io/challenges",
    tag: "Frontend"
  },
  {
    title: "LeetCode Algorithms",
    description: "Sharpen your coding skills with algorithm challenges.",
    link: "https://leetcode.com/problemset/all/",
    tag: "Interview"
  },
  
];

function AboutSnippet() {
  return (
    <section className="w-full bg-neutral-950 py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-300 via-white to-rose-300 bg-clip-text text-transparent">
            About Code Saathi
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            India’s premier platform connecting aspiring developers with experienced mentors. Personalized guidance accelerates learning and helps developers achieve their goals faster.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
        >
          {aboutStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-rose-300 mb-1">{stat.number}</h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center">
          <Button
            variant="outline"
            className="group border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
            asChild
          >
            <Link href="/about">
              Learn More About Us
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
              </motion.span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ResourcesSnippet() {
  return (
    <section className="w-full bg-neutral-950 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-rose-300 via-white to-rose-300 bg-clip-text text-transparent">
            Resources for Learners
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Curated guides, challenges, and docs to help you level up your coding journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {resources.map((resource, idx) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-300/20 text-rose-200">
                  {resource.tag}
                    </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {resource.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="group border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2 mt-2"
                asChild
              >
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  Visit
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-2 transition-transform duration-200" />
                  </motion.span>
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="group border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
            asChild
          >
            <Link href="/resources">
              Explore All Resources
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
              </motion.span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div suppressHydrationWarning={true} className="min-h-screen  bg-gray-900">
      <HeroSection />
      <AboutSnippet />
      <ResourcesSnippet />
      <MovingMentors/>
    </div>
  );
}