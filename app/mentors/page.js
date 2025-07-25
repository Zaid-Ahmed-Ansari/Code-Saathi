'use client';

import React, { useState, useMemo, useRef } from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ActionSearchBar from '@/components/ui/search-bar';

const SORT_FIELDS = [
  { value: 'name', label: 'Name' },
  { value: 'experience', label: 'Experience' },
  { value: 'rating', label: 'Rating' },
  { value: 'sessions', label: 'Sessions' },
  { value: 'price', label: 'Price' },
];
const SORT_DIRECTIONS = [
  { value: 'asc', label: 'Asc' },
  { value: 'desc', label: 'Desc' },
];

function parseExperience(exp) {
  const match = exp.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
function parsePrice(price) {
  const match = price.replace(/[^\d]/g, '');
  return match ? parseInt(match, 10) : 0;
}

function getSortValue(mentor, field) {
  switch (field) {
    case 'name': return mentor.name;
    case 'experience': return parseExperience(mentor.experience);
    case 'rating': return mentor.rating;
    case 'sessions': return mentor.sessions;
    case 'price': return parsePrice(mentor.price);
    default: return '';
  }
}

export default function MentorsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [primarySort, setPrimarySort] = useState({ field: 'name', dir: 'asc' });
  const [secondarySort, setSecondarySort] = useState({ field: 'rating', dir: 'desc' });
  const gridRef = useRef(null);
  const mentors = [
    {
      name: "Casey Smith",
      expertise: ['React', 'Node.js', 'MongoDB'],
      experience: '5+ years',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Full-stack developer specializing in MERN stack with experience at top tech companies.',
      sessions: 120,
      price: '₹1500/hour'
    },
    {
      name: "William Johnson",
      expertise: ['Python', 'Django', 'AI/ML'],
      experience: '7+ years',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'AI/ML engineer and Python expert with extensive experience in data science.',
      sessions: 200,
      price: '₹2000/hour'
    },
    {
      name: "Emily Davis",
      expertise: ['Java', 'Spring Boot', 'AWS'],
      experience: '6+ years',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      bio: 'Backend specialist with expertise in enterprise Java applications and cloud architecture.',
      sessions: 150,
      price: '₹1800/hour'
    },
    {
      name: "Michael Brown",
      expertise: ['Flutter', 'React Native', 'Mobile Dev'],
      experience: '4+ years',
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/men/41.jpg',
      bio: 'Mobile app developer with 50+ published apps on Play Store and App Store.',
      sessions: 80,
      price: '₹1200/hour'
    },
    {
      name: "Olivia Wilson",
      expertise: ['Security', 'Ethical Hacking', 'DevSecOps'],
      experience: '8+ years',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'Cybersecurity expert with a focus on ethical hacking and penetration testing.',
      sessions: 180,
      price: '₹2100/hour'
    },
    {
      name: "David Lee",
      expertise: ['AWS', 'Azure', 'GCP'],
      experience: '6+ years',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/53.jpg',
      bio: 'Cloud architect with deep knowledge of AWS, Azure, and Google Cloud.',
      sessions: 160,
      price: '₹2200/hour'
    },
    {
      name: "Ava Davis",
      expertise: ['Data Science', 'Big Data', 'Visualization'],
      experience: '5+ years',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
      bio: 'Data scientist passionate about big data analytics and visualization.',
      sessions: 140,
      price: '₹1900/hour'
    },
    {
      name: "Mason Anderson",
      expertise: ['Blockchain', 'Solidity', 'Web3'],
      experience: '6+ years',
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      bio: 'Blockchain developer building decentralized applications and smart contracts.',
      sessions: 110,
      price: '₹2500/hour'
    },
    // Added from MovingMentors
    {
      name: "Ching Lu",
      expertise: ['Security', 'Ethical Hacking', 'Penetration Testing'],
      experience: '8+ years',
      rating: 4.9,
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      bio: 'Cybersecurity expert with a focus on ethical hacking and penetration testing.',
      sessions: 170,
      price: '₹2100/hour'
    },
    {
      name: "Stabler Elliot",
      expertise: ['AWS', 'Azure', 'Google Cloud'],
      experience: '6+ years',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/men/22.jpg',
      bio: 'Cloud architect with deep knowledge of AWS, Azure, and Google Cloud.',
      sessions: 150,
      price: '₹2200/hour'
    },
    {
      name: "Ava Lee",
      expertise: ['Data Science', 'Big Data', 'Visualization'],
      experience: '5+ years',
      rating: 4.8,
      image: 'https://randomuser.me/api/portraits/women/23.jpg',
      bio: 'Data scientist passionate about big data analytics and visualization.',
      sessions: 130,
      price: '₹1900/hour'
    },
    {
      name: "Cragen K",
      expertise: ['Blockchain', 'Solidity', 'Web3'],
      experience: '6+ years',
      rating: 4.7,
      image: 'https://randomuser.me/api/portraits/men/24.jpg',
      bio: 'Blockchain developer building decentralized applications and smart contracts.',
      sessions: 100,
      price: '₹2500/hour'
    }
  ];

  const actions = mentors.map((mentor, idx) => ({
    id: String(idx),
    label: mentor.name,
    description: mentor.expertise.join(', '),
    keywords: mentor.expertise,
  }));

  const filteredMentors = useMemo(() => {
    if (!search) return mentors;
    const q = search.toLowerCase();
    return mentors.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.expertise.some(skill => skill.toLowerCase().includes(q))
    );
  }, [search, mentors]);

  // Multi-sorting logic
  const sortedMentors = useMemo(() => {
    const arr = [...filteredMentors];
    arr.sort((a, b) => {
      // Primary sort
      let aVal = getSortValue(a, primarySort.field);
      let bVal = getSortValue(b, primarySort.field);
      let cmp = 0;
      if (typeof aVal === 'string') cmp = aVal.localeCompare(bVal);
      else cmp = aVal - bVal;
      if (primarySort.dir === 'desc') cmp = -cmp;
      if (cmp !== 0) return cmp;
      // Secondary sort
      aVal = getSortValue(a, secondarySort.field);
      bVal = getSortValue(b, secondarySort.field);
      if (typeof aVal === 'string') cmp = aVal.localeCompare(bVal);
      else cmp = aVal - bVal;
      if (secondarySort.dir === 'desc') cmp = -cmp;
      return cmp;
    });
    return arr;
  }, [filteredMentors, primarySort, secondarySort]);

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedMentors.length / itemsPerPage);
  const paginatedMentors = sortedMentors.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen py-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 justify-between w-full">
          <ActionSearchBar
            actions={actions}
            onQueryChange={setSearch}
            placeholder="Search mentors by name or skill..."
          />
            <div className="flex items-center gap-2">
              <label htmlFor="primary-sort" className="text-sm font-medium">Primary sort:</label>
              <select
                id="primary-sort"
                value={primarySort.field}
                onChange={e => { setPrimarySort({ ...primarySort, field: e.target.value }); setPage(1); }}
                className="rounded-lg border bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2"
              >
                {SORT_FIELDS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={primarySort.dir}
                onChange={e => { setPrimarySort({ ...primarySort, dir: e.target.value }); setPage(1); }}
                className="rounded-lg border bg-neutral-950 px-2 py-2 focus:outline-none focus:ring-2"
              >
                {SORT_DIRECTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="secondary-sort" className="text-sm font-medium">Secondary sort:</label>
              <select
                id="secondary-sort"
                value={secondarySort.field}
                onChange={e => { setSecondarySort({ ...secondarySort, field: e.target.value }); setPage(1); }}
                className="rounded-lg border bg-neutral-950 px-3 py-2 focus:outline-none focus:ring-2"
              >
                {SORT_FIELDS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <select
                value={secondarySort.dir}
                onChange={e => { setSecondarySort({ ...secondarySort, dir: e.target.value }); setPage(1); }}
                className="rounded-lg border bg-neutral-950 px-2 py-2 focus:outline-none focus:ring-2"
              >
                {SORT_DIRECTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <motion.div
          ref={gridRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rose-300 via-white to-rose-300 bg-clip-text text-transparent">
            Expert Mentors
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn from industry professionals with years of experience in top tech companies.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedMentors.map((mentor, idx) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <div className="text-center mb-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-rose-300"
                />
                <h3 className="text-xl font-semibold text-white mb-2">{mentor.name}</h3>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-yellow-400 ml-1">{mentor.rating}</span>
                  <span className="text-gray-400 ml-2">({mentor.sessions} sessions)</span>
                </div>
                <p className="text-rose-300 font-semibold">{mentor.price}</p>
              </div>
              <p className="text-gray-300 text-sm mb-4">{mentor.bio}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-rose-300/30 text-rose-200 px-3 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="group w-full border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all py-2 rounded-xl font-semibold inline-flex items-center justify-center gap-2"
              >
                Book Session
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <ArrowRight className="ml-1 w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
                </motion.span>
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