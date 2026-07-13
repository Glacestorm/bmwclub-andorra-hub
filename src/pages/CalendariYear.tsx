import { Navigate, useLocation } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { CalendarYearAgenda } from "@/components/calendar/CalendarYearAgenda";
import { getEventsByYear } from "@/lib/calendar";

const yearByPath: Record<string, number> = {
  "/calendari/2026": 2026,
  "/calendari/2025": 2025,
  "/calendari/2024": 2024,
  "/calendari/2022": 2022,
  "/calendari/2021": 2021,
  "/calendari/2020": 2020,
  "/calendari/2016": 2016,
  "/calendari/2015": 2015,
  "/calendari/2014": 2014,
  "/calendari/2013": 2013,
  "/calendari/2011": 2011,
};

const CalendariYear = () => {
  const location = useLocation();
  const year = yearByPath[location.pathname];

  if (!year) {
    return <Navigate to="/calendari" replace />;
  }

  return (
    <PageShell>
      <CalendarYearAgenda year={year} events={getEventsByYear(year)} />
    </PageShell>
  );
};

export default CalendariYear;
