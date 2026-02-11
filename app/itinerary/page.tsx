'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { client } from '@/sanity/lib/client';
// Navbar removed
import Footer from '../footer';

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

export default function ItineraryPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const router = useRouter();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  // Drag-to-scroll state
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date.day asc, time asc)`;
        const data = await client.fetch(query, {}, { cache: 'no-store' });
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Derive VENUES and DATES dynamically from fetched events
  const VENUES = useMemo(() => {
    const venues = new Set(events.map(e => e.venue).filter(Boolean));
    return Array.from(venues).sort();
  }, [events]);

  const DATES = useMemo(() => {
    const dates = new Set(events.map(e => e.date?.day).filter(Boolean));
    return Array.from(dates).sort((a, b) => Number(a) - Number(b));
  }, [events]);

  // Auto-select the first available date once events are loaded
  const hasAutoSelected = useRef(false);
  useEffect(() => {
    if (DATES.length > 0 && !hasAutoSelected.current) {
      setSelectedDate(DATES[0]);
      hasAutoSelected.current = true;
    }
  }, [DATES]);

  // Filter events by date
  const eventsForDay = useMemo(() => {
    return events.filter(event => String(event.date?.day) === selectedDate);
  }, [selectedDate, events]);

  // Extract unique times for rows using string processing
  const timeSlots = useMemo(() => {
    const times = new Set(eventsForDay.map(e => e.time));
    return Array.from(times).sort((a, b) => a.localeCompare(b));
  }, [eventsForDay]);

  // Helper to find event for a specific time and venue
  const getEvent = (venue: string, time: string) => {
    return eventsForDay.find(e => e.venue === venue && e.time === time);
  };

  const downloadCSV = () => {
    const headers = ['ID', 'Title', 'Venue', 'Time', 'Date', 'Month', 'Year', 'Club', 'Summary'];
    const csvContent = [
      headers.join(','),
      ...events.map(event => [
        event._id,
        `"${event.title.replace(/"/g, '""')}"`,
        `"${event.venue}"`,
        `"${event.time}"`,
        event.date?.day,
        event.date?.month,
        event.date?.year,
        `"${event.club}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-black min-h-screen text-white font-sans selection:bg-emerald-500/30 relative"
    >
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white/80 hover:text-emerald-400 transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-clash font-medium text-lg tracking-wide">Back</span>
        </button>
      </div>

      <div className="pt-32 pb-20 px-6 md:px-12 2xl:px-24 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/20 pb-6 gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl 2xl:text-8xl font-bold font-clash uppercase tracking-tight mb-2">Itinerary</h1>
            <p className="text-gray-400 max-w-xl 2xl:text-lg">
              Explore the complete event schedule across all venues.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Date Toggles */}
            <div className="flex bg-white/5 p-1 rounded-md">
              {DATES.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-all ${selectedDate === date
                    ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  Feb {date}
                </button>
              ))}
            </div>

            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold uppercase text-sm rounded-sm hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download CSV
            </button>
          </div>
        </div>

        {/* Schedule Grid — compact & draggable */}
        <div
          className="overflow-x-auto pb-8 cursor-grab active:cursor-grabbing select-none"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div style={{ minWidth: `${160 + VENUES.length * 200}px` }}>
            {/* Grid Header */}
            <div
              className="grid gap-3 mb-4 border-b border-white/10 pb-3"
              style={{ gridTemplateColumns: `150px repeat(${VENUES.length}, 1fr)` }}
            >
              <div className="text-emerald-400 font-bold uppercase tracking-widest text-xs py-1">Time</div>
              {VENUES.map(venue => (
                <div key={venue} className="text-center">
                  <span className="inline-block px-3 py-0.5 rounded-xs bg-white/5 border border-white/10 text-gray-300 text-xs font-medium uppercase tracking-wider whitespace-nowrap">
                    {venue}
                  </span>
                </div>
              ))}
            </div>

            {/* Grid Body */}
            <div className="space-y-2">
              {timeSlots.map((time, index) => (
                <motion.div
                  key={time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="grid gap-3 py-2 border-b border-white/5 hover:bg-white/[0.02] transition-colors rounded-md group"
                  style={{ gridTemplateColumns: `150px repeat(${VENUES.length}, 1fr)` }}
                >
                  {/* Time Column */}
                  <div className="flex items-center">
                    <div className="pl-2 border-l-2 border-emerald-500/50">
                      <span className="text-base font-bold font-clash text-white">{time.split(' - ')[0]}</span>
                      <span className="block text-[10px] text-gray-500 font-mono mt-0.5">{time.split(' - ')[1]}</span>
                    </div>
                  </div>

                  {/* Venue Columns */}
                  {VENUES.map(venue => {
                    const event = getEvent(venue, time);
                    return (
                      <div key={venue} className="flex flex-col justify-center min-h-[70px] p-1">
                        {event ? (
                          <div className={`
                            h-full w-full p-3 rounded-md border transition-all duration-300
                            flex flex-col justify-between gap-2
                            ${event.status === 'Rest'
                              ? 'bg-white/5 border-white/10 opacity-70 border-dashed'
                              : 'bg-zinc-900/50 border-white/10 hover:border-emerald-500/50 hover:bg-zinc-800'
                            }
                          `}>
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                {event.club && event.club !== 'None' && (
                                  <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${event.club === 'General' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
                                    }`}>
                                    {event.club}
                                  </span>
                                )}
                                {event.status === 'Rest' && (
                                  <span className="text-[10px] text-gray-500 font-mono uppercase">Break</span>
                                )}
                              </div>
                              <h3 className="font-bold text-sm text-white leading-tight mb-0.5">{event.title}</h3>
                              {event.summary && (
                                <p className="text-[10px] text-gray-400 line-clamp-2 leading-relaxed">{event.summary}</p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-full w-full rounded-md border border-white/5 bg-transparent opacity-20 flex items-center justify-center">
                            {/* Empty State */}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}

              {timeSlots.length === 0 && (
                <div className="py-16 text-center text-gray-500 text-sm">
                  No events found for this day.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.main>
  );
}
