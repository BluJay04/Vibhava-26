'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { events } from './data/events';

const VENUES = ['All', 'Seminar Hall', 'SDPK', 'Placement Auditorium'];
const CLUBS = ['All', 'Club 1', 'Club 2', 'Club 3', 'Club 4', 'Club 5'];
const DATES = ['All', '14', '15'];

export default function Schedule() {
  const sectionRef = useRef(null);

  const [selectedVenue, setSelectedVenue] = useState('All');
  const [selectedClub, setSelectedClub] = useState('All');
  const [selectedDate, setSelectedDate] = useState('All');

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Show only events conducted by clubs (exclude 'General')
      if (event.club === 'General') return false;

      const matchesVenue = selectedVenue === 'All' || event.venue === selectedVenue;
      const matchesClub = selectedClub === 'All' || event.club === selectedClub;
      const matchesDate = selectedDate === 'All' || event.date.day === selectedDate;
      return matchesVenue && matchesClub && matchesDate;
    });
  }, [selectedVenue, selectedClub, selectedDate]);

  return (
    <motion.section
      ref={sectionRef}
      className="w-full py-20 bg-black text-white overflow-hidden relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 md:px-12">

        {/* Header & Filters */}
        <div className="flex flex-col gap-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/20 pb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-gray-400 text-sm uppercase font-sans mb-2 tracking-widest">
                Booking Calendar
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold uppercase text-white font-clash tracking-tight">
                Event Schedule
              </h2>
            </div>

            <Link href="/iternary" className="translate-y-1">
              <motion.button
                className="group relative inline-flex items-center justify-center overflow-hidden bg-white text-black px-6 py-2.5 font-bold rounded-sm transition-all duration-300 hover:bg-emerald-400 hover:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm tracking-wide uppercase font-clash relative z-10">View Full Schedule</span>
              </motion.button>
            </Link>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col gap-6">

            {/* Venue Filter - Prominent for Mobile */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Filter by Venue</span>
              {/* Mobile: Horizontal Scroll, Desktop: Wrap */}
              <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 md:pb-0 scrollbar-hide">
                {VENUES.map((venue) => (
                  <button
                    key={venue}
                    onClick={() => setSelectedVenue(venue)}
                    className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all duration-300 border flex-shrink-0 ${selectedVenue === venue
                      ? 'bg-white text-black border-white'
                      : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                      }`}
                  >
                    {venue}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Filter by Date</span>
                <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 md:pb-0 scrollbar-hide">
                  {DATES.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all duration-300 border flex-shrink-0 ${selectedDate === date
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                        }`}
                    >
                      {date === 'All' ? 'All Dates' : `Feb ${date}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Club Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Filter by Club</span>
                <div className="flex overflow-x-auto md:flex-wrap gap-2 pb-2 md:pb-0 scrollbar-hide">
                  {CLUBS.map((club) => (
                    <button
                      key={club}
                      onClick={() => setSelectedClub(club)}
                      className={`px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap transition-all duration-300 border flex-shrink-0 ${selectedClub === club
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-200'
                        }`}
                    >
                      {club}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="flex flex-col min-h-[400px]">
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div
                key={selectedVenue + selectedClub + selectedDate} // Re-render list on filter change for smooth transition
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {filteredEvents.map((event, index) => (
                  <div // Changed from motion.div with layout to standard div or simple motion.div
                    key={event.id}
                    className="group flex flex-col md:flex-row items-start md:items-center justify-between py-8 border-b border-white/10 hover:bg-white/5 transition-colors duration-300 rounded-lg px-4 -mx-4"
                  >
                    {/* Date */}
                    <div className="flex items-start gap-4 w-full md:w-1/4 mb-4 md:mb-0">
                      <span className="text-5xl font-bold text-white font-clash group-hover:text-emerald-400 transition-colors duration-300">{event.date.day}</span>
                      <div className="flex flex-col text-sm text-gray-400 font-medium pt-2 uppercase tracking-wide">
                        <span>{event.date.month}</span>
                        <span>{event.date.year}</span>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex flex-col w-full md:w-1/2 mb-6 md:mb-0">
                      <h3 className="text-2xl font-bold text-white mb-3 font-clash tracking-wide group-hover:text-emerald-400 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.venue}
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full md:w-auto flex justify-start md:justify-end">
                      <Link href={`/event/${event.id}`}>
                        <button className={`px-8 py-3 rounded-sm font-clash font-bold text-sm tracking-wide transition-all duration-300 ${event.status === 'Rest' || event.status === 'Sold Out'
                          ? 'bg-transparent text-gray-500 border border-gray-700 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-emerald-400 hover:text-white hover:scale-105'
                          }`}>
                          {event.status === 'Rest' ? 'Break' : 'View Event'}
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center text-gray-500"
              >
                <p className="text-xl">No events found for the selected filters.</p>
                <button
                  onClick={() => { setSelectedVenue('All'); setSelectedClub('All'); setSelectedDate('All'); }}
                  className="mt-4 text-emerald-400 hover:text-emerald-300 hover:underline"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.section>
  );
}
