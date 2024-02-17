import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentBookings() {
    // Use params to get filter days
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    // Then convert that day to a date to use with date FNS, subDays get now and subtract our numDays like 7-30-90
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: bookings } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}`],
    });

    return { isLoading, bookings };
}
