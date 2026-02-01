'use client';
import { useState, useEffect } from 'react';
import { toHijri } from 'hijri-converter';

interface Event {
  event_id: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const today = new Date();
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentDate]); // Refetch when month changes

  // Get month name
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  // Check if a date is today
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };
  
  // Convert Gregorian date to Hijri date
  const getHijriDate = (day: number | null): string | null => {
    if (day === null) return null;
    try {
      const hijriDate = toHijri(year, month + 1, day);
      return `${hijriDate.hd}`;
    } catch (error) {
      return null;
    }
  };

  // Get events for a specific date
  const getEventsForDate = (day: number | null): Event[] => {
    if (day === null) return [];
    
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    return events.filter(event => {
      const eventStart = new Date(event.start_date);
      const eventEnd = new Date(event.end_date);
      
      // Event overlaps with this date if:
      // - Event starts before or on this date AND
      // - Event ends after or on this date
      eventStart.setHours(0, 0, 0, 0);
      eventEnd.setHours(23, 59, 59, 999);
      
      return eventStart <= date && eventEnd >= date;
    });
  };

  // Handle event click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing selected event for smooth exit animation
    setTimeout(() => {
      setSelectedEvent(null);
    }, 300);
  };

  // Format date and time
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  // Calculate duration
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  };
  
  // Generate array of days for the month
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  // Day names
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
      {/* Header with month and navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center flex-1 tracking-wide">
  {monthName}
</h2>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"

            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNextMonth}
            className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Day names header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
                aspect-square rounded-lg p-2 border
                ${
                  day === null
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }
                ${
                  isToday(day || 0)
                    ? 'bg-green-100 border-green-500 border-2 text-gray-900'
                    : 'text-gray-800'
                }
                transition-colors
              `}
              
          >
            {day !== null && (
              <div className="flex flex-col h-full relative">
                <div className="flex justify-between items-start w-full mb-1">
                  <div className="text-sm font-semibold">{day}</div>
                  <div className={`text-xs font-medium ${
                    isToday(day)
                      ? 'text-green-700'
                      : 'text-gray-500'
                  }`}>
                    {getHijriDate(day)}
                  </div>
                </div>
                {/* Events for this date */}
                {getEventsForDate(day).length > 0 && (
                  <div className="flex flex-col gap-0.5 mt-auto overflow-hidden">
                    {getEventsForDate(day).slice(0, 2).map((event) => (
                      <button
                        key={event.event_id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventClick(event);
                        }}
                        className={`text-xs px-1.5 py-0.5 rounded truncate font-medium cursor-pointer hover:opacity-80 transition-opacity ${
                          isToday(day)
                            ? 'bg-green-700 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                        title={event.name}
                      >
                        {event.name}
                      </button>
                    ))}
                    {getEventsForDate(day).length > 2 && (
                      <div className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                        isToday(day)
                          ? 'bg-green-700 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        +{getEventsForDate(day).length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

{/* Event Details Modal */}
{selectedEvent && (
  <>
    {/* Backdrop */}
    <div
      className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
        isModalOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
      }`}
      onClick={closeModal}
    />

    {/* Modal */}
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={closeModal}
    >
      <div
        className={`relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 transform transition-all duration-300 flex flex-col ${
          isModalOpen
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
          {selectedEvent.name}
        </h3>

        {/* Description */}
        {selectedEvent.description && (
          <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
            {selectedEvent.description}
          </p>
        )}

        {/* Event Info at bottom */}
        <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <div className="font-semibold text-green-700 mb-1">Start</div>
            <div className="text-gray-800">{formatDateTime(selectedEvent.start_date).date}</div>
            <div className="text-gray-600">{formatDateTime(selectedEvent.start_date).time}</div>
          </div>

          <div>
            <div className="font-semibold text-green-700 mb-1">End</div>
            <div className="text-gray-800">{formatDateTime(selectedEvent.end_date).date}</div>
            <div className="text-gray-600">{formatDateTime(selectedEvent.end_date).time}</div>
          </div>

          <div>
            <div className="font-semibold text-green-700 mb-1">Duration</div>
            <div className="text-gray-800">{calculateDuration(selectedEvent.start_date, selectedEvent.end_date)}</div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
    </div>
  );
}
