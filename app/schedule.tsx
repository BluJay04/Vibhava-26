'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface EventData {
  _id: string;
  title: string;
  venue: string;
  time: string;
  date: { day: string; month: string; year: string };
  status: string;
  club: string;
  summary: string;
  image?: any;
}

// Titles of events featured in the Highlights/Spotlight section
const HIGHLIGHT_TITLES = ['Crowd Work Show by Mahadevan'];

export default function Schedule({ excludeHighlights = false }: { excludeHighlights?: boolean }) {

  // State for events and loading
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [selectedVenue, setSelectedVenue] = useState('All');
  const [selectedClub, setSelectedClub] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  // State for carousel/pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Default to desktop
  const [direction, setDirection] = useState(0);

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = excludeHighlights
          ? `*[_type == "event" && !(title in ["Crowd Work Show by Mahadevan"])]`
          : `*[_type == "event"]`;
        const data = await client.fetch(query);

        // Custom Sort: Date (Day, Month, Year) -> Time
        const sortedData = data.sort((a: EventData, b: EventData) => {
          // 1. Sort by Date
          const getDateValue = (d: { day: string; month: string; year: string }) => {
            if (!d || !d.day || !d.month || !d.year) return 0;
            const ts = Date.parse(`${d.month} ${d.day} ${d.year}`);
            return isNaN(ts) ? 0 : ts;
          };

          const dateA = getDateValue(a.date);
          const dateB = getDateValue(b.date);

          if (dateA !== dateB) {
            return dateA - dateB;
          }

          // 2. Sort by Start Time (format: "H:MM-H:MM" e.g. "2:00-3:00")
          const getTimeValue = (timeStr: string): number => {
            if (!timeStr) return 0;
            // Take the start time (before the dash)
            const startTime = timeStr.split('-')[0].trim();
            const match = startTime.match(/(\d+):(\d+)/);
            if (!match) return 0;
            return parseInt(match[1]) * 60 + parseInt(match[2]);
          };

          return getTimeValue(a.time) - getTimeValue(b.time);
        });

        setEvents(sortedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [excludeHighlights]);

  // Handle Responsive Items Per Page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(6);
      }
    };

    // Initial check
    handleResize();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const debouncedResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, []);


  // Derived Data
  const clubOptions = useMemo(() => {
    const clubs = new Set(events.map(e => e.club || 'None'));
    return ['All', ...Array.from(clubs).sort()];
  }, [events]);

  const venueOptions = useMemo(() => {
    const venues = new Set(events.map(e => e.venue).filter(Boolean));
    return ['All', ...Array.from(venues).sort()];
  }, [events]);

  const dateOptions = useMemo(() => {
    const dates = new Set(events.map(e => e.date?.day).filter(Boolean));
    return ['All', ...Array.from(dates).sort((a, b) => Number(a) - Number(b))];
  }, [events]);

  const filteredEvents = useMemo(() => {
    const filtered = events.filter(event => {
      const matchesVenue = selectedVenue === 'All' || event.venue === selectedVenue;
      const eventClub = event.club || 'None';
      const matchesClub = selectedClub === 'All' || eventClub === selectedClub;
      const matchesDate = selectedDate === 'All' || String(event.date?.day) === selectedDate;
      return matchesVenue && matchesClub && matchesDate;
    });
    return filtered;
  }, [events, selectedVenue, selectedClub, selectedDate]);


  // Pagination Logic
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedVenue, selectedClub, selectedDate, itemsPerPage]);

  const currentEvents = filteredEvents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
    }
  };

  const setPage = (pageIndex: number) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  // Drag constraints
  const dragConstraintsRef = useRef(null);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextPage();
    } else if (info.offset.x > threshold) {
      prevPage();
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <motion.section
      className="w-full py-20 bg-black text-white overflow-hidden relative select-none"
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 2xl:px-12">

        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-6 mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold uppercase text-white font-clash tracking-tight text-center md:text-left w-full md:w-auto">
            Event Schedule
          </h2>

          <div className="flex gap-4 w-full md:w-auto">
            {/* Date Filter */}
            <div className="relative w-full md:w-40">
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm appearance-none focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                {dateOptions.map((date) => (
                  <option key={date} value={date} className="bg-black text-white">
                    {date === 'All' ? 'All Dates' : `Feb ${date}`}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Club Filter */}
            <div className="relative w-full md:w-40">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm appearance-none focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                {clubOptions.map((club) => (
                  <option key={club} value={club} className="bg-black text-white">
                    {club}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Venue Filter - Hidden */}
            <div className="relative w-full md:w-40 hidden">
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white text-sm appearance-none focus:outline-none focus:border-emerald-400 transition-colors cursor-pointer"
              >
                {venueOptions.map((venue) => (
                  <option key={venue} value={venue} className="bg-black text-white">
                    {venue}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Carousel Content */}
        <div
          className="relative min-h-[500px] overflow-hidden"
          ref={dragConstraintsRef}
        >
          {loading ? (
            <div className="flex justify-center items-center h-[500px] w-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            <AnimatePresence initial={false} custom={direction} mode='popLayout'>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 30 },
                  opacity: { duration: 0.1 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1} // Allow full movement
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing"
              >
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentEvents.map((event) => (
                    <div
                      key={event._id}
                      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden group hover:border-emerald-400/50 transition-colors duration-300 flex flex-col"
                    >
                      {/* Image Section */}
                      <div className="aspect-[4/5] w-full relative overflow-hidden bg-white/5">
                        {event.image ? (
                          <Image
                            src={urlFor(event.image).width(600).quality(75).url()}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            loading="lazy"
                            draggable={false}
                            className="object-cover select-none"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-600 font-clash uppercase tracking-widest text-xs">
                            No Image
                          </div>
                        )}

                        {/* Overlay Status Badge */}
                        {event.status === 'Rest' && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm">
                            <span className="px-4 py-2 border border-gray-500 text-gray-300 uppercase tracking-widest font-bold">Break</span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-4 md:p-6 flex flex-col justify-between flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold font-clash text-white mb-4 line-clamp-2 min-h-[3.5rem]">
                          {event.title}
                        </h3>

                        <Link href={`/event/${event._id}`} className="w-full">
                          <button
                            disabled={event.status === 'Rest'}
                            className={`w-full py-3 md:py-4 font-clash font-bold text-sm uppercase tracking-wide rounded-sm transition-all duration-300 ${event.status === 'Rest'
                              ? 'bg-transparent border border-gray-700 text-gray-600 cursor-not-allowed'
                              : 'bg-white text-black hover:bg-emerald-400 hover:text-white'
                              }`}
                          >
                            View Event
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col justify-center items-center h-[300px] text-gray-500">
              <p className="text-xl mb-4">No events found.</p>
              <button
                onClick={() => { setSelectedVenue('All'); setSelectedClub('All'); setSelectedDate('All Clubs'); }}
                className="text-emerald-400 hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-3">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${currentPage === idx
                  ? 'w-8 bg-emerald-400'
                  : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </motion.section>
  );
}
