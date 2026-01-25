'use client';
import { useState } from 'react';
import { toHijri } from 'hijri-converter';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get the day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const startingDayOfWeek = firstDayOfMonth.getDay();
  
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
    <div className="w-full max-w-4xl mx-auto bg-gray-900 rounded-xl shadow-xl p-6">
      {/* Header with month and navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1"></div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center flex-1 tracking-wide">
  {monthName}
</h2>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            onClick={goToPreviousMonth}
            className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg transition-colors"

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
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2 uppercase tracking-wider">
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
                    ? 'bg-gray-800 border-gray-800'
                    : 'bg-gray-850 border-gray-700 hover:bg-gray-700'
                }
                ${
                  isToday(day || 0)
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'text-gray-200'
                }
                transition-colors
              `}
              
          >
            {day !== null && (
              <div className="flex flex-col h-full relative">
                <div className="flex justify-between items-start w-full">
                  <div className="text-sm font-semibold">{day}</div>
                  <div className={`text-xs font-medium ${
                    isToday(day)
                      ? 'text-blue-100'
                      : 'text-gray-400'
                  }`}>
                    {getHijriDate(day)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
