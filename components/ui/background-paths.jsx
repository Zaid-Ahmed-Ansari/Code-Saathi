"use client";

import { memo, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Dancing_Script } from "next/font/google";
import TypewriterTitle from "./type-writer";
import { Button } from "./button";
import Link from "next/link";
import { ArrowRight } from 'lucide-react';
const dancing_script = Dancing_Script({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-dancing_script",
});

// Path generation function
function generateAestheticPath(index, position, type) {
    const baseAmplitude =
        type === "primary" ? 150 : type === "secondary" ? 100 : 60;
    const phase = index * 0.2;
    const points = [];
    const segments = type === "primary" ? 10 : type === "secondary" ? 8 : 6;

    const startX = 2400;
    const startY = 800;
    const endX = -2400;
    const endY = -800 + index * 25;
    

    for (let i = 0; i <= segments; i++) {
        const progress = i / segments;
        const eased = 1 - (1 - progress) ** 2;

        const baseX = startX + (endX - startX) * eased;
        const baseY = startY + (endY - startY) * eased;

        const amplitudeFactor = 1 - eased * 0.3;
        const wave1 =
            Math.sin(progress * Math.PI * 3 + phase) *
            (baseAmplitude * 0.7 * amplitudeFactor);
        const wave2 =
            Math.cos(progress * Math.PI * 4 + phase) *
            (baseAmplitude * 0.3 * amplitudeFactor);
        const wave3 =
            Math.sin(progress * Math.PI * 2 + phase) *
            (baseAmplitude * 0.2 * amplitudeFactor);

        points.push({
            x: baseX * position,
            y: baseY + wave1 + wave2 + wave3,
        });
    }

    const pathCommands = points.map((point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prevPoint = points[i - 1];
        const tension = 0.4;
        const cp1x = prevPoint.x + (point.x - prevPoint.x) * tension;
        const cp1y = prevPoint.y;
        const cp2x = prevPoint.x + (point.x - prevPoint.x) * (1 - tension);
        const cp2y = point.y;
        return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    });

    return pathCommands.join(" ");
}

const generateUniqueId = prefix => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

// Memoized FloatingPaths component
const FloatingPaths = memo(function FloatingPaths({
    position,
    title1,
    title2
}) {
    // Increased number of paths while maintaining optimization
    const primaryPaths = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: generateUniqueId("primary"),
            d: generateAestheticPath(i, position, "primary"),
            opacity: 0.15 + i * 0.02,
            width: 4 + i * 0.3,
            duration: 25,
            delay: 0,
        })), [position]);

    const secondaryPaths = useMemo(() =>
        Array.from({ length: 15 }, (_, i) => ({
            id: generateUniqueId("secondary"),
            d: generateAestheticPath(i, position, "secondary"),
            opacity: 0.12 + i * 0.015,
            width: 3 + i * 0.25,
            duration: 20,
            delay: 0,
        })), [position]);

    const accentPaths = useMemo(() =>
        Array.from({ length: 10 }, (_, i) => ({
            id: generateUniqueId("accent"),
            d: generateAestheticPath(i, position, "accent"),
            opacity: 0.08 + i * 0.12,
            width: 2 + i * 0.2,
            duration: 15,
            delay: 0,
        })), [position]);

    // Shared animation configuration
    const sharedAnimationProps = {
        opacity: 1,
        scale: 1,
        transition: {
            opacity: { duration: 1 },
            scale: { duration: 1 },
        },
    };
    
    return (
        (<div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full text-slate-950/40 dark:text-white/40"
                viewBox="-2400 -800 4800 1600"
                fill="none"
                preserveAspectRatio="xMidYMid slice">
               
                <defs>
                    <linearGradient id="sharedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(147, 51, 234, 0.5)" />
                        <stop offset="50%" stopColor="rgba(236, 72, 153, 0.5)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
                    </linearGradient>
                </defs>

                <g className="primary-waves">
                    {primaryPaths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="url(#sharedGradient)"
                            strokeWidth={path.width}
                            strokeLinecap="round"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -15, 0],
                            }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 8,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                            style={{ opacity: path.opacity }} />
                    ))}
                </g>

                <g className="secondary-waves" style={{ opacity: 0.8 }}>
                    {secondaryPaths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="url(#sharedGradient)"
                            strokeWidth={path.width}
                            strokeLinecap="round"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -10, 0],
                            }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 6,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                            style={{ opacity: path.opacity }} />
                    ))}
                </g>

                <g className="accent-waves" style={{ opacity: 0.6 }}>
                    {accentPaths.map((path) => (
                        <motion.path
                            key={path.id}
                            d={path.d}
                            stroke="url(#sharedGradient)"
                            strokeWidth={path.width}
                            strokeLinecap="round"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                ...sharedAnimationProps,
                                y: [0, -5, 0],
                            }}
                            transition={{
                                ...sharedAnimationProps.transition,
                                y: {
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: "easeInOut",
                                    repeatType: "reverse",
                                },
                            }}
                            style={{ opacity: path.opacity }} />
                    ))}
                </g>
            </svg>
        </div>)
    );
});

// Memoized AnimatedTitle component
const AnimatedTitle = memo(function AnimatedTitle({
    
    
}) {const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
            delay: 0.5 + i * 0.2,
            ease: [0.25, 0.4, 0.25, 1],
        },
    }),
};
    return (
        ( <div className="max-w-3xl mx-auto text-center">
            <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                <h1
                    className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                    <span
                        className="bg-clip-text text-transparent bg-linear-to-b from-black to-black/80 dark:from-white dark:to-white/80">
                        Boost your
                    </span>
                    <br />
                    <span
                        className={cn(
                            "bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-black/90 to-rose-300 dark:from-rose-300 dark:via-white/90 dark:to-rose-300",
                            dancing_script.className
                        )}>
                        Coding Skills
                    </span>
                </h1>
            </motion.div>
            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                <div
                    className="text-base sm:text-lg md:text-xl text-black/40 dark:text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                    <TypewriterTitle />
                </div>
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
        </div>)
    );
});

export default memo(function BackgroundPaths({
    title1
    
}) {
    return (
        (<div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
            </div>
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto">
                    <AnimatedTitle title={title1} />
                </motion.div>
            </div>
        </div>)
    );
});
