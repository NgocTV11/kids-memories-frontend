'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  EmojiEvents,
  Cake,
} from '@mui/icons-material';
import { milestonesService, Milestone } from '@/services/milestones.service';
import { kidsService, Kid } from '@/services/kids.service';
import { useI18nStore } from '@/store/i18n.store';
import dayjs from 'dayjs';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'milestone' | 'birthday';
  kidName?: string;
  icon: string;
}

interface CalendarProps {
  onEventPress?: (event: CalendarEvent) => void;
}

export default function Calendar({ onEventPress }: CalendarProps) {
  const theme = useTheme();
  const { dashboard: t } = useI18nStore();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    loadEvents();
  }, [currentDate]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      
      // Load milestones and kids' birthdays
      const [milestones, kids] = await Promise.all([
        milestonesService.getAll().catch(() => []),
        kidsService.getAll().catch(() => []),
      ]);

      const calendarEvents: CalendarEvent[] = [];

      // Add milestones
      if (Array.isArray(milestones)) {
        milestones.forEach((m: Milestone) => {
          calendarEvents.push({
            id: m.id,
            title: m.title,
            date: m.milestone_date,
            type: 'milestone',
            kidName: m.kid?.name,
            icon: '🏆',
          });
        });
      }

      // Add birthdays
      if (Array.isArray(kids)) {
        kids.forEach((kid: Kid) => {
          calendarEvents.push({
            id: kid.id,
            title: `${kid.name}'s Birthday`,
            date: kid.date_of_birth,
            type: 'birthday',
            kidName: kid.name,
            icon: '🎂',
          });
        });
      }

      setEvents(calendarEvents);
    } catch (error) {
      console.error('Failed to load calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    return {
      daysInMonth: lastDay.getDate(),
      startingDayOfWeek: firstDay.getDay(),
    };
  };

  const getEventsForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    return events.filter(event => {
      const eventDate = new Date(event.date);
      const eventYear = eventDate.getFullYear();
      const eventMonth = String(eventDate.getMonth() + 1).padStart(2, '0');
      const eventDay = String(eventDate.getDate()).padStart(2, '0');
      const eventDateStr = `${eventYear}-${eventMonth}-${eventDay}`;
      
      return eventDateStr === dateStr;
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const renderCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <Box key={`empty-${i}`} sx={{ aspectRatio: '1', p: 0.5 }} />
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const today = isToday(date);
      const selected = isSameDay(selectedDate, date);
      
      days.push(
        <Box
          key={day}
          onClick={() => setSelectedDate(date)}
          sx={{
            aspectRatio: '1',
            p: 0.5,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              borderRadius: 1,
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1,
              backgroundColor: selected
                ? alpha(theme.palette.primary.main, 0.15)
                : today
                ? alpha(theme.palette.primary.main, 0.08)
                : 'transparent',
              border: today ? `2px solid ${theme.palette.primary.main}` : 'none',
              position: 'relative',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: today || selected ? 600 : 400,
                color: today || selected ? theme.palette.primary.main : theme.palette.text.primary,
              }}
            >
              {day}
            </Typography>
            
            {/* Event indicators */}
            {dayEvents.length > 0 && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 0.25,
                  mt: 0.25,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {dayEvents.slice(0, 3).map((event, idx) => (
                  <Typography key={idx} sx={{ fontSize: '10px' }}>
                    {event.icon}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      );
    }
    
    return days;
  };

  const renderSelectedDateEvents = () => {
    if (!selectedDate) return null;
    
    const dayEvents = getEventsForDate(selectedDate);
    
    if (dayEvents.length === 0) {
      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No events on this day
          </Typography>
        </Box>
      );
    }
    
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          {dayjs(selectedDate).format('MMMM D, YYYY')}
        </Typography>
        
        {dayEvents.map((event) => (
          <Box
            key={event.id}
            onClick={() => onEventPress?.(event)}
            sx={{
              p: 1.5,
              mb: 1,
              borderRadius: 1.5,
              backgroundColor: alpha(
                event.type === 'milestone' ? theme.palette.warning.main : theme.palette.info.main,
                0.1
              ),
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: alpha(
                  event.type === 'milestone' ? theme.palette.warning.main : theme.palette.info.main,
                  0.2
                ),
                transform: 'translateX(4px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {event.type === 'milestone' ? (
                <EmojiEvents fontSize="small" color="warning" />
              ) : (
                <Cake fontSize="small" color="info" />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {event.title}
                </Typography>
                {event.kidName && (
                  <Typography variant="caption" color="text.secondary">
                    {event.kidName}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  if (loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthYear = dayjs(currentDate).format('MMMM YYYY');

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={previousMonth} size="small">
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {monthYear}
        </Typography>
        
        <IconButton onClick={nextMonth} size="small">
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ p: 2 }}>
        {/* Week days header */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5, mb: 1 }}>
          {weekDays.map((day) => (
            <Typography
              key={day}
              variant="caption"
              sx={{
                display: 'block',
                textAlign: 'center',
                fontWeight: 600,
                color: theme.palette.text.secondary,
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* Days grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.5 }}>
          {renderCalendarDays()}
        </Box>
      </Box>

      {/* Selected date events */}
      {selectedDate && (
        <Box sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          {renderSelectedDateEvents()}
        </Box>
      )}
    </Paper>
  );
}
