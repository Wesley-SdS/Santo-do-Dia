'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

interface CalendarSaint {
  id: string;
  name: string;
  slug: string;
  feastDay: number;
  feastMonth: number;
}

export function LiturgicalCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [saints, setSaints] = useState<CalendarSaint[]>([]);
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  useEffect(() => {
    fetch(`/api/saints/calendar?month=${month + 1}&year=${year}`)
      .then((res) => res.json())
      .then((data) => setSaints(data.saints ?? []))
      .catch(() => setSaints([]));
  }, [month, year]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function goToPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setSelectedDay(null);
  }

  function goToNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setSelectedDay(null);
  }

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const saintsForDay = (day: number) =>
    saints.filter((s) => s.feastDay === day && s.feastMonth === month + 1);

  const selectedSaints = selectedDay ? saintsForDay(selectedDay) : [];

  return (
    <div>
      {/* Month Navigation */}
      <div className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="rounded-lg p-2 hover:bg-muted transition-colors"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="font-[family-name:var(--font-dm-serif)] text-lg">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded-lg p-2 hover:bg-muted transition-colors"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1">
          {DAY_NAMES.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Day Cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before first day */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const daySaints = saintsForDay(day);
            const hasSaints = daySaints.length > 0;
            const todayClass = isToday(day);
            const isSelected = selectedDay === day;

            return (
              <button
                type="button"
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative flex flex-col items-center rounded-lg p-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-gold text-primary-foreground'
                    : todayClass
                      ? 'bg-gold/10 font-bold text-gold'
                      : 'hover:bg-muted'
                }`}
              >
                {day}
                {hasSaints && !isSelected && (
                  <span className="mt-0.5 h-1 w-1 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Saints */}
      {selectedDay && (
        <div className="mt-4 rounded-xl bg-card p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground">
            {selectedDay} de {MONTH_NAMES[month]}
          </h3>
          {selectedSaints.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {selectedSaints.map((saint) => (
                <li key={saint.id}>
                  <a
                    href={`/santo/${saint.slug}`}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-xs font-medium text-gold">
                      {saint.name.charAt(0)}
                    </span>
                    <span className="text-sm text-foreground">{saint.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              Nenhum santo registrado para este dia.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
