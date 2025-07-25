"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Send,
  Loader2,
  ExternalLink,
} from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import Fuse from "fuse.js";
import { useRef } from "react";

function highlightMatch(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <span key={i} className="bg-rose-300/30 rounded px-1">{part}</span> : part
  );
}

function ActionSearchBar({
  actions,
  placeholder,
  onQueryChange,
  defaultOpen = false,
  onSearch,
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [isFocused, setIsFocused] = useState(defaultOpen);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 300);
  const containerRef = useRef(null);

  // Fuzzy search with fuse.js
  const performSearch = useCallback(
    (searchQuery) => {
      if (!searchQuery.trim()) {
        setResult({ actions: actions });
        return;
      }
      setResult({ actions: [], isLoading: true });
      let searchResults = [];
      if (onSearch) {
        searchResults = onSearch(searchQuery);
      } else {
        const fuse = new Fuse(actions, {
          keys: ["label", "description", "keywords"],
          threshold: 0.4,
        });
        searchResults = fuse.search(searchQuery).map(res => res.item);
      }
      setResult({ actions: searchResults, isLoading: false });
    },
    [actions, onSearch]
  );

  useEffect(() => {
    if (!isFocused) {
      setResult(null);
      setSelectedIndex(-1);
      return;
    }
    performSearch(debouncedQuery);
    if (onQueryChange) onQueryChange(debouncedQuery);
  }, [debouncedQuery, isFocused, performSearch, onQueryChange]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    if (isFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
    if (onQueryChange) onQueryChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (!result?.actions.length) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < result.actions.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : result.actions.length - 1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          executeAction(result.actions[selectedIndex]);
        } else if (result.actions.length > 0) {
          executeAction(result.actions[0]);
        }
        break;
      case "Escape":
        setIsFocused(false);
        setQuery("");
        break;
    }
  };

  const executeAction = async (action) => {
    try {
      if (action.action) {
        await action.action();
      } else if (action.url) {
        window.open(action.url, "_blank");
      }
      setIsFocused(false);
      setQuery("");
    } catch (error) {
      console.error("Action execution error:", error);
    }
  };

  const container = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.4 },
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!result) {
      setResult({ actions: actions });
    }
  };

  let visibleActions = result?.actions || [];
  const isQuerying = query.length > 0;
  if (!isQuerying && visibleActions.length > 5) {
    visibleActions = visibleActions.slice(0, 5);
  }

  return (
    <div className="w-full mb-10 max-w-xl mx-auto" ref={containerRef}>
      <div className="relative flex flex-col justify-start items-center min-h-[60px]">
        <div className="w-full max-w-sm sticky top-0 bg-background z-10 pt-4 pb-1">
          
          <div className="relative">
            <Input
              type="text"
              placeholder={placeholder || "Search..."}
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              className="pl-3 pr-9 py-1.5 h-9 text-sm rounded-lg focus-visible:ring-offset-0"
              autoComplete="off"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4">
              <AnimatePresence mode="popLayout">
                {result?.isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Loader2 className="w-4 h-4 text-gray-400 dark:text-gray-500 animate-spin" />
                  </motion.div>
                ) : query.length > 0 ? (
                  <motion.div
                    key="send"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="search"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionSearchBar;
