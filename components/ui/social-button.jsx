"use client";



import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Twitter, Instagram, Linkedin, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SocialButton({
    className,
    ...props
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const shareButtons = [
        
        {
            icon: Instagram,
            label: "Instagram",
            onClick: () => {
                window.open('https://www.instagram.com/codesaathi/', '_blank', 'noopener,noreferrer');
            }
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            onClick: () => {
               
                window.open(`https://www.linkedin.com/company/code-saathi/`, '_blank', 'noopener,noreferrer');
            }
        },
        {
            icon: LinkIcon,
            label: copied ? "Copied!" : "Copy link",
            onClick: () => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                toast.success('Link copied!');
                setTimeout(() => setCopied(false), 1200);
            }
        },
    ];

    const handleShare = (index) => {
        setActiveIndex(index);
        shareButtons[index].onClick();
        setTimeout(() => setActiveIndex(null), 300);
    };

    return (
        (<div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}>
            <motion.div
                animate={{
                    opacity: isVisible ? 0 : 1,
                }}
                transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                }}>
                {/* Example: If you want to use Next.js Link for an internal page, use asChild and pass Link as a child. */}
                <Button
                    className={cn(
                        "min-w-40 relative",
                        "bg-white dark:bg-black",
                        "hover:bg-gray-50 dark:hover:bg-gray-950",
                        "text-black dark:text-white",
                        "border border-black/10 dark:border-white/10",
                        "transition-colors duration-200",
                        className
                    )}
                    {...props}>
                    <span className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        Hover
                    </span>
                </Button>
            </motion.div>
            <motion.div
                className="absolute top-0 left-0 flex h-10 overflow-hidden"
                animate={{
                    width: isVisible ? "auto" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.23, 1, 0.32, 1],
                }}>
                {shareButtons.map((button, i) => (
                    <motion.button
                        type="button"
                        key={`share-${button.label}`}
                        aria-label={button.label}
                        onClick={() => handleShare(i)}
                        className={cn(
                            "h-10",
                            "w-10",
                            "flex items-center justify-center",
                            "bg-black dark:bg-neutral-950",
                            "text-white dark:text-white",
                            i === 0 && "rounded-l-md",
                            i === 2 && "rounded-r-md",
                            "border-r border-white/10 dark:border-black/10 last:border-r-0",
                            "hover:bg-gray-900 dark:hover:bg-neutral-850",
                            "outline-none",
                            "relative overflow-hidden",
                            "transition-colors duration-200"
                        )}
                        animate={{
                            opacity: isVisible ? 1 : 0,
                            x: isVisible ? 0 : -20,
                        }}
                        transition={{
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                            delay: isVisible ? i * 0.05 : 0,
                        }}>
                        <motion.div
                            className="relative z-10"
                            animate={{
                                scale: activeIndex === i ? 0.85 : 1,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}>
                            <button.icon className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                            className="absolute inset-0 bg-white dark:bg-black"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: activeIndex === i ? 0.15 : 0,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }} />
                    </motion.button>
                ))}
            </motion.div>
        </div>)
    );
}
