import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRecentStays() {
    // Use params to get filter days
    const [searchParams] = useSearchParams();
    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    // Then convert that day to a date to use with date FNS, subDays get now and subtract our numDays like 7-30-90
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`],
    });

    const confirmedStays = stays?.filter(
        stay => stay.status === "checked-in" || stay.status === "checked-out"
    );

    return { isLoading, confirmedStays, stays, numDays };
}
