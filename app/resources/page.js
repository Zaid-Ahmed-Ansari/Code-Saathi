'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ActionSearchBar from '@/components/ui/search-bar';

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
  {
    title: "React Docs",
    description: "Official documentation for building user interfaces with React.",
    link: "https://react.dev/",
    tag: "Frontend"
  },
  {
    title: "FreeCodeCamp",
    description: "Learn to code for free with millions of other people.",
    link: "https://www.freecodecamp.org/",
    tag: "Fullstack"
  },
  {
    title: "Backend Roadmap",
    description: "A visual roadmap to becoming a backend developer in 2024.",
    link: "https://roadmap.sh/backend",
    tag: "Backend"
  },
  {
    title: "DevOps Bootcamp",
    description: "Free DevOps curriculum and hands-on labs by Codecademy.",
    link: "https://www.codecademy.com/learn/paths/devops",
    tag: "DevOps"
  },
  {
    title: "Kaggle Learn AI",
    description: "Short, hands-on courses for data science and machine learning.",
    link: "https://www.kaggle.com/learn/ai",
    tag: "AI/ML"
  },
  {
    title: "Flutter Documentation",
    description: "Build beautiful native apps in record time with Flutter.",
    link: "https://docs.flutter.dev/",
    tag: "Mobile"
  },
  {
    title: "System Design Primer",
    description: "Learn how to design large-scale systems. Prep for the system design interview.",
    link: "https://github.com/donnemartin/system-design-primer",
    tag: "Interview"
  },
  {
    title: "Python Official Docs",
    description: "The official Python documentation for all levels.",
    link: "https://docs.python.org/3/",
    tag: "Backend"
  },
  {
    title: "CSS Tricks",
    description: "Tips, tricks, and techniques on using CSS.",
    link: "https://css-tricks.com/",
    tag: "Frontend"
  },
  {
    title: "Cracking the Coding Interview",
    description: "The classic book and resource for coding interview prep.",
    link: "https://www.crackingthecodinginterview.com/",
    tag: "Interview"
  },
  {
    title: "MongoDB University",
    description: "Free courses to learn MongoDB and NoSQL databases.",
    link: "https://university.mongodb.com/",
    tag: "Backend"
  },
  {
    title: "Awesome Open Source",
    description: "A curated list of awesome open source projects.",
    link: "https://awesomeopensource.com/",
    tag: "Fullstack"
  }
];

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const actions = resources.map((resource, idx) => ({
    id: String(idx),
    label: resource.title,
    description: resource.tag,
    keywords: [resource.tag],
  }));

  const filteredResources = useMemo(() => {
    if (!search) return resources;
    const q = search.toLowerCase();
    return resources.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.tag.toLowerCase().includes(q)
    );
  }, [search, resources]);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-neutral-950 py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <ActionSearchBar
            actions={actions}
            onQueryChange={setSearch}
            placeholder="Search resources by title or tag..."
          />
        </div>
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-rose-300 via-white to-rose-300 bg-clip-text text-transparent">
            All Coding Resources
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Curated guides, challenges, and docs to help you level up your coding journey.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginatedResources.map((resource, idx) => (
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
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center cursor-pointer items-center gap-2 mt-12">
            <Button
              variant="outline"
              className="px-3 py-1 rounded-lg"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                className={`px-3 cursor-pointer py-1 rounded-lg ${page === i + 1 ? 'bg-rose-300 text-white' : ''}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              className="px-3 cursor-pointer py-1 rounded-lg"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 