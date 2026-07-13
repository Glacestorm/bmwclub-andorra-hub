import { Navigate, useParams } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { CalendarYearAgenda } from "@/components/calendar/CalendarYearAgenda";
import { getEventsByYearFromList } from "@/lib/calendar";
import { useMergedEvents } from "@/lib/clubCms";

const CalendariYear = () => {
  const { year: yearParam } = useParams();
  const year = Number(yearParam);
  const { data: events } = useMergedEvents();

  if (!yearParam || Number.isNaN(year)) {
    return <Navigate to="/calendari" replace />;
  }

  return (
    <PageShell>
      <CalendarYearAgenda year={year} events={getEventsByYearFromList(events, year)} />
    </PageShell>
  );
};

export default CalendariYear;
