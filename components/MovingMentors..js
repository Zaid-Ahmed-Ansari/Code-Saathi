"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Button } from "./ui/button";
import Link from "next/link";
import ShimmerText from "./ui/shimmer-text";
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function MovingMentors() {
  return (
    <div
      className="h-[40rem] rounded-md flex flex-col antialiased bg-neutral-950 dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <ShimmerText/>
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      <Button
        variant="outline"
        className="group mt-10 border-rose-300 text-rose-200 hover:bg-rose-100/10 hover:text-rose-400 transition-all px-6 py-3 rounded-xl text-base font-semibold inline-flex items-center gap-2"
        asChild
      >
        <Link href="/mentors">
          Choose your Mentor from their description.
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
  );
}

const testimonials = [
  {
    quote:
      "Full-stack developer specializing in MERN stack with experience at top tech companies.",
    name: "Casey Smith",
    title: "₹1500/hour",
  },
  {
    quote:
      "AI/ML engineer and Python expert with extensive experience in data science.",
    name: "William Johnson",
    title: "₹2000/hour",
  },
  {
    quote: "Backend specialist with expertise in enterprise Java applications and cloud architecture.",
    name: "Emily Davis",
    title: "₹1800/hour",
  },
  {
    quote:
      "Frontend developer with a passion for creating intuitive user interfaces.",
    name: "Michael Brown",
    title: "₹1600/hour",
  },
  {
    quote:
      "DevOps engineer with expertise in containerization and cloud infrastructure.",
    name: "Olivia Wilson",
    title: "₹1700/hour",
  },
  {
    quote:
      "Mobile app developer with 50+ published apps on Play Store and App Store.",
    name: "David Lee",
    title: "₹1200/hour",
  },
  {
    quote:
      "Cybersecurity expert with a focus on ethical hacking and penetration testing.",
    name: "Neha Verma",
    title: "₹2100/hour",
  },
  {
    quote:
      "Cloud architect with deep knowledge of AWS, Azure, and Google Cloud.",
    name: "Vikram Desai",
    title: "₹2200/hour",
  },
  {
    quote:
      "Data scientist passionate about big data analytics and visualization.",
    name: "Sonal Mehta",
    title: "₹1900/hour",
  },
  {
    quote:
      "Blockchain developer building decentralized applications and smart contracts.",
    name: "Rohit Agarwal",
    title: "₹2500/hour",
  },
];
