'use client';

import React from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function AboutPage() {
  const stats = [
    { number: "10K+", label: "Students Mentored" },
    { number: "500+", label: "Expert Mentors" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "Average Rating" },
  ];

  const features = [
    {
      title: "Personalized Learning",
      description: "Get one-on-one attention from industry experts who tailor their teaching to your needs.",
      
    },
    {
      title: "Flexible Schedule",
      description: "Book sessions at your convenience, with mentors available across different time zones.",
     
    },
    {
      title: "Real-world Projects",
      description: "Work on practical projects that enhance your portfolio and job-ready skills.",
      
    },
    {
      title: "Career Guidance",
      description: "Get insights into industry trends and career paths from experienced professionals.",
      
    }
  ];

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-neutral-950 py-40">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-300 via-white to-rose-300 bg-clip-text text-transparent">
            About Code Saathi
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            India's premier platform connecting aspiring developers with experienced mentors.
            We believe that personalized guidance accelerates learning and helps developers achieve their goals faster.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-rose-300 mb-2">{stat.number}</h3>
              <p className="text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Ready to Start Your Journey?</h2>
          <Button
            variant="outline"
            className="group border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
            asChild
          >
            <Link href="/mentors">
              Find Your Mentor
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
        </motion.div>
      </div>
    </div>
  );
} 